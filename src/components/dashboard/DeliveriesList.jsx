import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Package, User, ChevronRight, Truck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import './DeliveriesList.css';

const DeliveriesList = ({ deliveries, vehicles }) => {
  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle || { plate: 'Unassigned', driver: 'Unknown' };
  };

  return (
    <div className="deliveries-container glass">
      <div className="deliveries-header">
        <h3>Active Deliveries</h3>
        <span className="delivery-count">{deliveries.length} in progress</span>
      </div>
      
      <div className="deliveries-list">
        {deliveries.map((delivery, index) => {
          const vehicle = getVehicleInfo(delivery.vehicleId);
          return (
            <motion.div
              key={delivery.id}
              className="delivery-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="delivery-status-indicator" style={{ 
                backgroundColor: delivery.status === 'in-progress' ? '#3b82f6' : 
                                 delivery.status === 'delayed' ? '#ef4444' : '#10b981' 
              }} />
              
              <div className="delivery-content">
                <div className="delivery-header">
                  <div className="customer-info">
                    <Package size={18} />
                    <span className="customer-name">{delivery.customer}</span>
                  </div>
                  <StatusBadge status={delivery.status} />
                </div>
                
                <div className="delivery-address">
                  <MapPin size={14} />
                  <span>{delivery.address}</span>
                </div>
                
                <div className="delivery-details">
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>ETA: {delivery.eta}</span>
                  </div>
                  <div className="detail-item">
                    <User size={14} />
                    <span>{vehicle.driver}</span>
                  </div>
                  <div className="detail-item">
                    <Truck size={14} />
                    <span>{vehicle.plate}</span>
                  </div>
                </div>
                
                <div className="delivery-progress">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: delivery.status === 'in-progress' ? '65%' : 
                               delivery.status === 'delayed' ? '30%' : '100%' 
                      }}
                    />
                  </div>
                  <button className="track-btn">
                    Track <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveriesList;