import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, TrendingUp, Truck, Package, Clock } from 'lucide-react';
import './Reports.css';

const Reports = () => {
  const [dateRange, setDateRange] = useState('week');

  // Mock data for charts
  const deliveryData = [
    { day: 'Mon', deliveries: 24, completed: 22 },
    { day: 'Tue', deliveries: 28, completed: 26 },
    { day: 'Wed', deliveries: 32, completed: 30 },
    { day: 'Thu', deliveries: 30, completed: 28 },
    { day: 'Fri', deliveries: 35, completed: 33 },
    { day: 'Sat', deliveries: 20, completed: 18 },
    { day: 'Sun', deliveries: 15, completed: 14 },
  ];

  const fuelData = [
    { day: 'Mon', consumption: 450 },
    { day: 'Tue', consumption: 520 },
    { day: 'Wed', consumption: 480 },
    { day: 'Thu', consumption: 510 },
    { day: 'Fri', consumption: 560 },
    { day: 'Sat', consumption: 380 },
    { day: 'Sun', consumption: 320 },
  ];

  const vehicleStatusData = [
    { name: 'Active', value: 8, color: '#10b981' },
    { name: 'Delivering', value: 5, color: '#3b82f6' },
    { name: 'Maintenance', value: 2, color: '#ef4444' },
  ];

  const summaryStats = [
    { label: 'Total Deliveries', value: '184', change: '+12%', icon: Package, color: '#3b82f6' },
    { label: 'Active Vehicles', value: '13', change: '+2', icon: Truck, color: '#10b981' },
    { label: 'Avg Delivery Time', value: '32', change: '-5%', unit: 'min', icon: Clock, color: '#8b5cf6' },
    { label: 'Completion Rate', value: '94', change: '+3%', unit: '%', icon: TrendingUp, color: '#f59e0b' },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>View performance metrics and insights</p>
        </div>
        <div className="report-controls">
          <div className="date-range-selector">
            <Calendar size={16} />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="export-btn">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="summary-stats">
        {summaryStats.map((stat, index) => (
          <div key={index} className="summary-card">
            <div className="summary-icon" style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="summary-info">
              <span className="summary-label">{stat.label}</span>
              <span className="summary-value">
                {stat.value}
                {stat.unit && <small>{stat.unit}</small>}
              </span>
              <span className={`summary-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Delivery Performance</h3>
            <p>Daily delivery volume vs completion rate</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="deliveries" name="Total Deliveries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Fuel Consumption</h3>
            <p>Daily fuel usage in gallons</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumption" name="Fuel (gal)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Vehicle Status Distribution</h3>
            <p>Current fleet status breakdown</p>
          </div>
          <div className="chart-container pie-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Key Metrics</h3>
            <p>Performance indicators</p>
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">On-Time Delivery Rate</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '92%', backgroundColor: '#10b981' }}></div>
              </div>
              <span className="metric-value">92%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Vehicle Utilization</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '78%', backgroundColor: '#3b82f6' }}></div>
              </div>
              <span className="metric-value">78%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Driver Efficiency</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '85%', backgroundColor: '#8b5cf6' }}></div>
              </div>
              <span className="metric-value">85%</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Customer Satisfaction</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '4.5', backgroundColor: '#f59e0b' }}></div>
              </div>
              <span className="metric-value">4.5/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;