import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Truck, User, MapPin, Calendar, Fuel, Wrench, 
  Activity, AlertTriangle, FileText, History, Settings,
  Phone, MessageSquare, Navigation, Gauge, Thermometer,
  Battery, Droplet, Clock, CheckCircle, AlertCircle,
  ChevronRight, Download, Share2, MoreVertical, Package,
  TrendingUp, TrendingDown, Zap, Tool
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import './VehicleDetailPanel.css';

const VehicleDetailPanel = ({ vehicle, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'trips', label: 'Trips', icon: Navigation },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const getFuelColor = (level) => {
    if (level >= 70) return '#10b981';
    if (level >= 30) return '#f59e0b';
    return '#ef4444';
  };

  const getHealthStatus = (value, type) => {
    const thresholds = {
      battery: { good: 12.5, warning: 12 },
      temp: { good: 200, warning: 220 },
      oil: { good: 70, warning: 50 },
      coolant: { good: 70, warning: 50 }
    };
    const threshold = thresholds[type];
    if (!threshold) return 'good';
    if (value >= threshold.good) return 'good';
    if (value >= threshold.warning) return 'warning';
    return 'critical';
  };

  // Mock maintenance history
  const maintenanceHistory = [
    { date: '2024-03-15', type: 'Oil Change', mileage: 45000, cost: 189.99, status: 'completed' },
    { date: '2024-02-20', type: 'Tire Rotation', mileage: 42000, cost: 89.99, status: 'completed' },
    { date: '2024-01-10', type: 'Brake Inspection', mileage: 38000, cost: 129.99, status: 'completed' },
    { date: '2024-04-01', type: 'Engine Diagnostic', mileage: 48000, cost: 0, status: 'scheduled' },
  ];

  // Mock recent trips
  const recentTrips = [
    { id: 1, from: 'Chicago, IL', to: 'Milwaukee, WI', distance: 92, duration: 105, fuel: 8.5, date: '2024-03-20' },
    { id: 2, from: 'Chicago, IL', to: 'Indianapolis, IN', distance: 185, duration: 195, fuel: 16.2, date: '2024-03-19' },
    { id: 3, from: 'Chicago, IL', to: 'Detroit, MI', distance: 283, duration: 280, fuel: 24.8, date: '2024-03-18' },
  ];

  return (
    <motion.div 
      className="vehicle-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="vehicle-detail-panel"
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
            <div className="vehicle-title">
              <div className="vehicle-icon-large">
                <Truck size={24} />
              </div>
              <div>
                <h2>{vehicle.plate}</h2>
                <p>{vehicle.model} • {vehicle.type}</p>
              </div>
            </div>
          </div>
          <div className="header-right">
            <StatusBadge status={vehicle.status} />
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

        {/* Quick Actions Bar */}
        <div className="quick-actions-bar">
          <button className="quick-action">
            <Navigation size={18} />
            <span>Navigate</span>
          </button>
          <button className="quick-action">
            <Phone size={18} />
            <span>Call Driver</span>
          </button>
          <button className="quick-action">
            <MessageSquare size={18} />
            <span>Message</span>
          </button>
          <button className="quick-action">
            <Settings size={18} />
            <span>Service</span>
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

        {/* Tab Content */}
        <div className="panel-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              {/* Status Cards */}
              <div className="status-cards">
                <div className="status-card">
                  <Fuel size={20} />
                  <div>
                    <span className="status-value" style={{ color: getFuelColor(vehicle.fuelLevel) }}>
                      {vehicle.fuelLevel}%
                    </span>
                    <span className="status-label">Fuel Level</span>
                  </div>
                </div>
                <div className="status-card">
                  <Gauge size={20} />
                  <div>
                    <span className="status-value">{vehicle.mileage?.toLocaleString()}</span>
                    <span className="status-label">Mileage</span>
                  </div>
                </div>
                <div className="status-card">
                  <Clock size={20} />
                  <div>
                    <span className="status-value">{vehicle.engineHours}</span>
                    <span className="status-label">Engine Hours</span>
                  </div>
                </div>
                <div className="status-card">
                  <MapPin size={20} />
                  <div>
                    <span className="status-value">Chicago, IL</span>
                    <span className="status-label">Location</span>
                  </div>
                </div>
              </div>

              {/* Driver Card */}
              <div className="driver-card">
                <div className="driver-avatar-xlarge">
                  {vehicle.driver.charAt(0)}
                </div>
                <div className="driver-info-detailed">
                  <h3>{vehicle.driver}</h3>
                  <p>Driver ID: #{vehicle.driverInfo?.id || 'N/A'}</p>
                  <p>Experience: {vehicle.driverInfo?.experience || '5 years'}</p>
                  <p>Phone: {vehicle.driverInfo?.phone || '+1 (555) 000-0000'}</p>
                </div>
              </div>

              {/* Vehicle Health */}
              <div className="health-section">
                <h3>Vehicle Health</h3>
                <div className="health-grid">
                  <div className={`health-card ${getHealthStatus(vehicle.batteryVoltage, 'battery')}`}>
                    <Battery size={20} />
                    <div>
                      <span className="health-value">{vehicle.batteryVoltage}V</span>
                      <span className="health-label">Battery</span>
                    </div>
                  </div>
                  <div className={`health-card ${getHealthStatus(vehicle.engineTemp, 'temp')}`}>
                    <Thermometer size={20} />
                    <div>
                      <span className="health-value">{vehicle.engineTemp}°F</span>
                      <span className="health-label">Engine Temp</span>
                    </div>
                  </div>
                  <div className={`health-card ${getHealthStatus(vehicle.oilLevel, 'oil')}`}>
                    <Droplet size={20} />
                    <div>
                      <span className="health-value">{vehicle.oilLevel}%</span>
                      <span className="health-label">Oil Level</span>
                    </div>
                  </div>
                  <div className={`health-card ${getHealthStatus(vehicle.coolantLevel, 'coolant')}`}>
                    <Zap size={20} />
                    <div>
                      <span className="health-value">{vehicle.coolantLevel}%</span>
                      <span className="health-label">Coolant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tire Pressure */}
              <div className="tire-section">
                <h3>Tire Pressure</h3>
                <div className="tire-grid">
                  <div className="tire-card">
                    <span className="tire-position">Front Left</span>
                    <span className="tire-value">{vehicle.tirePressure?.front} PSI</span>
                  </div>
                  <div className="tire-card">
                    <span className="tire-position">Front Right</span>
                    <span className="tire-value">{vehicle.tirePressure?.front} PSI</span>
                  </div>
                  <div className="tire-card">
                    <span className="tire-position">Rear Left</span>
                    <span className="tire-value">{vehicle.tirePressure?.rear} PSI</span>
                  </div>
                  <div className="tire-card">
                    <span className="tire-position">Rear Right</span>
                    <span className="tire-value">{vehicle.tirePressure?.rear} PSI</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="maintenance-tab">
              <div className="maintenance-summary">
                <div className="summary-card">
                  <Wrench size={24} />
                  <div>
                    <span className="summary-value">{vehicle.nextService}</span>
                    <span className="summary-label">Miles to next service</span>
                  </div>
                </div>
                <div className="summary-card">
                  <Calendar size={24} />
                  <div>
                    <span className="summary-value">{vehicle.lastMaintenance}</span>
                    <span className="summary-label">Last maintenance</span>
                  </div>
                </div>
              </div>

              <h3>Maintenance History</h3>
              <div className="maintenance-history">
                {maintenanceHistory.map((record, index) => (
                  <div key={index} className="history-item">
                    <div className={`history-status ${record.status}`}>
                      {record.status === 'completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="history-details">
                      <span className="history-type">{record.type}</span>
                      <span className="history-meta">{record.date} • {record.mileage} mi</span>
                    </div>
                    <span className="history-cost">${record.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="trips-tab">
              <div className="trip-summary">
                <div className="summary-card">
                  <Navigation size={24} />
                  <div>
                    <span className="summary-value">560</span>
                    <span className="summary-label">Miles this week</span>
                  </div>
                </div>
                <div className="summary-card">
                  <Fuel size={24} />
                  <div>
                    <span className="summary-value">49.5</span>
                    <span className="summary-label">Gallons used</span>
                  </div>
                </div>
              </div>

              <h3>Recent Trips</h3>
              <div className="recent-trips">
                {recentTrips.map(trip => (
                  <div key={trip.id} className="trip-item">
                    <div className="trip-route">
                      <MapPin size={14} />
                      <span>{trip.from} → {trip.to}</span>
                    </div>
                    <div className="trip-stats">
                      <span>{trip.distance} mi</span>
                      <span>{trip.duration} min</span>
                      <span>{trip.fuel} gal</span>
                    </div>
                    <span className="trip-date">{trip.date}</span>
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
                    <span className="document-name">Registration</span>
                    <span className="document-meta">Expires: 12/2024</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Insurance Certificate</span>
                    <span className="document-meta">Expires: 06/2024</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Inspection Report</span>
                    <span className="document-meta">03/15/2024</span>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                  </button>
                </div>
                <div className="document-item">
                  <FileText size={20} />
                  <div>
                    <span className="document-name">Maintenance Log</span>
                    <span className="document-meta">Updated: 03/20/2024</span>
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

export default VehicleDetailPanel;