import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, User, Phone, Mail, MapPin, Calendar, Clock, 
  Star, Award, TrendingUp, Package, Truck, AlertCircle,
  FileText, Activity, Target, Shield, Navigation,
  MessageSquare, MoreVertical, Download, Share2,
  CheckCircle, Clock as ClockIcon, Gauge, Fuel,
  Briefcase, Users, ChevronRight, BarChart3
} from 'lucide-react';
import './DriverDetailPanel.css';

const DriverDetailPanel = ({ driver, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

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

  // Mock performance data
  const weeklyPerformance = [
    { day: 'Mon', deliveries: 8, onTime: 8 },
    { day: 'Tue', deliveries: 10, onTime: 9 },
    { day: 'Wed', deliveries: 12, onTime: 11 },
    { day: 'Thu', deliveries: 9, onTime: 9 },
    { day: 'Fri', deliveries: 11, onTime: 10 },
    { day: 'Sat', deliveries: 7, onTime: 7 },
    { day: 'Sun', deliveries: 5, onTime: 5 },
  ];

  // Mock delivery history
  const deliveryHistory = [
    { id: 1, customer: 'Midwest Logistics', address: '123 S Wacker Dr', time: '2h ago', status: 'completed', rating: 5 },
    { id: 2, customer: 'Chicago Depot', address: '456 N Michigan Ave', time: '5h ago', status: 'completed', rating: 4 },
    { id: 3, customer: 'O\'Hare Cargo', address: '10000 W O\'Hare Ave', time: 'yesterday', status: 'completed', rating: 5 },
    { id: 4, customer: 'United Warehouse', address: '789 W Roosevelt Rd', time: 'yesterday', status: 'completed', rating: 4 },
    { id: 5, customer: 'South Side Depot', address: '234 E 95th St', time: '2 days ago', status: 'completed', rating: 5 },
  ];

  return (
    <motion.div 
      className="driver-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="driver-detail-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="panel-header">
          <div className="header-left">
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
            <div className="driver-profile-header">
              <div className="driver-avatar-xlarge">
                {getInitials(driver.name)}
              </div>
              <div>
                <h2>{driver.name}</h2>
                <div className="driver-meta">
                  <span className="driver-id">ID: #{driver.id}</span>
                  <span 
                    className="driver-status-badge"
                    style={{ backgroundColor: getStatusColor(driver.status) + '20', color: getStatusColor(driver.status) }}
                  >
                    {driver.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-right">
            <button className="action-btn">
              <Share2 size={18} />
            </button>
            <button className="action-btn">
              <Download size={18} />
            </button>
            <button className="action-btn">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-bar">
          <button className="quick-action">
            <Phone size={18} />
            <span>Call</span>
          </button>
          <button className="quick-action">
            <MessageSquare size={18} />
            <span>Message</span>
          </button>
          <button className="quick-action">
            <Navigation size={18} />
            <span>Track</span>
          </button>
          <button className="quick-action">
            <FileText size={18} />
            <span>Schedule</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="panel-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="panel-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Contact Information */}
              <div className="info-section">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Phone size={18} />
                    <div>
                      <span className="info-label">Phone</span>
                      <span className="info-value">{driver.phone}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Mail size={18} />
                    <div>
                      <span className="info-label">Email</span>
                      <span className="info-value">{driver.contactInfo?.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <MapPin size={18} />
                    <div>
                      <span className="info-label">Location</span>
                      <span className="info-value">{driver.contactInfo?.address}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Phone size={18} />
                    <div>
                      <span className="info-label">Emergency</span>
                      <span className="info-value">{driver.contactInfo?.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Information */}
              <div className="info-section">
                <h3>Work Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <Briefcase size={18} />
                    <div>
                      <span className="info-label">Experience</span>
                      <span className="info-value">{driver.experience}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Clock size={18} />
                    <div>
                      <span className="info-label">Shift</span>
                      <span className="info-value">{driver.shift}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar size={18} />
                    <div>
                      <span className="info-label">Join Date</span>
                      <span className="info-value">{driver.joinDate}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Truck size={18} />
                    <div>
                      <span className="info-label">Vehicle</span>
                      <span className="info-value">
                        {driver.vehicleInfo ? driver.vehicleInfo.plate : 'Unassigned'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="metrics-section">
                <h3>Key Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <Star size={20} style={{ color: getRatingColor(driver.rating) }} />
                    <span className="metric-value">{driver.rating}</span>
                    <span className="metric-label">Rating</span>
                  </div>
                  <div className="metric-card">
                    <Package size={20} />
                    <span className="metric-value">{driver.deliveriesCompleted}</span>
                    <span className="metric-label">Deliveries</span>
                  </div>
                  <div className="metric-card">
                    <Target size={20} />
                    <span className="metric-value">{driver.onTimeRate}%</span>
                    <span className="metric-label">On-Time</span>
                  </div>
                  <div className="metric-card">
                    <Gauge size={20} />
                    <span className="metric-value">{driver.fuelEfficiency}</span>
                    <span className="metric-label">MPG</span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="certifications-section">
                <h3>Certifications</h3>
                <div className="certifications-list">
                  {driver.certifications?.map((cert, idx) => (
                    <div key={idx} className="certification-item">
                      <Shield size={18} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-section">
                <h3>Recent Activity</h3>
                <div className="activity-timeline">
                  {driver.recentDeliveries?.map((activity, idx) => (
                    <div key={idx} className="timeline-item">
                      <CheckCircle size={16} className={activity.status === 'completed' ? 'completed' : 'in-progress'} />
                      <div>
                        <span className="activity-title">{activity.customer}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="performance-tab">
              {/* Performance Scores */}
              <div className="performance-scores">
                <h3>Performance Scores</h3>
                <div className="scores-grid">
                  <div className="score-card">
                    <div className="score-header">
                      <Shield size={18} />
                      <span>Safety</span>
                    </div>
                    <div className="score-value">{driver.performance?.safetyScore}%</div>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${driver.performance?.safetyScore}%` }} />
                    </div>
                  </div>
                  <div className="score-card">
                    <div className="score-header">
                      <Activity size={18} />
                      <span>Efficiency</span>
                    </div>
                    <div className="score-value">{driver.performance?.efficiency}%</div>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${driver.performance?.efficiency}%` }} />
                    </div>
                  </div>
                  <div className="score-card">
                    <div className="score-header">
                      <Clock size={18} />
                      <span>Punctuality</span>
                    </div>
                    <div className="score-value">{driver.performance?.punctuality}%</div>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${driver.performance?.punctuality}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Performance */}
              <div className="weekly-performance">
                <h3>Weekly Performance</h3>
                <div className="weekly-chart">
                  {weeklyPerformance.map((day, idx) => (
                    <div key={idx} className="chart-bar-container">
                      <div className="chart-bars">
                        <div 
                          className="chart-bar deliveries"
                          style={{ height: `${day.deliveries * 8}px` }}
                        />
                        <div 
                          className="chart-bar ontime"
                          style={{ height: `${day.onTime * 8}px` }}
                        />
                      </div>
                      <span className="chart-label">{day.day}</span>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot deliveries"></span>
                    <span>Total Deliveries</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot ontime"></span>
                    <span>On-Time</span>
                  </div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="stats-summary">
                <div className="stat-row">
                  <span>Total Miles Driven</span>
                  <strong>{driver.totalMiles?.toLocaleString()} mi</strong>
                </div>
                <div className="stat-row">
                  <span>Avg Delivery Time</span>
                  <strong>{driver.avgDeliveryTime} min</strong>
                </div>
                <div className="stat-row">
                  <span>Fuel Efficiency</span>
                  <strong>{driver.fuelEfficiency} MPG</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-tab">
              <h3>Delivery History</h3>
              <div className="delivery-history-list">
                {deliveryHistory.map((delivery, idx) => (
                  <div key={idx} className="history-item">
                    <div className="history-status-icon">
                      <CheckCircle size={16} className="completed" />
                    </div>
                    <div className="history-details">
                      <div className="history-header">
                        <span className="history-customer">{delivery.customer}</span>
                        <div className="history-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              fill={i < delivery.rating ? '#f59e0b' : 'none'}
                              color={i < delivery.rating ? '#f59e0b' : '#d1d5db'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="history-address">{delivery.address}</span>
                      <span className="history-time">{delivery.time}</span>
                    </div>
                    <ChevronRight size={16} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="documents-tab">
              <div className="document-list">
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Driver's License</span>
                    <span className="document-meta">Expires: 12/2025</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">CDL Certificate</span>
                    <span className="document-meta">Expires: 06/2026</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Medical Certificate</span>
                    <span className="document-meta">Expires: 03/2025</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Employment Contract</span>
                    <span className="document-meta">Signed: {driver.joinDate}</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DriverDetailPanel;