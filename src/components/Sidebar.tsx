import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Sidebar.css';

export type ComponentCategory = 'characters' | 'banners' | 'buttons' | 'cards';

interface SidebarProps {
  activeCategory: ComponentCategory;
  onCategoryChange: (category: ComponentCategory) => void;
  onCollapsedChange?: (isCollapsed: boolean) => void;
}

const CATEGORIES: Array<{ id: ComponentCategory; label: string; icon: string }> = [
  {
    id: 'characters',
    label: 'Characters',
    icon: '👤',
  },
  {
    id: 'banners',
    label: 'Banners',
    icon: '🎨',
  },
  {
    id: 'buttons',
    label: 'Buttons',
    icon: '🔘',
  },
  {
    id: 'cards',
    label: 'Cards',
    icon: '📋',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, onCollapsedChange }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleCollapsedToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapsedChange?.(newCollapsedState);
  };

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <h2 className="sidebar-title">Components</h2>
        )}
        <button
          className="sidebar-toggle"
          onClick={handleCollapsedToggle}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points={isCollapsed ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            className={`nav-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{category.icon}</span>
            {!isCollapsed && (
              <span className="nav-label">{category.label}</span>
            )}
            {activeCategory === category.id && !isCollapsed && (
              <motion.div
                className="nav-indicator"
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Sidebar Footer Info */}
      {!isCollapsed && (
        <motion.div
          className="sidebar-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="footer-text">Select a component category to explore</p>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
