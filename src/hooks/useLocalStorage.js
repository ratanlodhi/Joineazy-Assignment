import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
};

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useLocalStorage('assignment_dashboard_submissions', []);

  const addSubmission = (submission) => {
    setSubmissions([...submissions, submission]);
  };

  const updateSubmission = (id, updates) => {
    setSubmissions(
      submissions.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    );
  };

  const deleteSubmission = (id) => {
    setSubmissions(submissions.filter((sub) => sub.id !== id));
  };

  const getSubmissionByAssignmentAndStudent = (assignmentId, studentId) => {
    return submissions.find(
      (sub) => sub.assignmentId === assignmentId && sub.studentId === studentId
    );
  };

  return {
    submissions,
    addSubmission,
    updateSubmission,
    deleteSubmission,
    getSubmissionByAssignmentAndStudent
  };
};

export const useAssignments = () => {
  const [assignments, setAssignments] = useLocalStorage('assignment_dashboard_assignments', []);

  const addAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
  };

  const updateAssignment = (id, updates) => {
    setAssignments(
      assignments.map((assign) => (assign.id === id ? { ...assign, ...updates } : assign))
    );
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((assign) => assign.id !== id));
  };

  return {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment
  };
};
