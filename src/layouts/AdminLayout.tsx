import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, LayoutGrid, FilePlus2, Image, Newspaper, Users, Briefcase, BookOpenText, LogOut, User, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { authAPI } from '../services/adminApi';

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      navigate('/admin/login');
    }
  };

  const navItems = [
    { name: 'Publications', to: '/admin/publications', icon: BookOpenText },
    { name: 'Experiences', to: '/admin/experiences', icon: Briefcase },
    { name: 'Physicians', to: '/admin/physicians', icon: Users },
    { name: 'News', to: '/admin/news', icon: Newspaper },
    { name: 'Gallery', to: '/admin/gallery', icon: Image },
    { name: 'Testimonials', to: '/admin/testimonials', icon: FilePlus2 },
    { name: 'Settings', to: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-lg border-r border-gray-100 ${open ? 'w-64' : 'w-16'} transition-all duration-200 min-h-screen sticky top-0`}>
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/admin" className="font-semibold text-gray-900">Admin Dashboard</Link>
            <button className="text-gray-600" onClick={() => setOpen(!open)}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-2 pb-4 space-y-1">
            {navItems.map(({ name, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Icon className="h-4 w-4" />
                <span className={`${open ? 'inline' : 'hidden'}`}>{name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1">
          <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">Admin Dashboard</div>
            <div className="flex items-center gap-4">
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-indigo-600" />
                  </div>
                  <span className="hidden sm:block">{user?.full_name || user?.username}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">{user?.full_name || user?.username}</div>
                      <div className="text-gray-500">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;


