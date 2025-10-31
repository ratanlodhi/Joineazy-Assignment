import PropTypes from 'prop-types';
import { Calendar, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

const AssignmentCard = ({ assignment, submission, onSubmit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = new Date(assignment.dueDate) < new Date() && submission?.status !== 'SUBMITTED';

  const getStatusBadge = () => {
    if (submission?.status === 'SUBMITTED') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          <span>Submitted</span>
        </div>
      );
    }
    if (submission?.status === 'PENDING_CONFIRMATION') {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>Pending Confirmation</span>
        </div>
      );
    }
    if (isOverdue) {
      return (
        <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          <span>Overdue</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>Not Submitted</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Due: {formatDate(assignment.dueDate)}</span>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{assignment.description}</p>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {assignment.driveLink && (
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center justify-center"
            aria-label="View assignment details on Drive"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Details</span>
          </a>
        )}

        {submission?.status !== 'SUBMITTED' && (
          <Button
            onClick={onSubmit}
            variant={submission?.status === 'PENDING_CONFIRMATION' ? 'success' : 'primary'}
            className="flex-1 sm:flex-initial"
          >
            {submission?.status === 'PENDING_CONFIRMATION' ? 'Confirm Submission' : 'Mark as Submitted'}
          </Button>
        )}

        {submission?.status === 'SUBMITTED' && (
          <div className="text-sm text-gray-600">
            Submitted on {formatDate(submission.submittedAt)}
          </div>
        )}
      </div>
    </div>
  );
};

AssignmentCard.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    driveLink: PropTypes.string
  }).isRequired,
  submission: PropTypes.shape({
    status: PropTypes.string,
    submittedAt: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
};

export default AssignmentCard;
