import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/global.css';
import './App.css';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Vehicles = lazy(() => import('./pages/Vehicles'));
const Deliveries = lazy(() => import('./pages/Deliveries'));
const Drivers = lazy(() => import('./pages/Drivers'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

// Animated route wrapper component
const AnimatedRoutes = ({ theme }) => {
  const location = useLocation();
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Dashboard theme={theme} />
            </motion.div>
          } 
        />
        <Route 
          path="/vehicles" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Vehicles />
            </motion.div>
          } 
        />
        <Route 
          path="/deliveries" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Deliveries />
            </motion.div>
          } 
        />
        <Route 
          path="/drivers" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Drivers />
            </motion.div>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Reports />
            </motion.div>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Settings />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

// Theme Context
export const ThemeContext = React.createContext();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Show loading spinner on initial load
  if (isLoading) {
    return (
      <div className="app-loading">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-logo">
            <div className="logo-mark">F</div>
            <h1 className="gradient-text">FleetFlow</h1>
          </div>
          <LoadingSpinner size="large" message="Loading your dashboard..." />
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className="app">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={handleSidebarClose}
            collapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebarCollapse}
          />
          
          <motion.div 
            className={`main-wrapper ${sidebarCollapsed ? 'collapsed' : ''}`}
            animate={{ 
              marginLeft: window.innerWidth > 1024 ? (sidebarCollapsed ? 88 : 280) : 0 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Header 
              onMenuClick={handleMenuClick} 
              theme={theme}
              toggleTheme={toggleTheme}
            />
            
            <main className="main-content">
              <Suspense fallback={
                <div className="page-loading">
                  <LoadingSpinner size="large" message="Loading page..." />
                </div>
              }>
                <AnimatedRoutes theme={theme} />
              </Suspense>
            </main>

            {/* Footer */}
            <footer className="app-footer">
              <div className="footer-content">
                <p>© 2024 FleetFlow. All rights reserved.</p>
                <div className="footer-links">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                  <a href="#">Help</a>
                </div>
              </div>
            </footer>
          </motion.div>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;