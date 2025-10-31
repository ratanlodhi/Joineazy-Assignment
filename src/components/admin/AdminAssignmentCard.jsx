import PropTypes from 'prop-types';
import { Calendar, Users, ExternalLink, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

const AdminAssignmentCard = ({ assignment, studentsData, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const submittedCount = studentsData.filter((s) => s.submitted).length;
  const totalCount = studentsData.length;
  const progressPercentage = totalCount > 0 ? Math.round((submittedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{totalCount} student{totalCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">{assignment.description}</p>

      <div className="mb-4">
        <ProgressBar
          percentage={progressPercentage}
          label="Class Progress"
          showLabel={true}
          size="md"
          color={progressPercentage === 100 ? 'green' : progressPercentage >= 50 ? 'blue' : 'yellow'}
        />
        <p className="text-sm text-gray-600 mt-1">
          {submittedCount} of {totalCount} students submitted
        </p>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Student Status:</h4>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {studentsData.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
            >
              <span className="text-gray-700 truncate">{student.name}</span>
              {student.submitted ? (
                <span className="flex-shrink-0 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Submitted
                </span>
              ) : (
                <span className="flex-shrink-0 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        {assignment.driveLink && (
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm"
            aria-label="View assignment on Drive"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Drive Link</span>
          </a>
        )}
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </Button>
        <Button
          onClick={onDelete}
          variant="danger"
          size="sm"
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

AdminAssignmentCard.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    driveLink: PropTypes.string
  }).isRequired,
  studentsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      submitted: PropTypes.bool.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AdminAssignmentCard;
