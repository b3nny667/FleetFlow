import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'active':
        return { label: 'Active', className: 'status-active' };
      case 'delivering':
        return { label: 'Delivering', className: 'status-delivering' };
      case 'maintenance':
        return { label: 'Maintenance', className: 'status-maintenance' };
      case 'in-progress':
        return { label: 'In Progress', className: 'status-in-progress' };
      case 'scheduled':
        return { label: 'Scheduled', className: 'status-scheduled' };
      case 'completed':
        return { label: 'Completed', className: 'status-completed' };
      case 'delayed':
        return { label: 'Delayed', className: 'status-delayed' };
      default:
        return { label: status || 'Unknown', className: 'status-default' };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`status-badge ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;