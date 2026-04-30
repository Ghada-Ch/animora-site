import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import CharactersSection from '../components/CharactersSection';
import BannersSection from '../components/BannersSection';
import ButtonsSection from '../components/ButtonsSection';
import CardsSection from '../components/CardsSection';
import type { ComponentCategory } from '../components/Sidebar';
import '../styles/BuildingPage.css';


const BuildingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('characters');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeCategory) {
      case 'characters':
        return <CharactersSection />;
      case 'banners':
        return <BannersSection />;
      case 'buttons':
        return <ButtonsSection />;
      case 'cards':
        return <CardsSection />;
      default:
        return <CharactersSection />;
    }
  };

  return (
    <div className="building-page-wrapper">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onCollapsedChange={setIsSidebarCollapsed}
      />
      <div className={`building-page ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="building-ambient ambient ambient-one" />
        <div className="building-ambient ambient ambient-two" />

        {/* Header */}
        <motion.header
          className="building-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="back-link">
            ← Back
          </Link>
        </motion.header>

        {/* Render active section */}
        {renderSection()}
      </div>
    </div>
  );
};

export default BuildingPage;
