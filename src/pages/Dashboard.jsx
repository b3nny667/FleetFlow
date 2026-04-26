import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Activity, Clock, 
  CheckCircle, XCircle, Calendar, Download,
  Package, Truck, Users, AlertTriangle
} from 'lucide-react';
import StatsCards from '../components/dashboard/StatsCards';
import VehicleMap from '../components/dashboard/VehicleMap';
import VehicleTable from '../components/dashboard/VehicleTable';
import DeliveriesList from '../components/dashboard/DeliveriesList';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import { vehicles, deliveries, drivers, alerts } from '../data/mockData';
import './Dashboard.css';

const Dashboard = ({ theme }) => {
  const [stats, setStats] = useState({
    activeVehicles: 0,
    activeDeliveries: 0,
    driversOnShift: 0,
    activeAlerts: 0,
    completionRate: 94,
    avgDeliveryTime: 32,
    onTimeRate: 89,
    delayedDeliveries: 3
  });
  
  const [currentAlerts, setCurrentAlerts] = useState(alerts);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate stats and recent activity
  useEffect(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'active' || v.status === 'delivering').length;
    const activeDeliveries = deliveries.filter(d => d.status === 'in-progress').length;
    const driversOnShift = drivers.length;
    const activeAlerts = currentAlerts.length;

    setStats({
      activeVehicles,
      activeDeliveries,
      driversOnShift,
      activeAlerts,
      completionRate: 94,
      avgDeliveryTime: 32,
      onTimeRate: 89,
      delayedDeliveries: deliveries.filter(d => d.status === 'delayed').length || 3
    });

    // Generate recent activity with more variety
    setRecentActivity([
      { 
        id: 1, 
        action: 'Vehicle IL 8742A completed delivery to Midwest Logistics', 
        time: '5 min ago', 
        type: 'success',
        icon: CheckCircle
      },
      { 
        id: 2, 
        action: 'New delivery assigned to Sarah Johnson (IL 521B)', 
        time: '12 min ago', 
        type: 'info',
        icon: Package
      },
      { 
        id: 3, 
        action: 'Vehicle IL 903C entered maintenance mode', 
        time: '25 min ago', 
        type: 'warning',
        icon: AlertTriangle
      },
      { 
        id: 4, 
        action: 'Driver James Wilson started morning shift', 
        time: '1 hour ago', 
        type: 'success',
        icon: Users
      },
      { 
        id: 5, 
        action: 'Low fuel alert for vehicle IL 387E (38%)', 
        time: '2 hours ago', 
        type: 'error',
        icon: AlertTriangle
      },
    ]);
  }, [currentAlerts]);

  const handleViewVehicleDetails = (vehicleId) => {
    console.log('View vehicle details:', vehicleId);
    // You can add modal or navigation logic here
  };

  const handleDismissAlert = (alertId) => {
    setCurrentAlerts(currentAlerts.filter(alert => alert.id !== alertId));
  };

  const handleExportReport = () => {
    console.log('Exporting report...');
    // Add export logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <div className="loading-pulse">
            <Truck size={48} className="loading-icon" />
          </div>
          <h2>Loading Dashboard</h2>
          <p>Preparing your fleet overview...</p>
          <div className="loading-progress">
            <div className="loading-progress-bar" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dashboard Header */}
      <motion.div className="dashboard-header" variants={itemVariants}>
        <div className="header-content">
          <div>
            <h1 className="dashboard-title">
              Welcome back, <span className="gradient-text">John</span>
            </h1>
            <p className="dashboard-subtitle">
              Here's what's happening with your fleet today.
            </p>
          </div>
          <div className="dashboard-actions">
            <div className="date-range-wrapper">
              <Calendar size={16} className="calendar-icon" />
              <select className="date-range glass">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <button className="export-btn glass" onClick={handleExportReport}>
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <StatsCards stats={stats} />
      </motion.div>

      {/* Map and Deliveries Row */}
      <motion.div className="dashboard-grid" variants={itemVariants}>
        <div className="map-section">
          <VehicleMap vehicles={vehicles} theme={theme} />
        </div>
        <div className="deliveries-section">
          <DeliveriesList 
            deliveries={deliveries.filter(d => d.status === 'in-progress')} 
            vehicles={vehicles} 
          />
        </div>
      </motion.div>

      {/* Vehicle Table and Alerts Row */}
      <motion.div className="dashboard-grid-2" variants={itemVariants}>
        <div className="table-section">
          <div className="section-header">
            <h3>Fleet Status</h3>
            <a href="/vehicles" className="section-link">
              View All <span className="arrow">→</span>
            </a>
          </div>
          <VehicleTable 
            vehicles={vehicles.slice(0, 5)} 
            onViewDetails={handleViewVehicleDetails} 
          />
        </div>
        <div className="alerts-section">
          <div className="section-header">
            <h3>Alerts & Notifications</h3>
            <span className={`alert-count ${currentAlerts.length > 0 ? 'active' : ''}`}>
              {currentAlerts.length} {currentAlerts.length === 1 ? 'alert' : 'alerts'}
            </span>
          </div>
          <AlertsPanel alerts={currentAlerts} onDismiss={handleDismissAlert} />
        </div>
      </motion.div>

      {/* Additional Stats Row */}
      <motion.div className="dashboard-stats-row" variants={itemVariants}>
        <div className="stat-card-horizontal glass">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
            <Activity size={22} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Completion Rate</span>
            <span className="stat-number">{stats.completionRate}%</span>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +5% vs last week
            </span>
          </div>
        </div>
        
        <div className="stat-card-horizontal glass">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
            <Clock size={22} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Avg Delivery Time</span>
            <span className="stat-number">{stats.avgDeliveryTime} min</span>
            <span className="stat-trend negative">
              <TrendingDown size={14} />
              +8% vs last week
            </span>
          </div>
        </div>
        
        <div className="stat-card-horizontal glass">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
            <CheckCircle size={22} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">On-Time Rate</span>
            <span className="stat-number">{stats.onTimeRate}%</span>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +3% vs last week
            </span>
          </div>
        </div>
        
        <div className="stat-card-horizontal glass">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
            <XCircle size={22} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Delayed Deliveries</span>
            <span className="stat-number">{stats.delayedDeliveries}</span>
            <span className="stat-trend negative">
              <TrendingDown size={14} />
              -1 vs yesterday
            </span>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div className="recent-activity glass" variants={itemVariants}>
        <div className="section-header">
          <h3>Recent Activity</h3>
          <button className="view-all-btn">
            View All Activity
          </button>
        </div>
        <div className="activity-timeline">
          {recentActivity.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <motion.div 
                key={activity.id} 
                className={`activity-item ${activity.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`activity-icon ${activity.type}`}>
                  <IconComponent size={16} />
                </div>
                <div className="activity-content">
                  <p className="activity-text">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Actions Floating Button (Mobile) */}
      <motion.button 
        className="quick-action-fab"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Package size={24} />
      </motion.button>
    </motion.div>
  );
};

export default Dashboard;