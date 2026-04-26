import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vehicles, drivers } from '../data/mockData';
import StatusBadge from '../components/common/StatusBadge';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import VehicleDetailPanel from '../components/vehicles/VehicleDetailPanel';
import { 
  Filter, ChevronRight, Truck, Package, Fuel, Wrench, 
  MapPin, Clock, AlertCircle, Gauge, Calendar, User,
  Battery, Thermometer, Droplet, Settings, Activity,
  AlertTriangle, CheckCircle, XCircle, Plus, MoreVertical,
  Navigation, Phone, MessageSquare, History, FileText
} from 'lucide-react';
import './Vehicles.css';

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const statusOptions = ['all', 'active', 'delivering', 'maintenance', 'idle'];
  const typeOptions = ['all', 'Truck', 'Van'];

  // Enrich vehicle data with additional info
  const enrichedVehicles = useMemo(() => {
    return vehicles.map(vehicle => {
      const driver = drivers.find(d => d.vehicleId === vehicle.id);
      return {
        ...vehicle,
        driverInfo: driver,
        mileage: Math.floor(Math.random() * 50000) + 20000,
        nextService: Math.floor(Math.random() * 5000) + 1000,
        engineHours: Math.floor(Math.random() * 5000) + 2000,
        tirePressure: {
          front: Math.floor(Math.random() * 10) + 30,
          rear: Math.floor(Math.random() * 10) + 30
        },
        batteryVoltage: (Math.random() * 2 + 12).toFixed(1),
        engineTemp: Math.floor(Math.random() * 30) + 170,
        oilLevel: Math.floor(Math.random() * 30) + 60,
        coolantLevel: Math.floor(Math.random() * 30) + 60,
        lastTrip: {
          distance: Math.floor(Math.random() * 200) + 50,
          duration: Math.floor(Math.random() * 180) + 60,
          fuelUsed: (Math.random() * 20 + 5).toFixed(1)
        },
        alerts: []
      };
    });
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = enrichedVehicles;
    
    if (searchTerm) {
      result = result.filter(v => 
        v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.driver.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(v => v.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(v => v.type === typeFilter);
    }
    
    return result;
  }, [searchTerm, statusFilter, typeFilter, enrichedVehicles]);

  const getFuelColor = (level) => {
    if (level >= 70) return '#10b981';
    if (level >= 30) return '#f59e0b';
    return '#ef4444';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'delivering': return '#3b82f6';
      case 'maintenance': return '#ef4444';
      case 'idle': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getVehicleIcon = (type) => {
    return type === 'Truck' ? '🚛' : '🚐';
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <LoadingSpinner size="large" message="Loading fleet data..." />
      </div>
    );
  }

  return (
    <div className="vehicles-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">
              Fleet <span className="gradient-text">Management</span>
            </h1>
            <p className="page-subtitle">Monitor and manage your entire fleet in real-time</p>
          </div>
          <div className="header-actions">
            <button className="add-vehicle-btn">
              <Plus size={18} />
              <span>Add Vehicle</span>
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

        {/* Stats Summary */}
        <div className="fleet-stats">
          <div className="stat-item">
            <Truck size={20} />
            <div>
              <span className="stat-value">{vehicles.length}</span>
              <span className="stat-label">Total Vehicles</span>
            </div>
          </div>
          <div className="stat-item">
            <Activity size={20} />
            <div>
              <span className="stat-value">{vehicles.filter(v => v.status === 'active' || v.status === 'delivering').length}</span>
              <span className="stat-label">Active</span>
            </div>
          </div>
          <div className="stat-item">
            <Wrench size={20} />
            <div>
              <span className="stat-value">{vehicles.filter(v => v.status === 'maintenance').length}</span>
              <span className="stat-label">In Maintenance</span>
            </div>
          </div>
          <div className="stat-item">
            <AlertCircle size={20} />
            <div>
              <span className="stat-value">{vehicles.filter(v => v.fuelLevel < 30).length}</span>
              <span className="stat-label">Low Fuel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="vehicles-controls">
        <SearchBar 
          placeholder="Search by plate, model, or driver..."
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          className="vehicles-search"
        />
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Status' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <Truck size={16} className="filter-icon" />
            <select 
              className="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Types' : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vehicle Grid/List */}
      {filteredVehicles.length === 0 ? (
        <EmptyState 
          type="search"
          title="No vehicles found"
          message="Try adjusting your search or filter criteria"
          actionText="Clear filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setTypeFilter('all');
          }}
        />
      ) : (
        <div className={`vehicles-${viewMode}`}>
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className={`vehicle-card ${viewMode === 'list' ? 'list-view' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              {/* Status Indicator Bar */}
              <div 
                className="vehicle-status-bar"
                style={{ backgroundColor: getStatusColor(vehicle.status) }}
              />

              {/* Card Header */}
              <div className="vehicle-card-header">
                <div className="vehicle-type">
                  <span className="vehicle-emoji">{getVehicleIcon(vehicle.type)}</span>
                  <div>
                    <h3 className="vehicle-plate">{vehicle.plate}</h3>
                    <p className="vehicle-model">{vehicle.model}</p>
                  </div>
                </div>
                <StatusBadge status={vehicle.status} />
              </div>

              {/* Card Body */}
              <div className="vehicle-card-body">
                {/* Driver Info */}
                <div className="driver-section">
                  <div className="driver-avatar-large">
                    {vehicle.driver.charAt(0)}
                  </div>
                  <div className="driver-details">
                    <span className="driver-name">{vehicle.driver}</span>
                    <span className="driver-shift">
                      {vehicle.driverInfo?.shift || 'Day'} Shift
                    </span>
                  </div>
                  <div className="driver-actions">
                    <button className="driver-action-btn" title="Call driver">
                      <Phone size={16} />
                    </button>
                    <button className="driver-action-btn" title="Message driver">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats">
                  <div className="stat">
                    <MapPin size={14} />
                    <span>Chicago, IL</span>
                  </div>
                  <div className="stat">
                    <Gauge size={14} />
                    <span>{vehicle.mileage?.toLocaleString()} mi</span>
                  </div>
                  <div className="stat">
                    <Clock size={14} />
                    <span>{vehicle.engineHours} hrs</span>
                  </div>
                </div>

                {/* Fuel Level */}
                <div className="fuel-section">
                  <div className="fuel-header">
                    <div className="fuel-label">
                      <Fuel size={14} />
                      <span>Fuel Level</span>
                    </div>
                    <span className="fuel-percentage" style={{ color: getFuelColor(vehicle.fuelLevel) }}>
                      {vehicle.fuelLevel}%
                    </span>
                  </div>
                  <div className="fuel-bar-container">
                    <div 
                      className="fuel-bar-fill"
                      style={{ 
                        width: `${vehicle.fuelLevel}%`,
                        backgroundColor: getFuelColor(vehicle.fuelLevel)
                      }}
                    />
                  </div>
                  {vehicle.fuelLevel < 30 && (
                    <div className="fuel-warning">
                      <AlertTriangle size={12} />
                      <span>Low fuel warning</span>
                    </div>
                  )}
                </div>

                {/* Health Indicators */}
                <div className="health-indicators">
                  <div className="health-item">
                    <Battery size={14} />
                    <span>{vehicle.batteryVoltage}V</span>
                  </div>
                  <div className="health-item">
                    <Thermometer size={14} />
                    <span>{vehicle.engineTemp}°F</span>
                  </div>
                  <div className="health-item">
                    <Droplet size={14} />
                    <span>{vehicle.oilLevel}%</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="vehicle-card-footer">
                <div className="maintenance-info">
                  <Wrench size={14} />
                  <span>Service in {vehicle.nextService} mi</span>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVehicle(vehicle);
                  }}
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Alerts Badge */}
              {vehicle.fuelLevel < 30 && (
                <div className="vehicle-alert-badge">
                  <AlertTriangle size={12} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Vehicle Detail Panel */}
      <AnimatePresence>
        {selectedVehicle && (
          <VehicleDetailPanel 
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vehicles;