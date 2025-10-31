import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { getUsers } from '../../utils/localStorage';

const CreateEditAssignmentModal = ({ isOpen, onClose, onSave, assignment = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    driveLink: '',
    assignedTo: []
  });

  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allUsers = getUsers();
    setStudents(allUsers.filter((user) => user.role === 'STUDENT'));
  }, []);

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || '',
        description: assignment.description || '',
        dueDate: assignment.dueDate || '',
        driveLink: assignment.driveLink || '',
        assignedTo: assignment.assignedTo || []
      });
      setSelectAll(assignment.assignedTo?.length === students.length);
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        driveLink: '',
        assignedTo: []
      });
      setSelectAll(false);
    }
    setErrors({});
  }, [assignment, isOpen, students.length]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.assignedTo.length === 0) {
      newErrors.assignedTo = 'Please select at least one student';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStudentToggle = (studentId) => {
    setFormData((prev) => {
      const newAssignedTo = prev.assignedTo.includes(studentId)
        ? prev.assignedTo.filter((id) => id !== studentId)
        : [...prev.assignedTo, studentId];
      setSelectAll(newAssignedTo.length === students.length);
      return { ...prev, assignedTo: newAssignedTo };
    });
    if (errors.assignedTo) {
      setErrors((prev) => ({ ...prev, assignedTo: '' }));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setFormData((prev) => ({ ...prev, assignedTo: [] }));
      setSelectAll(false);
    } else {
      setFormData((prev) => ({ ...prev, assignedTo: students.map((s) => s.id) }));
      setSelectAll(true);
    }
    if (errors.assignedTo) {
      setErrors((prev) => ({ ...prev, assignedTo: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assignment ? 'Edit Assignment' : 'Create New Assignment'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Assignment title"
            aria-required="true"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Assignment description"
            aria-required="true"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Assignment due date"
            aria-required="true"
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
        </div>

        <div>
          <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 mb-1">
            Google Drive Link (Optional)
          </label>
          <input
            type="url"
            id="driveLink"
            name="driveLink"
            value={formData.driveLink}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Google Drive link"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign To <span className="text-red-500">*</span>
          </label>

          <div className="mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                aria-label="Select all students"
              />
              <span className="font-medium text-gray-900">Select All Students</span>
            </label>
          </div>

          <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
            {students.map((student) => (
              <label key={student.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={formData.assignedTo.includes(student.id)}
                  onChange={() => handleStudentToggle(student.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  aria-label={`Assign to ${student.name}`}
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.email}</div>
                </div>
              </label>
            ))}
          </div>

          {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            {assignment ? 'Update Assignment' : 'Create Assignment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

CreateEditAssignmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  assignment: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    driveLink: PropTypes.string,
    assignedTo: PropTypes.arrayOf(PropTypes.string)
  })
};

export default CreateEditAssignmentModal;
