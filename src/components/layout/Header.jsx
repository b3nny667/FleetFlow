import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu, Sun, Moon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = ({ onMenuClick, theme, toggleTheme }) => {
  const location = useLocation();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/vehicles') return 'Fleet';
    if (path === '/deliveries') return 'Deliveries';
    if (path === '/drivers') return 'Drivers';
    if (path === '/reports') return 'Analytics';
    if (path === '/settings') return 'Settings';
    return 'FleetFlow';
  };

  return (
    <>
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="header-left">
          <button className="menu-btn" onClick={onMenuClick} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="header-title-wrapper">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-subtitle">Fleet intelligence</p>
          </div>
        </div>

        <div className="header-right">
          {/* Mobile Search Toggle */}
          <button 
            className="mobile-search-toggle"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          {/* Desktop Search */}
          <div className="search-wrapper desktop-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="search-input"
            />
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="notification-wrapper">
            <button className="notification-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-dot pulse"></span>
            </button>
          </div>

          <div className="user-profile">
            <div className="user-avatar-sm">JD</div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div 
            className="mobile-search-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-search-container">
              <Search size={20} className="mobile-search-icon" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="mobile-search-input"
                autoFocus
              />
              <button 
                className="mobile-search-close"
                onClick={() => setShowMobileSearch(false)}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;