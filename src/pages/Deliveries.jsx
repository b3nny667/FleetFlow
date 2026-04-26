import React, { useState, useMemo } from 'react';
import { deliveries, vehicles } from '../data/mockData';
import StatusBadge from '../components/common/StatusBadge';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { MapPin, Clock, Package, Truck } from 'lucide-react';
import './Deliveries.css';

const Deliveries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const statusOptions = ['all', 'in-progress', 'scheduled', 'completed', 'delayed'];

  const filteredDeliveries = useMemo(() => {
    let result = deliveries;
    
    if (searchTerm) {
      result = result.filter(d => 
        d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(d => d.status === statusFilter);
    }
    
    return result;
  }, [searchTerm, statusFilter]);

  const getVehiclePlate = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.plate : 'Unassigned';
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Loading deliveries..." />;
  }

  return (
    <div className="deliveries-page">
      <div className="page-header">
        <h1>Deliveries</h1>
        <p>Track and manage all deliveries</p>
      </div>

      <div className="deliveries-controls">
        <SearchBar 
          placeholder="Search by customer or address..."
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          className="deliveries-search"
        />
        <div className="filter-group">
          <select 
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredDeliveries.length === 0 ? (
        <EmptyState 
          type="search"
          title="No deliveries found"
          message="Try adjusting your search or filter criteria"
          actionText="Clear filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className="deliveries-table-container">
          <table className="deliveries-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Address</th>
                <th>Vehicle</th>
                <th>ETA</th>
                <th>Assigned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map(delivery => (
                <tr key={delivery.id} className="delivery-row">
                  <td className="delivery-customer-cell">
                    <Package size={16} />
                    <span>{delivery.customer}</span>
                  </td>
                  <td className="delivery-address-cell">
                    <MapPin size={14} />
                    <span>{delivery.address}</span>
                  </td>
                  <td>
                    <div className="delivery-vehicle-cell">
                      <Truck size={14} />
                      <span>{getVehiclePlate(delivery.vehicleId)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="delivery-eta-cell">
                      <Clock size={14} />
                      <span>{delivery.eta}</span>
                    </div>
                  </td>
                  <td>{delivery.assignedAt}</td>
                  <td><StatusBadge status={delivery.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Deliveries;