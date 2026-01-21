import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Plane, 
  FileText, 
  Car, 
  Crown,
  Calendar,
  CreditCard,
  Star,
  Bell,
  MapPin,
  Phone,
  Mail,
  Edit3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { databaseService } from '../services/database';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    nationality: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        nationality: user.nationality || '',
        dateOfBirth: user.dateOfBirth || ''
      });
      
      // Load user bookings
      loadBookings();
    }
  }, [isAuthenticated, user, navigate]);

  const loadBookings = async () => {
    if (!user) return;
    
    try {
      const userBookings = await databaseService.getUserBookings(user.id);
      setBookings(userBookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const success = await updateProfile(editForm);
      if (success) {
        setIsEditing(false);
        // Show success message
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const membershipColors = {
    Bronze: 'from-amber-600 to-orange-600',
    Silver: 'from-slate-400 to-slate-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-purple-500 to-indigo-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                R&M Groups
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Bell size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden animate-glow-soft">
              {/* Profile Header */}
              <div className={`bg-gradient-to-r ${membershipColors[user.membershipTier]} text-white p-6 text-center animate-glow-pulse`}>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-pulse-glow">
                  <User size={40} className="text-white" />
                </div>
                <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
                <p className="text-white/80 text-sm">{user.email}</p>
                <div className="mt-3 inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  <Crown size={16} className="mr-1" />
                  {user.membershipTier}
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <div className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: User },
                    { id: 'bookings', label: 'My Bookings', icon: Calendar },
                    { id: 'profile', label: 'Profile', icon: Settings },
                    { id: 'loyalty', label: 'Loyalty Points', icon: Star }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-600 font-semibold animate-glow-soft'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 animate-glow-pulse">
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.firstName}!</h1>
                  <p className="text-blue-100 text-lg">Ready to plan your next adventure?</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-glow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm">Total Bookings</p>
                        <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Calendar className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-glow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm">Loyalty Points</p>
                        <p className="text-2xl font-bold text-slate-900">{user.loyaltyPoints.toLocaleString()}</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-xl">
                        <Star className="text-yellow-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-glow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-600 text-sm">Membership</p>
                        <p className="text-2xl font-bold text-slate-900">{user.membershipTier}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <Crown className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 animate-glow-soft">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Plane, label: 'Book Flight', color: 'blue' },
                      { icon: FileText, label: 'Visa Service', color: 'green' },
                      { icon: Car, label: 'Rent Car', color: 'purple' },
                      { icon: Crown, label: 'Private Jet', color: 'gold' }
                    ].map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => navigate('/#services')}
                          className="flex flex-col items-center p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group animate-glow-soft"
                        >
                          <div className={`bg-${action.color}-100 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                            <Icon className={`text-${action.color}-600`} size={24} />
                          </div>
                          <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                            {action.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 animate-glow-soft">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 size={16} />
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-300 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <User className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm text-slate-600">Full Name</p>
                          <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm text-slate-600">Email</p>
                          <p className="font-semibold text-slate-900">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <Phone className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm text-slate-600">Phone</p>
                          <p className="font-semibold text-slate-900">{user.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-slate-400" size={20} />
                        <div>
                          <p className="text-sm text-slate-600">Nationality</p>
                          <p className="font-semibold text-slate-900">{user.nationality || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 animate-glow-soft">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">My Bookings</h2>
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto text-slate-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-slate-600 mb-2">No bookings yet</h3>
                    <p className="text-slate-500 mb-6">Start planning your next adventure!</p>
                    <button
                      onClick={() => navigate('/#services')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Browse Services
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking: any) => (
                      <div key={booking.id} className="border border-slate-200 rounded-2xl p-6 hover:border-blue-200 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-slate-900">{booking.serviceType}</h3>
                            <p className="text-slate-600 text-sm">{new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 animate-glow-soft">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Loyalty Program</h2>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Star size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{user.loyaltyPoints.toLocaleString()} Points</h3>
                  <p className="text-slate-600 mb-8">You're a {user.membershipTier} member</p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">How to earn more points:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
                      <div>• Book flights: 1 point per ₦100</div>
                      <div>• Visa services: 500 bonus points</div>
                      <div>• Car rentals: 2 points per ₦100</div>
                      <div>• Refer friends: 1000 points</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;