import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { BookOpen, LogOut, Menu, X, GraduationCap, User } from 'lucide-react';

const Header = () => {
  const { currentUser, logout, isStudent } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Assignment Dashboard</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                {isStudent ? 'Student Portal' : 'Professor Portal'}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              {isStudent ? (
                <GraduationCap className="w-5 h-5 text-gray-600" />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
              {isStudent ? (
                <GraduationCap className="w-5 h-5 text-gray-600" />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>
            <Button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              variant="outline"
              fullWidth
              className="flex items-center gap-2 justify-center"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
