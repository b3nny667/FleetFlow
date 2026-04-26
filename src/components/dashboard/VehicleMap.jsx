import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Navigation, Clock, Truck, MapPin, Package, 
  Gauge, Maximize, Minimize, X, 
  AlertTriangle, CheckCircle, Fuel, Wrench,
  Menu, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import './VehicleMap.css';

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getMarkerColor = (status) => {
  switch(status) {
    case 'active': return '#10b981';
    case 'delivering': return '#3b82f6';
    case 'maintenance': return '#ef4444';
    default: return '#6b7280';
  }
};

const createVehicleMarker = (status, isHovered) => {
  const color = getMarkerColor(status);
  const size = isHovered ? 18 : 14;
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3),0 0 0 ${isHovered ? '6px' : '0px'} ${color}40;transition:all 0.3s ease;"></div>`,
    className: 'vehicle-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

const createTruckMarkerIcon = () => {
  return L.divIcon({
    html: `<div style="width:44px;height:44px;background:linear-gradient(135deg,#3b82f6,#2563eb);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid white;box-shadow:0 4px 12px rgba(59,130,246,0.4);animation:truckFloat 2s ease-in-out infinite;"><span>🚛</span></div>`,
    className: 'truck-marker-icon',
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
};

const createDestinationMarkerIcon = () => {
  return L.divIcon({
    html: `<div style="width:36px;height:36px;background:linear-gradient(135deg,#ef4444,#dc2626);border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 4px 12px rgba(239,68,68,0.4);animation:pinBounce 1s ease-in-out infinite;"><span style="transform:rotate(45deg);">📍</span></div>`,
    className: 'destination-marker-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
};

// Mini Map Preview Component
const MiniMapPreview = ({ vehicle, position, onClose }) => {
  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  const centerLat = (vehicle.location.lat + vehicle.destination.lat) / 2;
  const centerLng = (vehicle.location.lng + vehicle.destination.lng) / 2;
  const latDiff = Math.abs(vehicle.location.lat - vehicle.destination.lat);
  const lngDiff = Math.abs(vehicle.location.lng - vehicle.destination.lng);
  const maxDiff = Math.max(latDiff, lngDiff);
  const calculatedZoom = maxDiff < 0.01 ? 15 : maxDiff < 0.02 ? 14 : maxDiff < 0.05 ? 13 : 12;

  return (
    <motion.div 
      className="mini-map-wrapper"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      <div className="mini-map-header">
        <div className="mini-header-left">
          <div className="mini-header-icon"><Truck size={18} color="white" /></div>
          <div>
            <span className="mini-header-title">{vehicle.plate}</span>
            <span className="mini-header-subtitle">{vehicle.driver}</span>
          </div>
        </div>
        <div className="mini-header-right">
          <div className="mini-eta-badge"><Clock size={12} /><span>{vehicle.destination.eta}</span></div>
          <button className="mini-close-btn" onClick={onClose}><X size={14} /></button>
        </div>
      </div>
      <div className="mini-map-container">
        <MapContainer
          center={[centerLat, centerLng]} zoom={calculatedZoom}
          className="mini-leaflet-map" zoomControl={false}
          dragging={false} scrollWheelZoom={false}
          doubleClickZoom={false} touchZoom={false}
          attributionControl={false} key={`mini-${vehicle.id}`}
        >
          <TileLayer url={tileUrl} />
          <Polyline
            positions={[[vehicle.location.lat, vehicle.location.lng],[vehicle.destination.lat, vehicle.destination.lng]]}
            pathOptions={{ color: '#3b82f6', weight: 3, opacity: 0.8, dashArray: '8, 8', className: 'animated-route-line' }}
          />
          <Marker position={[vehicle.location.lat, vehicle.location.lng]} icon={createTruckMarkerIcon()} />
          <Marker position={[vehicle.destination.lat, vehicle.destination.lng]} icon={createDestinationMarkerIcon()} />
        </MapContainer>
      </div>
      <div className="mini-map-footer">
        <div className="route-details">
          <div className="route-point-info">
            <div className="route-icon truck-icon-bg"><Truck size={16} color="#3b82f6" /></div>
            <div className="route-text">
              <span className="route-label">Current Location</span>
              <span className="route-value">Chicago Loop</span>
            </div>
          </div>
          <div className="route-connector">
            <div className="connector-line"></div>
            <div className="connector-badge"><Gauge size={10} /><span>{vehicle.destination.distance}</span></div>
            <div className="connector-line"></div>
          </div>
          <div className="route-point-info">
            <div className="route-icon destination-icon-bg"><MapPin size={16} color="#ef4444" /></div>
            <div className="route-text">
              <span className="route-label">Destination</span>
              <span className="route-value">{vehicle.destination.address}</span>
            </div>
          </div>
        </div>
        <div className="route-stats">
          <div className="stat-item-mini"><Package size={12} /><span>{vehicle.type}</span></div>
          <div className="stat-item-mini"><Gauge size={12} /><span>{vehicle.fuelLevel}% Fuel</span></div>
        </div>
      </div>
    </motion.div>
  );
};

// Fullscreen Vehicle Info Panel
const FullscreenVehicleInfo = ({ vehicle, onClose }) => (
  <motion.div 
    className="fullscreen-vehicle-info"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <div className="fs-info-header">
      <Truck size={20} />
      <div>
        <strong>{vehicle.plate}</strong>
        <span>{vehicle.driver}</span>
      </div>
      <button onClick={onClose}><X size={16} /></button>
    </div>
    <div className="fs-info-body">
      <div className="fs-info-row"><MapPin size={14} /><span>{vehicle.destination?.address || 'No destination'}</span></div>
      <div className="fs-info-row"><Clock size={14} /><span>ETA: {vehicle.destination?.eta || 'N/A'} • {vehicle.destination?.distance || 'N/A'}</span></div>
      <div className="fs-info-row"><Gauge size={14} /><span>Fuel: {vehicle.fuelLevel}%</span></div>
      <div className="fs-info-row"><CheckCircle size={14} /><span>Status: {vehicle.status}</span></div>
    </div>
  </motion.div>
);

// Fullscreen Collapsible Sidebar
const FullscreenSidebar = ({ 
  vehicles, hoveredVehicle, onVehicleHover, onVehicleLeave, 
  isOpen, onToggle 
}) => {
  const activeVehicles = vehicles.filter(v => v.status === 'active' || v.status === 'delivering');
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance');

  const renderVehicleItem = (vehicle) => (
    <div 
      key={vehicle.id}
      className={`fs-vehicle-item ${hoveredVehicle?.id === vehicle.id ? 'hovered' : ''}`}
      onMouseEnter={() => onVehicleHover(vehicle)}
      onMouseLeave={onVehicleLeave}
    >
      <div className="fs-vehicle-dot" style={{ backgroundColor: getMarkerColor(vehicle.status) }}></div>
      <div className="fs-vehicle-details">
        <span className="fs-vehicle-plate">{vehicle.plate}</span>
        <span className="fs-vehicle-driver">{vehicle.driver}</span>
      </div>
      <div className="fs-vehicle-fuel">
        <Fuel size={12} />
        <span>{vehicle.fuelLevel}%</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <motion.div 
        className={`fs-sidebar ${isOpen ? 'open' : 'closed'}`}
        animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="fs-sidebar-header">
          <div className="fs-sidebar-header-left">
            <Truck size={20} />
            <h3>Fleet Overview</h3>
          </div>
          <div className="fs-sidebar-header-right">
            <span className="fs-vehicle-count">{vehicles.length}</span>
            <button className="fs-sidebar-close-btn" onClick={onToggle} title="Close Sidebar">
              <PanelLeftClose size={18} />
            </button>
          </div>
        </div>
        
        <div className="fs-sidebar-body">
          <div className="fs-section">
            <div className="fs-section-title">
              <CheckCircle size={14} color="#10b981" />
              <span>Active Vehicles</span>
              <span className="fs-section-count">{activeVehicles.length}</span>
            </div>
            {activeVehicles.map(renderVehicleItem)}
          </div>
          
          {maintenanceVehicles.length > 0 && (
            <div className="fs-section">
              <div className="fs-section-title">
                <Wrench size={14} color="#ef4444" />
                <span>Maintenance</span>
                <span className="fs-section-count">{maintenanceVehicles.length}</span>
              </div>
              {maintenanceVehicles.map(renderVehicleItem)}
            </div>
          )}
        </div>

        <div className="fs-sidebar-footer">
          <div className="fs-sidebar-legend">
            <div className="fs-legend-item-small">
              <div className="legend-dot active"></div><span>Active</span>
            </div>
            <div className="fs-legend-item-small">
              <div className="legend-dot delivering"></div><span>Delivering</span>
            </div>
            <div className="fs-legend-item-small">
              <div className="legend-dot maintenance"></div><span>Maintenance</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Toggle Button when sidebar is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fs-sidebar-toggle-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onToggle}
            title="Open Fleet List"
          >
            <PanelLeftOpen size={20} />
            <span className="toggle-badge">{vehicles.length}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

// Fullscreen Bottom Bar
const FullscreenBottomBar = ({ vehicles }) => {
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const deliveringCount = vehicles.filter(v => v.status === 'delivering').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  const lowFuelCount = vehicles.filter(v => v.fuelLevel < 30).length;

  return (
    <motion.div 
      className="fs-bottom-bar"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div className="fs-stats">
        <div className="fs-stat">
          <div className="fs-stat-icon active"><Truck size={16} /></div>
          <div><span className="fs-stat-value">{activeCount}</span><span className="fs-stat-label">Active</span></div>
        </div>
        <div className="fs-stat">
          <div className="fs-stat-icon delivering"><Package size={16} /></div>
          <div><span className="fs-stat-value">{deliveringCount}</span><span className="fs-stat-label">Delivering</span></div>
        </div>
        <div className="fs-stat">
          <div className="fs-stat-icon maintenance"><Wrench size={16} /></div>
          <div><span className="fs-stat-value">{maintenanceCount}</span><span className="fs-stat-label">Maintenance</span></div>
        </div>
        <div className="fs-stat">
          <div className="fs-stat-icon warning"><AlertTriangle size={16} /></div>
          <div><span className="fs-stat-value">{lowFuelCount}</span><span className="fs-stat-label">Low Fuel</span></div>
        </div>
      </div>
      <div className="fs-legend">
        <div className="fs-legend-title">Map Legend</div>
        <div className="fs-legend-items">
          <div className="fs-legend-item"><div className="legend-dot active"></div><span>Active</span></div>
          <div className="fs-legend-item"><div className="legend-dot delivering"></div><span>Delivering</span></div>
          <div className="fs-legend-item"><div className="legend-dot maintenance"></div><span>Maintenance</span></div>
          <div className="fs-legend-item"><div className="legend-line"></div><span>Route</span></div>
          <div className="fs-legend-item"><span className="legend-icon">🚛</span><span>Vehicle</span></div>
          <div className="fs-legend-item"><span className="legend-icon">📍</span><span>Destination</span></div>
        </div>
      </div>
    </motion.div>
  );
};

// Main VehicleMap Component
const VehicleMap = ({ vehicles, theme }) => {
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mapContainerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  
  const center = [41.8781, -87.6298];
  const zoom = 12;

  const tileUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleMarkerHover = useCallback((vehicle, event) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    if (event) {
      const containerRect = mapContainerRef.current?.getBoundingClientRect();
      if (containerRect) {
        const x = event.originalEvent.clientX - containerRect.left;
        const y = event.originalEvent.clientY - containerRect.top;
        let posX = x - 165;
        let posY = y - 400;
        if (posX < 10) posX = 10;
        if (posX + 330 > containerRect.width) posX = containerRect.width - 340;
        if (posY < 10) posY = 10;
        if (posY + 380 > containerRect.height) posY = containerRect.height - 390;
        setTooltipPosition({ x: posX, y: posY });
      }
    }
    setHoveredVehicle(vehicle);
  }, []);

  const handleSidebarHover = useCallback((vehicle) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredVehicle(vehicle);
  }, []);

  const handleMarkerOut = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredVehicle(null);
    }, 300);
  }, []);

  const handleMiniMapClose = useCallback(() => {
    setHoveredVehicle(null);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setHoveredVehicle(null);
    setSidebarOpen(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isVehicleHovered = (vehicleId) => {
    return hoveredVehicle?.id === vehicleId;
  };

  return (
    <div className={`vehicle-map-container ${isFullscreen ? 'fullscreen' : ''}`} ref={mapContainerRef}>
      {/* Header */}
      <div className="map-header">
        <div className="map-header-left">
          {isFullscreen && (
            <button className="fs-hamburger-btn" onClick={toggleSidebar} title="Toggle Fleet List">
              <Menu size={20} />
            </button>
          )}
          <h3>
            <Navigation size={18} />
            {isFullscreen ? 'Fleet Command Center - Chicago' : 'Live Fleet Tracking - Chicago'}
          </h3>
        </div>
        <div className="map-header-actions">
          {!isFullscreen && (
            <div className="map-legend">
              <div className="legend-item"><div className="legend-dot active"></div><span>Active</span></div>
              <div className="legend-item"><div className="legend-dot delivering"></div><span>Delivering</span></div>
              <div className="legend-item"><div className="legend-dot maintenance"></div><span>Maintenance</span></div>
            </div>
          )}
          <button className="fullscreen-btn" onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}>
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>
      
      {/* Map Area */}
      <div className="map-main-area">
        <MapContainer center={center} zoom={zoom} className="vehicle-map" scrollWheelZoom={true}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url={tileUrl} />
          
          {vehicles.map((vehicle) => (
            <Marker
              key={vehicle.id}
              position={[vehicle.location.lat, vehicle.location.lng]}
              icon={createVehicleMarker(vehicle.status, isVehicleHovered(vehicle.id))}
              eventHandlers={{
                mouseover: (e) => handleMarkerHover(vehicle, e),
                mouseout: handleMarkerOut,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <div className="popup-header"><Truck size={16} /><strong>{vehicle.type} - {vehicle.plate}</strong></div>
                  <div className="popup-body">
                    <p>Driver: {vehicle.driver}</p>
                    <p>Status: <span style={{ color: getMarkerColor(vehicle.status), fontWeight: 600 }}>{vehicle.status}</span></p>
                    <p>Fuel: {vehicle.fuelLevel}%</p>
                    {vehicle.destination && (
                      <>
                        <div className="popup-divider"></div>
                        <p><MapPin size={12} /> Destination: {vehicle.destination.address}</p>
                        <p><Clock size={12} /> ETA: {vehicle.destination.eta} • {vehicle.destination.distance}</p>
                      </>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {hoveredVehicle?.destination && (
            <Polyline
              positions={[[hoveredVehicle.location.lat, hoveredVehicle.location.lng],[hoveredVehicle.destination.lat, hoveredVehicle.destination.lng]]}
              pathOptions={{ color: getMarkerColor(hoveredVehicle.status), weight: 3, opacity: 0.8, dashArray: '10, 10', className: 'animated-dash-line' }}
            />
          )}
        </MapContainer>

        {/* Mini Map Preview - normal mode */}
        <AnimatePresence>
          {hoveredVehicle && !isFullscreen && (
            <MiniMapPreview vehicle={hoveredVehicle} position={tooltipPosition} onClose={handleMiniMapClose} />
          )}
        </AnimatePresence>

        {/* Fullscreen Overlays */}
        <AnimatePresence>
          {isFullscreen && (
            <>
              <FullscreenSidebar 
                vehicles={vehicles} 
                hoveredVehicle={hoveredVehicle}
                onVehicleHover={handleSidebarHover}
                onVehicleLeave={handleMarkerOut}
                isOpen={sidebarOpen}
                onToggle={toggleSidebar}
              />
              {hoveredVehicle && (
                <FullscreenVehicleInfo vehicle={hoveredVehicle} onClose={handleMiniMapClose} />
              )}
              <FullscreenBottomBar vehicles={vehicles} />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleMap;