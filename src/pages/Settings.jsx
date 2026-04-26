import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Moon, Sun, Save } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@fleetflow.com',
      role: 'Fleet Manager',
      phone: '+1 (555) 010-1234'
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      deliveryUpdates: true,
      maintenanceAlerts: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'America/Chicago'
    }
  });

  const handleProfileChange = (field, value) => {
    setSettings({
      ...settings,
      profile: { ...settings.profile, [field]: value }
    });
  };

  const handleNotificationChange = (field) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [field]: !settings.notifications[field] }
    });
  };

  const handlePreferenceChange = (field, value) => {
    setSettings({
      ...settings,
      preferences: { ...settings.preferences, [field]: value }
    });
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-nav">
            <button className="settings-nav-item active">
              <User size={18} />
              Profile
            </button>
            <button className="settings-nav-item">
              <Bell size={18} />
              Notifications
            </button>
            <button className="settings-nav-item">
              <Shield size={18} />
              Security
            </button>
            <button className="settings-nav-item">
              <Globe size={18} />
              Preferences
            </button>
          </div>
        </div>

        <div className="settings-content">
          {/* Profile Section */}
          <div className="settings-section">
            <h2>Profile Information</h2>
            <p>Update your personal information</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={settings.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={settings.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input 
                  type="text" 
                  value={settings.profile.role}
                  disabled
                  className="disabled"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={settings.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="settings-section">
            <h2>Notification Preferences</h2>
            <p>Choose how you want to be notified</p>
            
            <div className="settings-options">
              <div className="option-item">
                <div className="option-info">
                  <span className="option-title">Email Alerts</span>
                  <span className="option-description">Receive updates via email</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.emailAlerts}
                    onChange={() => handleNotificationChange('emailAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="option-item">
                <div className="option-info">
                  <span className="option-title">Push Notifications</span>
                  <span className="option-description">Receive browser notifications</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.pushNotifications}
                    onChange={() => handleNotificationChange('pushNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="option-item">
                <div className="option-info">
                  <span className="option-title">Delivery Updates</span>
                  <span className="option-description">Get notified about delivery status</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.deliveryUpdates}
                    onChange={() => handleNotificationChange('deliveryUpdates')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="option-item">
                <div className="option-info">
                  <span className="option-title">Maintenance Alerts</span>
                  <span className="option-description">Vehicle maintenance reminders</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.maintenanceAlerts}
                    onChange={() => handleNotificationChange('maintenanceAlerts')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="settings-section">
            <h2>Preferences</h2>
            <p>Customize your experience</p>
            
            <div className="settings-form">
              <div className="form-group">
                <label>Theme</label>
                <div className="theme-options">
                  <button 
                    className={`theme-option ${settings.preferences.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handlePreferenceChange('theme', 'light')}
                  >
                    <Sun size={16} />
                    Light
                  </button>
                  <button 
                    className={`theme-option ${settings.preferences.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handlePreferenceChange('theme', 'dark')}
                  >
                    <Moon size={16} />
                    Dark
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select 
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date Format</label>
                <select 
                  value={settings.preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Timezone</label>
                <select 
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                >
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSave}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;