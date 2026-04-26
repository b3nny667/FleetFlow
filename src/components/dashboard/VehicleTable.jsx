import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Fuel, Wrench, ChevronUp, ChevronDown, Truck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import './VehicleTable.css';

const VehicleTable = ({ vehicles, onViewDetails }) => {
  const [sortField, setSortField] = useState('plate');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'fuelLevel') {
      aVal = a.fuelLevel;
      bVal = b.fuelLevel;
    }
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const getFuelColor = (level) => {
    if (level >= 70) return '#10b981';
    if (level >= 30) return '#f59e0b';
    return '#ef4444';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUp size={14} className="sort-icon-inactive" />;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="vehicle-table-container glass">
      <div className="table-header">
        <h3>Fleet Status</h3>
        <span className="vehicle-count">{vehicles.length} vehicles</span>
      </div>
      
      <div className="table-responsive">
        <table className="vehicle-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('plate')}>
                Vehicle <SortIcon field="plate" />
              </th>
              <th onClick={() => handleSort('type')}>
                Type <SortIcon field="type" />
              </th>
              <th>Driver</th>
              <th>Status</th>
              <th onClick={() => handleSort('fuelLevel')}>
                Fuel <SortIcon field="fuelLevel" />
              </th>
              <th>Last Maintenance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedVehicles.map((vehicle) => (
                <motion.tr
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="vehicle-row"
                  whileHover={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <td>
                    <div className="vehicle-info">
                      <div className="vehicle-icon">
                        <Truck size={16} />
                      </div>
                      <div>
                        <div className="vehicle-plate">{vehicle.plate}</div>
                        <div className="vehicle-model">{vehicle.model}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="vehicle-type-badge">{vehicle.type}</span>
                  </td>
                  <td>
                    <div className="driver-info">
                      <div className="driver-avatar">{vehicle.driver.charAt(0)}</div>
                      <span>{vehicle.driver}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={vehicle.status} /></td>
                  <td>
                    <div className="fuel-cell">
                      <div className="fuel-bar">
                        <div 
                          className="fuel-fill"
                          style={{ 
                            width: `${vehicle.fuelLevel}%`,
                            backgroundColor: getFuelColor(vehicle.fuelLevel)
                          }}
                        />
                      </div>
                      <span className="fuel-text">{vehicle.fuelLevel}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="maintenance-cell">
                      <Wrench size={14} />
                      <span>{vehicle.lastMaintenance}</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => onViewDetails(vehicle.id)}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;