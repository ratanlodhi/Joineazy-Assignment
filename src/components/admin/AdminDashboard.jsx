import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSubmissions, useAssignments } from '../../hooks/useLocalStorage';
import { getUsers, generateId } from '../../utils/localStorage';
import AdminAssignmentCard from './AdminAssignmentCard';
import CreateEditAssignmentModal from './CreateEditAssignmentModal';
import Toast from '../ui/Toast';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { Plus, BookOpen, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useAssignments();
  const { submissions } = useSubmissions();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [toast, setToast] = useState(null);

  const adminAssignments = assignments.filter((assignment) => assignment.createdBy === currentUser.id);

  const getStudentsDataForAssignment = (assignment) => {
    const allUsers = getUsers();
    return assignment.assignedTo.map((studentId) => {
      const student = allUsers.find((u) => u.id === studentId);
      const submission = submissions.find(
        (sub) => sub.assignmentId === assignment.id && sub.studentId === studentId
      );
      return {
        id: studentId,
        name: student?.name || 'Unknown Student',
        submitted: submission?.status === 'SUBMITTED'
      };
    });
  };

  const handleCreateAssignment = (formData) => {
    const newAssignment = {
      id: generateId('assign'),
      ...formData,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString()
    };
    addAssignment(newAssignment);
    setToast({
      type: 'success',
      message: 'Assignment created successfully!'
    });
  };

  const handleUpdateAssignment = (formData) => {
    updateAssignment(editingAssignment.id, formData);
    setEditingAssignment(null);
    setToast({
      type: 'success',
      message: 'Assignment updated successfully!'
    });
  };

  const handleDeleteAssignment = () => {
    if (deleteConfirmation) {
      deleteAssignment(deleteConfirmation.id);
      setDeleteConfirmation(null);
      setToast({
        type: 'success',
        message: 'Assignment deleted successfully!'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser.name}!</h1>
            <p className="text-green-50">
              You have created {adminAssignments.length} assignment{adminAssignments.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            variant="primary"
            className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50"
          >
            <Plus className="w-5 h-5" />
            <span>Create Assignment</span>
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">My Assignments</h2>
        </div>

        {adminAssignments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Assignments Created</h3>
            <p className="text-gray-600 mb-4">Create your first assignment to get started.</p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              variant="primary"
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Assignment</span>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {adminAssignments.map((assignment) => (
              <AdminAssignmentCard
                key={assignment.id}
                assignment={assignment}
                studentsData={getStudentsDataForAssignment(assignment)}
                onEdit={() => setEditingAssignment(assignment)}
                onDelete={() => setDeleteConfirmation(assignment)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateEditAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateAssignment}
      />

      <CreateEditAssignmentModal
        isOpen={!!editingAssignment}
        onClose={() => setEditingAssignment(null)}
        onSave={handleUpdateAssignment}
        assignment={editingAssignment}
      />

      <Modal
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        title="Delete Assignment"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-medium mb-1">This action cannot be undone.</p>
              <p>
                Are you sure you want to delete <strong>{deleteConfirmation?.title}</strong>? All associated
                submission data will be permanently removed.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmation(null)} fullWidth>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAssignment} fullWidth>
              Delete Assignment
            </Button>
          </div>
        </div>
      </Modal>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminDashboard;
