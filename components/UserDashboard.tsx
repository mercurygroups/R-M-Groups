import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Save, 
  X,
  Plane,
  Car,
  FileText,
  Crown,
  Package,
  Star,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { databaseService, Booking } from '../services/database';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    nationality: user?.nationality || '',
    passportNumber: user?.passportNumber || ''
  });

  useEffect(() => {
    if (user && isOpen) {
      loadUserBookings();
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        nationality: user.nationality || '',
        passportNumber: user.passportNumber || ''
      });
    }
  }, [user, isOpen]);

  const loadUserBookings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userBookings = await databaseService.getUserBookings(user.id);
      setBookings(userBookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    const success = await updateProfile(editForm);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      nationality: user?.nationality || '',
      passportNumber: user?.passportNumber || ''
    });
    setIsEditing(false);
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case 'flight':
      case 'flights':
        return <Plane size={20} className="text-blue-600" />;
      case 'visa':
        return <FileText size={20} className="text-green-600" />;
      case 'car':
      case 'luxury car':
        return <Car size={20} className="text-purple-600" />;
      case 'private jet':
        return <Crown size={20} className="text-yellow-600" />;
      case 'delivery':
      case 'logistics':
        return <Package size={20} className="text-orange-600" />;
      default:
        return <Calendar size={20} className="text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-slate-400 to-slate-600';
      case 'Gold':
        return 'from-yellow-400 to-yellow-600';
      case 'Silver':
        return 'from-slate-300 to-slate-500';
      default:
        return 'from-amber-600 to-amber-800';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome, {user.firstName} {user.lastName}
              </h2>
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${getMembershipColor(user.membershipTier)} px-4 py-2 rounded-full flex items-center space-x-2`}>
                  <Award size={16} />
                  <span className="font-semibold text-sm">{user.membershipTier} Member</span>
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full flex items-center space-x-2">
                  <Star size={16} />
                  <span className="font-semibold text-sm">{user.loyaltyPoints} Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-200px)]">
          {/* Sidebar */}
          <div className="w-64 bg-slate-50 border-r border-slate-200 p-6">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'bookings', label: 'My Bookings', icon: Calendar },
                { id: 'profile', label: 'Profile Settings', icon: Settings },
                { id: 'loyalty', label: 'Loyalty Program', icon: Award }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-md'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-6 mt-6 border-t border-slate-200">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <X size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Account Overview</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="text-blue-600" size={32} />
                        <span className="text-2xl font-bold text-blue-600">{bookings.length}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">Total Bookings</h4>
                      <p className="text-slate-600 text-sm">All time bookings</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <Star className="text-green-600" size={32} />
                        <span className="text-2xl font-bold text-green-600">{user.loyaltyPoints}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">Loyalty Points</h4>
                      <p className="text-slate-600 text-sm">Available to redeem</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <Award className="text-purple-600" size={32} />
                        <span className="text-lg font-bold text-purple-600">{user.membershipTier}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">Membership</h4>
                      <p className="text-slate-600 text-sm">Current tier status</p>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Recent Bookings</h4>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {getServiceIcon(booking.serviceType)}
                              <div>
                                <h5 className="font-semibold text-slate-900">{booking.serviceType}</h5>
                                <p className="text-slate-600 text-sm">
                                  {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <p className="text-slate-900 font-bold mt-1">
                                {booking.currency} {booking.totalAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl">
                      <Calendar className="mx-auto text-slate-400 mb-4" size={48} />
                      <h5 className="text-lg font-semibold text-slate-900 mb-2">No bookings yet</h5>
                      <p className="text-slate-600">Start your journey by booking your first service</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">My Bookings</h3>
                
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-slate-600 mt-4">Loading bookings...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            {getServiceIcon(booking.serviceType)}
                            <div>
                              <h4 className="text-xl font-bold text-slate-900">{booking.serviceType}</h4>
                              <p className="text-slate-600">Booking ID: {booking.id.slice(0, 8)}</p>
                            </div>
                          </div>
                          <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <p className="text-slate-600 text-sm mb-1">Booking Date</p>
                            <p className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                          </div>
                          {booking.travelDate && (
                            <div>
                              <p className="text-slate-600 text-sm mb-1">Travel Date</p>
                              <p className="font-semibold">{new Date(booking.travelDate).toLocaleDateString()}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-slate-600 text-sm mb-1">Total Amount</p>
                            <p className="font-bold text-lg">{booking.currency} {booking.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-4">
                          <h5 className="font-semibold text-slate-900 mb-2">Service Details</h5>
                          <pre className="text-sm text-slate-600 whitespace-pre-wrap">
                            {JSON.stringify(booking.serviceDetails, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl">
                    <Calendar className="mx-auto text-slate-400 mb-4" size={48} />
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h4>
                    <p className="text-slate-600">Your booking history will appear here</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Profile Settings</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 size={20} />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition-colors"
                      >
                        <Save size={20} />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-6 py-3 rounded-2xl hover:bg-slate-700 transition-colors"
                      >
                        <X size={20} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        First Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">{user.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Last Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">{user.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Email Address
                      </label>
                      <p className="text-slate-900 font-medium">{user.email}</p>
                      <p className="text-slate-500 text-sm mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">{user.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editForm.dateOfBirth}
                          onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">
                          {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Nationality
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.nationality}
                          onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">{user.nationality || 'Not provided'}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Passport Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.passportNumber}
                          onChange={(e) => setEditForm({ ...editForm, passportNumber: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                        />
                      ) : (
                        <p className="text-slate-900 font-medium">{user.passportNumber || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loyalty Tab */}
            {activeTab === 'loyalty' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Loyalty Program</h3>
                
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{user.membershipTier} Member</h4>
                      <p className="text-blue-100 mb-4">You have {user.loyaltyPoints} loyalty points</p>
                      <div className="flex items-center space-x-4">
                        <Star className="text-yellow-400" size={24} />
                        <span className="text-lg font-semibold">{user.loyaltyPoints} Points Available</span>
                      </div>
                    </div>
                    <Award size={64} className="text-white/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h5 className="text-lg font-bold text-slate-900 mb-4">Membership Benefits</h5>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-slate-700">Priority booking support</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-slate-700">Exclusive member discounts</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-slate-700">Complimentary upgrades</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-slate-700">24/7 premium support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h5 className="text-lg font-bold text-slate-900 mb-4">Points Redemption</h5>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-700">Flight Discount (10%)</span>
                        <span className="font-semibold text-blue-600">1,000 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-700">Car Rental Upgrade</span>
                        <span className="font-semibold text-blue-600">500 pts</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-700">Priority Processing</span>
                        <span className="font-semibold text-blue-600">250 pts</span>
                      </div>
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

export default UserDashboard;