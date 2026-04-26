import React from 'react';
import { Package, Search, Filter, AlertCircle } from 'lucide-react';
import './EmptyState.css';

const EmptyState = ({ 
  type = "default", 
  title, 
  message, 
  actionText, 
  onAction,
  icon: CustomIcon 
}) => {
  const getDefaultConfig = () => {
    switch(type) {
      case 'search':
        return {
          icon: Search,
          title: title || "No results found",
          message: message || "Try adjusting your search or filter to find what you're looking for."
        };
      case 'filter':
        return {
          icon: Filter,
          title: title || "No items match",
          message: message || "Try changing your filter criteria."
        };
      case 'error':
        return {
          icon: AlertCircle,
          title: title || "Something went wrong",
          message: message || "Please try again later."
        };
      default:
        return {
          icon: Package,
          title: title || "No data available",
          message: message || "There's nothing to display here yet."
        };
    }
  };

  const config = getDefaultConfig();
  const Icon = CustomIcon || config.icon;

  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 className="empty-title">{config.title}</h3>
      <p className="empty-message">{config.message}</p>
      {actionText && onAction && (
        <button className="empty-action" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;