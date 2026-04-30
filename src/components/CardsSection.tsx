import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagneticCard,
  DefaultCard,
  FeaturedCard,
  MinimalCard,
  InteractiveCard,
  GradientCard,
  ShadowCard,
  HeartCard,
} from 'animora';

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type PreviewCardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

type CardDefinition = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  exportName: string;
  Component: React.ComponentType<PreviewCardProps>;
};

const CARDS: CardDefinition[] = [
  {
    id: 'magnetic',
    title: 'Magnetic Card',
    subtitle: '3D Glow',
    description: 'Mouse-tracking card with tilt, glow, and depth interaction',
    exportName: 'MagneticCard',
    Component: MagneticCard,
  },
  {
    id: 'default',
    title: 'Default Card',
    subtitle: 'Standard',
    description: 'Basic card layout with header and content',
    exportName: 'DefaultCard',
    Component: DefaultCard,
  },
  {
    id: 'featured',
    title: 'Featured Card',
    subtitle: 'Highlighted',
    description: 'Featured card with accent styling',
    exportName: 'FeaturedCard',
    Component: FeaturedCard,
  },
  {
    id: 'minimal',
    title: 'Minimal Card',
    subtitle: 'Clean',
    description: 'Minimal card without border',
    exportName: 'MinimalCard',
    Component: MinimalCard,
  },
  {
    id: 'interactive',
    title: 'Interactive Card',
    subtitle: 'Clickable',
    description: 'Card with hover and click interactions',
    exportName: 'InteractiveCard',
    Component: InteractiveCard,
  },
  {
    id: 'gradient',
    title: 'Gradient Card',
    subtitle: 'Vibrant',
    description: 'Card with gradient background',
    exportName: 'GradientCard',
    Component: GradientCard,
  },
  {
    id: 'shadow',
    title: 'Shadow Card',
    subtitle: 'Elevated',
    description: 'Card with enhanced shadow effect',
    exportName: 'ShadowCard',
    Component: ShadowCard,
  },
  {
    id: 'heart',
    title: 'Heart Card',
    subtitle: 'Lovely',
    description: 'Heart-shaped visual with soft pulse and floating love particles',
    exportName: 'HeartCard',
    Component: HeartCard,
  },
];

interface CardComponentProps {
  card: CardDefinition;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `import { ${card.exportName} } from 'animora'\n\n<${card.exportName}\n  title="${card.title}"\n  subtitle="${card.subtitle}"\n>\n  {children}\n</${card.exportName}>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <motion.div
      className="character-card"
      variants={cardAnim}
      initial="hidden"
      animate="show"
      whileHover={{ y: -8 }}
    >
      <div className="card-header">
        <h3 className="card-title">{card.title}</h3>
        <div className="card-icons">
          <button className="icon-btn preview-btn" title="Preview" onClick={() => setShowCode(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button className="icon-btn code-btn" title="View Code" onClick={() => setShowCode((prev) => !prev)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </button>
          <button
            className={`icon-btn copy-btn ${copiedCode ? 'copied' : ''}`}
            title="Copy Code"
            onClick={handleCopyCode}
          >
            {copiedCode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <motion.div className="card-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {!showCode ? (
          <card.Component title={card.title} subtitle={card.subtitle} />
        ) : (
          <div className="code-block">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </motion.div>

      <div className="card-info">
        <p className="emotion-label">
          <strong>Type:</strong> {card.id}
        </p>
        <p className="action-label">{card.description}</p>
      </div>
    </motion.div>
  );
};

const CardsSection: React.FC = () => {
  const containerAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="section-content">
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Cards Showcase</h1>
        <p>Container components for displaying content with various styles.</p>
      </motion.header>

      <motion.section className="characters-grid" variants={containerAnim} initial="hidden" animate="show">
        {CARDS.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </motion.section>
    </div>
  );
};

export default CardsSection;
