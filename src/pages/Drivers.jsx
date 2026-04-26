import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { drivers, vehicles } from '../data/mockData';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import DriverDetailPanel from '../components/drivers/DriverDetailPanel';
import { 
  Filter, ChevronRight, User, Phone, Mail, Truck, Clock, 
  MapPin, Award, Star, TrendingUp, AlertCircle, CheckCircle,
  Calendar, Package, Navigation, MessageSquare, MoreVertical,
  Users, Shield, FileText, Activity, Gauge, Fuel, Plus,
  Briefcase, Target, Zap, BarChart3, Download, Share2
} from 'lucide-react';
import './Drivers.css';

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const shiftOptions = ['all', 'Morning', 'Afternoon', 'Night'];
  const statusOptions = ['all', 'On Shift', 'Off Shift', 'On Leave'];

  // Enrich driver data
  const enrichedDrivers = useMemo(() => {
    return drivers.map(driver => {
      const vehicle = vehicles.find(v => v.id === driver.vehicleId);
      return {
        ...driver,
        vehicleInfo: vehicle,
        status: ['On Shift', 'Off Shift', 'On Leave'][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
        deliveriesCompleted: Math.floor(Math.random() * 1500) + 500,
        onTimeRate: Math.floor(Math.random() * 15) + 85, // 85% - 100%
        avgDeliveryTime: Math.floor(Math.random() * 30) + 20, // 20-50 min
        totalMiles: Math.floor(Math.random() * 50000) + 10000,
        fuelEfficiency: (Math.random() * 3 + 6).toFixed(1), // 6.0 - 9.0 mpg
        certifications: ['CDL', 'HazMat', 'Tanker'].slice(0, Math.floor(Math.random() * 3) + 1),
        joinDate: `202${Math.floor(Math.random() * 3) + 1}`,
        lastActive: ['2 min ago', '15 min ago', '1 hour ago', '3 hours ago'][Math.floor(Math.random() * 4)],
        nextShift: shiftOptions[Math.floor(Math.random() * 3) + 1],
        contactInfo: {
          email: `${driver.name.toLowerCase().replace(' ', '.')}@fleetflow.com`,
          emergencyContact: '+1 (555) 000-0000',
          address: 'Chicago, IL'
        },
        performance: {
          safetyScore: Math.floor(Math.random() * 20) + 80,
          efficiency: Math.floor(Math.random() * 25) + 70,
          punctuality: Math.floor(Math.random() * 15) + 85
        },
        recentDeliveries: [
          { id: 1, customer: 'Midwest Logistics', status: 'completed', time: '2h ago' },
          { id: 2, customer: 'Chicago Depot', status: 'completed', time: '5h ago' },
          { id: 3, customer: 'O\'Hare Cargo', status: 'in-progress', time: 'now' }
        ]
      };
    });
  }, []);

  const filteredDrivers = useMemo(() => {
    let result = enrichedDrivers;
    
    if (searchTerm) {
      result = result.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm) ||
        d.contactInfo?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (shiftFilter !== 'all') {
      result = result.filter(d => d.shift === shiftFilter);
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(d => d.status === statusFilter);
    }
    
    return result;
  }, [searchTerm, shiftFilter, statusFilter, enrichedDrivers]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Shift': return '#10b981';
      case 'Off Shift': return '#6b7280';
      case 'On Leave': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#10b981';
    if (rating >= 3.5) return '#3b82f6';
    return '#f59e0b';
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <LoadingSpinner size="large" message="Loading drivers..." />
      </div>
    );
  }

  return (
    <div className="drivers-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">
              Driver <span className="gradient-text">Management</span>
            </h1>
            <p className="page-subtitle">Manage your team and track performance</p>
          </div>
          <div className="header-actions">
            <button className="add-driver-btn">
              <Plus size={18} />
              <span>Add Driver</span>
            </button>
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Driver Stats */}
        <div className="driver-stats">
          <div className="stat-item">
            <Users size={20} />
            <div>
              <span className="stat-value">{drivers.length}</span>
              <span className="stat-label">Total Drivers</span>
            </div>
          </div>
          <div className="stat-item">
            <Activity size={20} />
            <div>
              <span className="stat-value">{enrichedDrivers.filter(d => d.status === 'On Shift').length}</span>
              <span className="stat-label">On Shift</span>
            </div>
          </div>
          <div className="stat-item">
            <Star size={20} />
            <div>
              <span className="stat-value">
                {(enrichedDrivers.reduce((acc, d) => acc + parseFloat(d.rating), 0) / enrichedDrivers.length).toFixed(1)}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
          <div className="stat-item">
            <Target size={20} />
            <div>
              <span className="stat-value">
                {Math.round(enrichedDrivers.reduce((acc, d) => acc + d.onTimeRate, 0) / enrichedDrivers.length)}%
              </span>
              <span className="stat-label">On-Time Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="drivers-controls">
        <SearchBar 
          placeholder="Search by name, phone, or email..."
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          className="drivers-search"
        />
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select 
              className="shift-filter"
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
            >
              {shiftOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Shifts' : `${option} Shift`}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Activity size={16} className="filter-icon" />
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Status' : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Driver Grid/List */}
      {filteredDrivers.length === 0 ? (
        <EmptyState 
          type="search"
          title="No drivers found"
          message="Try adjusting your search or filter criteria"
          actionText="Clear filters"
          onAction={() => {
            setSearchTerm('');
            setShiftFilter('all');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className={`drivers-${viewMode}`}>
          {filteredDrivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              className={`driver-card ${viewMode === 'list' ? 'list-view' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedDriver(driver)}
            >
              {/* Status Indicator */}
              <div 
                className="driver-status-bar"
                style={{ backgroundColor: getStatusColor(driver.status) }}
              />

              {/* Card Header */}
              <div className="driver-card-header">
                <div className="driver-avatar-wrapper">
                  <div className="driver-avatar">
                    {getInitials(driver.name)}
                  </div>
                  <div 
                    className="driver-status-dot"
                    style={{ backgroundColor: getStatusColor(driver.status) }}
                  />
                </div>
                <div className="driver-title">
                  <h3 className="driver-name">{driver.name}</h3>
                  <div className="driver-badges">
                    <span className="driver-shift-badge">{driver.shift}</span>
                    <div className="driver-rating" style={{ color: getRatingColor(driver.rating) }}>
                      <Star size={14} fill="currentColor" />
                      <span>{driver.rating}</span>
                    </div>
                  </div>
                </div>
                <button className="more-btn">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Card Body */}
              <div className="driver-card-body">
                {/* Contact Info */}
                <div className="contact-section">
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{driver.phone}</span>
                  </div>
                  <div className="contact-item">
                    <Mail size={14} />
                    <span>{driver.contactInfo?.email}</span>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="vehicle-section">
                  <div className="section-label">
                    <Truck size={14} />
                    <span>Assigned Vehicle</span>
                  </div>
                  {driver.vehicleInfo ? (
                    <div className="vehicle-info">
                      <span className="vehicle-plate">{driver.vehicleInfo.plate}</span>
                      <span className="vehicle-model">{driver.vehicleInfo.model}</span>
                    </div>
                  ) : (
                    <span className="no-vehicle">No vehicle assigned</span>
                  )}
                </div>

                {/* Performance Metrics */}
                <div className="performance-metrics">
                  <div className="metric">
                    <Package size={14} />
                    <div>
                      <span className="metric-value">{driver.deliveriesCompleted}</span>
                      <span className="metric-label">Deliveries</span>
                    </div>
                  </div>
                  <div className="metric">
                    <Target size={14} />
                    <div>
                      <span className="metric-value">{driver.onTimeRate}%</span>
                      <span className="metric-label">On-Time</span>
                    </div>
                  </div>
                  <div className="metric">
                    <Gauge size={14} />
                    <div>
                      <span className="metric-value">{driver.totalMiles?.toLocaleString()}</span>
                      <span className="metric-label">Miles</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                  <div className="section-label">
                    <Clock size={14} />
                    <span>Recent Activity</span>
                  </div>
                  <div className="activity-list">
                    {driver.recentDeliveries?.slice(0, 2).map((delivery, idx) => (
                      <div key={idx} className="activity-item">
                        <CheckCircle size={12} className={delivery.status === 'completed' ? 'completed' : 'in-progress'} />
                        <span>{delivery.customer}</span>
                        <span className="activity-time">{delivery.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="driver-card-footer">
                <div className="footer-info">
                  <Calendar size={14} />
                  <span>Joined {driver.joinDate}</span>
                </div>
                <div className="footer-actions">
                  <button className="footer-btn" title="Message">
                    <MessageSquare size={16} />
                  </button>
                  <button className="footer-btn" title="Call">
                    <Phone size={16} />
                  </button>
                  <button 
                    className="view-profile-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDriver(driver);
                    }}
                  >
                    View Profile
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Certifications */}
              {driver.certifications && driver.certifications.length > 0 && (
                <div className="certifications">
                  {driver.certifications.map((cert, idx) => (
                    <span key={idx} className="cert-badge">{cert}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Driver Detail Panel */}
      <AnimatePresence>
        {selectedDriver && (
          <DriverDetailPanel 
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drivers;