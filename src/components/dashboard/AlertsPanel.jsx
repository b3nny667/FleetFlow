import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Fuel, Wrench, Clock, X, CheckCircle } from 'lucide-react';
import './AlertsPanel.css';

const AlertsPanel = ({ alerts, onDismiss }) => {
  const getAlertIcon = (type) => {
    switch(type) {
      case 'fuel': return <Fuel size={16} />;
      case 'maintenance': return <Wrench size={16} />;
      case 'delay': return <Clock size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  return (
    <div className="alerts-container glass">
      <div className="alerts-header">
        <h3>Alerts & Notifications</h3>
        <span className={`alert-badge ${alerts.length > 0 ? 'active' : ''}`}>
          {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'}
        </span>
      </div>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <motion.div 
            className="no-alerts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CheckCircle size={40} color="var(--success)" />
            <h4>All systems operational</h4>
            <p>No active alerts at this time</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                className={`alert-item ${alert.priority}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="alert-icon">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <button className="alert-dismiss" onClick={() => onDismiss(alert.id)}>
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;