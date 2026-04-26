import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  onClear,
  className = "" 
}) => {
  return (
    <div className={`search-bar ${className}`}>
      <Search size={18} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      {value && (
        <button className="search-clear" onClick={onClear}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;