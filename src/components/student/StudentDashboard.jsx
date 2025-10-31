import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSubmissions, useAssignments } from '../../hooks/useLocalStorage';
import { generateId } from '../../utils/localStorage';
import AssignmentCard from './AssignmentCard';
import SubmissionModal from './SubmissionModal';
import ProgressBar from '../ui/ProgressBar';
import Toast from '../ui/Toast';
import { BookOpen } from 'lucide-react';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { assignments } = useAssignments();
  const { submissions, addSubmission, updateSubmission, deleteSubmission } = useSubmissions();

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);

  const studentAssignments = assignments.filter((assignment) =>
    assignment.assignedTo.includes(currentUser.id)
  );

  const calculateProgress = () => {
    if (studentAssignments.length === 0) return 0;
    const submittedCount = studentAssignments.filter((assignment) => {
      const submission = submissions.find(
        (sub) => sub.assignmentId === assignment.id && sub.studentId === currentUser.id
      );
      return submission?.status === 'SUBMITTED';
    }).length;
    return Math.round((submittedCount / studentAssignments.length) * 100);
  };

  const handleSubmitClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleConfirmSubmission = () => {
    const existingSubmission = submissions.find(
      (sub) => sub.assignmentId === selectedAssignment.id && sub.studentId === currentUser.id
    );

    if (existingSubmission?.status === 'PENDING_CONFIRMATION') {
      const submissionId = existingSubmission.id;
      updateSubmission(existingSubmission.id, {
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString()
      });

      setToast({
        type: 'success',
        message: 'Assignment submitted successfully!',
        action: {
          label: 'Undo (30s)',
          onClick: () => handleUndo(submissionId)
        }
      });

      const timer = setTimeout(() => {
        setToast(null);
        setUndoTimer(null);
      }, 30000);
      setUndoTimer(timer);
    } else {
      const newSubmission = {
        id: generateId('sub'),
        assignmentId: selectedAssignment.id,
        studentId: currentUser.id,
        status: 'PENDING_CONFIRMATION',
        submittedAt: null
      };
      addSubmission(newSubmission);
      setToast({
        type: 'info',
        message: 'Please confirm your submission to complete the process.'
      });
    }

    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleUndo = (submissionId) => {
    if (undoTimer) {
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
    deleteSubmission(submissionId);
    setToast({
      type: 'info',
      message: 'Submission has been undone.'
    });
  };

  const getSubmissionForAssignment = (assignmentId) => {
    return submissions.find(
      (sub) => sub.assignmentId === assignmentId && sub.studentId === currentUser.id
    );
  };

  useEffect(() => {
    return () => {
      if (undoTimer) {
        clearTimeout(undoTimer);
      }
    };
  }, [undoTimer]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}!</h1>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
          <ProgressBar
            percentage={calculateProgress()}
            label="Overall Progress"
            showLabel={true}
            size="lg"
            color="blue"
          />
          <p className="text-sm mt-2 text-blue-50">
            {studentAssignments.filter((a) => getSubmissionForAssignment(a.id)?.status === 'SUBMITTED').length} of{' '}
            {studentAssignments.length} assignments completed
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
        </div>

        {studentAssignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Assignments Yet</h3>
            <p className="text-gray-600">You don't have any assignments at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {studentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submission={getSubmissionForAssignment(assignment.id)}
                onSubmit={() => handleSubmitClick(assignment)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedAssignment && (
        <SubmissionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAssignment(null);
          }}
          onConfirm={handleConfirmSubmission}
          assignment={selectedAssignment}
          isPendingConfirmation={
            getSubmissionForAssignment(selectedAssignment.id)?.status === 'PENDING_CONFIRMATION'
          }
        />
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default StudentDashboard;
