import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { AlertCircle } from 'lucide-react';

const SubmissionModal = ({ isOpen, onClose, onConfirm, assignment, isPendingConfirmation }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Submission" size="md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            {isPendingConfirmation ? (
              <p>
                This is your <strong>final confirmation</strong>. Once confirmed, your submission
                will be recorded and marked as submitted for <strong>{assignment.title}</strong>.
              </p>
            ) : (
              <p>
                Are you sure you have submitted <strong>{assignment.title}</strong>? This action
                will mark the assignment as pending confirmation.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Assignment Details:</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Title:</span> {assignment.title}
            </p>
            <p>
              <span className="font-medium">Due Date:</span>{' '}
              {new Date(assignment.dueDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button variant={isPendingConfirmation ? 'success' : 'primary'} onClick={onConfirm} fullWidth>
            {isPendingConfirmation ? 'Confirm Submission' : 'Yes, I Submitted'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

SubmissionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  assignment: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired
  }).isRequired,
  isPendingConfirmation: PropTypes.bool.isRequired
};

export default SubmissionModal;
