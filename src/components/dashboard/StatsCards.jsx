import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Truck, Package, Users, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      id: 1,
      title: 'Active Fleet',
      value: stats.activeVehicles,
      icon: Truck,
      change: 12,
      changeType: 'positive',
      sparklineData: [5, 8, 6, 9, 7, 11, 9],
      gradient: 'linear-gradient(135deg, #0066FF 0%, #00C6FF 100%)'
    },
    {
      id: 2,
      title: 'Active Deliveries',
      value: stats.activeDeliveries,
      icon: Package,
      change: 8,
      changeType: 'positive',
      sparklineData: [3, 5, 7, 6, 8, 7, 9],
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    {
      id: 3,
      title: 'Drivers On Shift',
      value: stats.driversOnShift,
      icon: Users,
      change: 0,
      changeType: 'neutral',
      sparklineData: [4, 4, 5, 5, 5, 6, 6],
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)'
    },
    {
      id: 4,
      title: 'Active Alerts',
      value: stats.activeAlerts,
      icon: AlertTriangle,
      change: -15,
      changeType: 'negative',
      sparklineData: [2, 3, 2, 4, 3, 2, 1],
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="stats-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div 
          key={card.id} 
          className="stat-card glass"
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <div className="stat-card-inner">
            <div className="stat-header">
              <div 
                className="stat-icon-wrapper"
                style={{ background: card.gradient }}
              >
                <card.icon size={20} color="white" />
              </div>
              <div className={`stat-change ${card.changeType}`}>
                {card.changeType === 'positive' && <TrendingUp size={14} />}
                {card.changeType === 'negative' && <TrendingDown size={14} />}
                <span>{card.change > 0 ? '+' : ''}{card.change}%</span>
              </div>
            </div>
            
            <div className="stat-body">
              <div className="stat-value">
                <CountUp end={card.value} duration={2} separator="," />
              </div>
              <div className="stat-title">{card.title}</div>
            </div>

            <div className="stat-sparkline">
              <Sparklines data={card.sparklineData} width={100} height={30}>
                <SparklinesLine 
                  style={{ 
                    stroke: card.changeType === 'positive' ? '#10b981' : 
                            card.changeType === 'negative' ? '#ef4444' : '#8b5cf6',
                    strokeWidth: 2,
                    fill: 'none'
                  }} 
                />
              </Sparklines>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCards;