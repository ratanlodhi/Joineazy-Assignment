import mockData from '../data/mockData.json';

const STORAGE_KEYS = {
  USERS: 'assignment_dashboard_users',
  ASSIGNMENTS: 'assignment_dashboard_assignments',
  SUBMISSIONS: 'assignment_dashboard_submissions',
  CURRENT_USER: 'assignment_dashboard_current_user',
  INITIALIZED: 'assignment_dashboard_initialized'
};

export const initializeLocalStorage = () => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

  if (!isInitialized) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockData.users));
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(mockData.assignments));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(mockData.submissions));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
};

export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const getAssignments = () => {
  const assignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  return assignments ? JSON.parse(assignments) : [];
};

export const saveAssignments = (assignments) => {
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
};

export const getSubmissions = () => {
  const submissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
  return submissions ? JSON.parse(submissions) : [];
};

export const saveSubmissions = (submissions) => {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const generateId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
