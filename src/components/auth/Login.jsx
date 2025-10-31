import { useState } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../utils/localStorage';
import Button from '../ui/Button';
import { User, GraduationCap, BookOpen } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [selectedUser, setSelectedUser] = useState('');
  const users = getUsers();

  const filteredUsers = users.filter((user) => user.role === selectedRole);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.id === selectedUser);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignment Dashboard</h1>
          <p className="text-gray-600">Select your role and user to continue</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('STUDENT');
                    setSelectedUser('');
                  }}
                  className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all ${
                    selectedRole === 'STUDENT'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                  aria-label="Select student role"
                >
                  <GraduationCap className="w-8 h-8" />
                  <span className="font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('ADMIN');
                    setSelectedUser('');
                  }}
                  className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-all ${
                    selectedRole === 'ADMIN'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                  aria-label="Select admin role"
                >
                  <User className="w-8 h-8" />
                  <span className="font-medium">Professor</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                id="user-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                aria-label="Select user"
              >
                <option value="">Choose a user...</option>
                {filteredUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={!selectedUser}>
              Continue to Dashboard
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          This is a simulated login for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
