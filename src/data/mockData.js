// Mock data for FleetFlow Dashboard

export const vehicles = [
  {
    id: 1,
    plate: 'IL 8742A',
    type: 'Truck',
    model: 'Volvo FH16',
    status: 'active',
    driver: 'James Wilson',
    fuelLevel: 85,
    lastMaintenance: '2024-02-15',
    location: { lat: 41.8781, lng: -87.6298 }, // Chicago Loop
    destination: { 
      lat: 41.8825, 
      lng: -87.6420, 
      address: 'Union Station, 225 S Canal St', 
      eta: '10 min', 
      distance: '1.2 mi' 
    }
  },
  {
    id: 2,
    plate: 'IL 521B',
    type: 'Van',
    model: 'Mercedes Sprinter',
    status: 'delivering',
    driver: 'Sarah Johnson',
    fuelLevel: 45,
    lastMaintenance: '2024-01-20',
    location: { lat: 41.8920, lng: -87.6400 },
    destination: { 
      lat: 41.8975, 
      lng: -87.6250, 
      address: 'Navy Pier, 600 E Grand Ave', 
      eta: '15 min', 
      distance: '2.5 mi' 
    }
  },
  {
    id: 3,
    plate: 'IL 903C',
    type: 'Truck',
    model: 'Scania R450',
    status: 'maintenance',
    driver: 'Michael Okafor',
    fuelLevel: 20,
    lastMaintenance: '2024-03-01',
    location: { lat: 41.8700, lng: -87.6100 },
    destination: { 
      lat: 41.8500, 
      lng: -87.6500, 
      address: 'Midway Airport, 5700 S Cicero Ave', 
      eta: '20 min', 
      distance: '5.8 mi' 
    }
  },
  {
    id: 4,
    plate: 'IL 146D',
    type: 'Van',
    model: 'Ford Transit',
    status: 'active',
    driver: 'David Kim',
    fuelLevel: 92,
    lastMaintenance: '2024-02-28',
    location: { lat: 41.8600, lng: -87.6500 },
    destination: { 
      lat: 41.8800, 
      lng: -87.6300, 
      address: 'Willis Tower, 233 S Wacker Dr', 
      eta: '8 min', 
      distance: '0.9 mi' 
    }
  },
  {
    id: 5,
    plate: 'IL 387E',
    type: 'Truck',
    model: 'MAN TGX',
    status: 'delivering',
    driver: 'Maria Garcia',
    fuelLevel: 38,
    lastMaintenance: '2024-02-10',
    location: { lat: 41.9000, lng: -87.6200 },
    destination: { 
      lat: 41.9100, 
      lng: -87.6800, 
      address: 'Wrigley Field, 1060 W Addison St', 
      eta: '22 min', 
      distance: '4.3 mi' 
    }
  },
  {
    id: 6,
    plate: 'IL 672F',
    type: 'Van',
    model: 'Ram ProMaster',
    status: 'active',
    driver: 'Alex Chen',
    fuelLevel: 76,
    lastMaintenance: '2024-02-25',
    location: { lat: 41.8850, lng: -87.6350 },
    destination: { 
      lat: 41.8900, 
      lng: -87.6200, 
      address: 'Millennium Park, 201 E Randolph St', 
      eta: '5 min', 
      distance: '0.6 mi' 
    }
  },
  {
    id: 7,
    plate: 'IL 258G',
    type: 'Truck',
    model: 'Kenworth T680',
    status: 'active',
    driver: 'Lisa Wong',
    fuelLevel: 63,
    lastMaintenance: '2024-02-18',
    location: { lat: 41.8750, lng: -87.6450 },
    destination: { 
      lat: 41.8800, 
      lng: -87.6200, 
      address: 'Art Institute of Chicago, 111 S Michigan Ave', 
      eta: '7 min', 
      distance: '0.8 mi' 
    }
  }
];

export const deliveries = [
  {
    id: 1,
    vehicleId: 2,
    customer: 'Midwest Logistics',
    address: '123 S Wacker Dr, Chicago, IL 60606',
    status: 'in-progress',
    eta: '15 min',
    assignedAt: '08:30 AM'
  },
  {
    id: 2,
    vehicleId: 5,
    customer: 'Chicago Distribution Center',
    address: '456 N Michigan Ave, Chicago, IL 60611',
    status: 'in-progress',
    eta: '32 min',
    assignedAt: '09:15 AM'
  },
  {
    id: 3,
    vehicleId: 1,
    customer: 'O\'Hare Cargo Hub',
    address: '10000 W O\'Hare Ave, Chicago, IL 60666',
    status: 'scheduled',
    eta: '11:30 AM',
    assignedAt: '10:00 AM'
  },
  {
    id: 4,
    vehicleId: 4,
    customer: 'United Warehouse',
    address: '789 W Roosevelt Rd, Chicago, IL 60608',
    status: 'scheduled',
    eta: '01:15 PM',
    assignedAt: '11:30 AM'
  },
  {
    id: 5,
    vehicleId: 6,
    customer: 'South Side Depot',
    address: '234 E 95th St, Chicago, IL 60619',
    status: 'scheduled',
    eta: '02:30 PM',
    assignedAt: '12:00 PM'
  }
];

export const drivers = [
  { id: 1, name: 'James Wilson', vehicleId: 1, phone: '+1 (555) 010-1234', shift: 'Morning', experience: '5 years' },
  { id: 2, name: 'Sarah Johnson', vehicleId: 2, phone: '+1 (555) 010-2345', shift: 'Afternoon', experience: '3 years' },
  { id: 3, name: 'Michael Okafor', vehicleId: 3, phone: '+1 (555) 010-3456', shift: 'Morning', experience: '7 years' },
  { id: 4, name: 'David Kim', vehicleId: 4, phone: '+1 (555) 010-4567', shift: 'Night', experience: '4 years' },
  { id: 5, name: 'Maria Garcia', vehicleId: 5, phone: '+1 (555) 010-5678', shift: 'Afternoon', experience: '6 years' },
  { id: 6, name: 'Alex Chen', vehicleId: 6, phone: '+1 (555) 010-6789', shift: 'Morning', experience: '2 years' },
  { id: 7, name: 'Lisa Wong', vehicleId: 7, phone: '+1 (555) 010-7890', shift: 'Night', experience: '8 years' }
];

export const alerts = [
  {
    id: 1,
    type: 'fuel',
    message: 'Vehicle IL 521B is low on fuel (45%)',
    time: '10 minutes ago',
    priority: 'high'
  },
  {
    id: 2,
    type: 'maintenance',
    message: 'Vehicle IL 903C is due for maintenance',
    time: '1 hour ago',
    priority: 'high'
  },
  {
    id: 3,
    type: 'delay',
    message: 'Delivery to Midwest Logistics may be delayed due to traffic',
    time: '2 hours ago',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'fuel',
    message: 'Vehicle IL 387E fuel level below 40%',
    time: '3 hours ago',
    priority: 'medium'
  }
];

// Helper functions
export const getVehicleById = (id) => {
  return vehicles.find(v => v.id === id);
};

export const getDeliveriesByVehicle = (vehicleId) => {
  return deliveries.filter(d => d.vehicleId === vehicleId);
};

export const getDriverByVehicle = (vehicleId) => {
  return drivers.find(d => d.vehicleId === vehicleId);
};

export const getStats = () => {
  return {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active' || v.status === 'delivering').length,
    activeDeliveries: deliveries.filter(d => d.status === 'in-progress').length,
    totalDrivers: drivers.length,
    activeAlerts: alerts.length
  };
};