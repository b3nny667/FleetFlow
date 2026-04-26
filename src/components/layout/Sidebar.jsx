import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  LayoutDashboard, Truck, Package, Users, BarChart3, 
  Settings, LogOut, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/vehicles', icon: Truck, label: 'Fleet' },
    { path: '/deliveries', icon: Package, label: 'Deliveries' },
    { path: '/drivers', icon: Users, label: 'Drivers' },
    { path: '/reports', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

  // Handle swipe to close
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sidebar-overlay"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside 
        className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
        animate={{ 
          width: window.innerWidth < 1024 ? 280 : (collapsed ? 88 : 280),
          x: window.innerWidth < 1024 ? (isOpen ? 0 : -280) : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag={window.innerWidth < 1024 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-mark">F</div>
            {(!collapsed || window.innerWidth < 1024) && (
              <span className="logo-text">FleetFlow</span>
            )}
          </div>
          <div className="sidebar-controls">
            {window.innerWidth >= 1024 && (
              <button 
                className="collapse-btn" 
                onClick={onToggleCollapse}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            )}
            <button 
              className="sidebar-close" 
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <item.icon size={20} />
              {(!collapsed || window.innerWidth < 1024) && <span>{item.label}</span>}
              {collapsed && window.innerWidth >= 1024 && (
                <span className="tooltip">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} />
            {(!collapsed || window.innerWidth < 1024) && <span>Sign out</span>}
          </button>
          <div className="user-info">
            <div className="user-avatar">JD</div>
            {(!collapsed || window.innerWidth < 1024) && (
              <div className="user-details">
                <span className="user-name">John Doe</span>
                <span className="user-role">Director</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Swipe indicator for mobile */}
        <div className="swipe-indicator">
          <div className="swipe-line"></div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;