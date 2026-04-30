import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PrimaryButton,
  LoveButton,
  GlowButton,
  SoftButton,
  DangerButton,
} from 'animora';

type PreviewButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonDefinition = {
  id: string;
  label: string;
  description: string;
  exportName: string;
  Component: React.ComponentType<PreviewButtonProps>;
};

const BUTTONS: ButtonDefinition[] = [
  {
    id: 'primary',
    label: 'Primary',
    description: 'Main call-to-action button with gradient emphasis',
    exportName: 'PrimaryButton',
    Component: PrimaryButton,
  },
  {
    id: 'love',
    label: 'Love',
    description: 'Warm and playful pink action button',
    exportName: 'LoveButton',
    Component: LoveButton,
  },
  {
    id: 'glow',
    label: 'Glow',
    description: 'Neon-style button with subtle glow reaction',
    exportName: 'GlowButton',
    Component: GlowButton,
  },
  {
    id: 'soft',
    label: 'Soft',
    description: 'Low-contrast calm button for secondary actions',
    exportName: 'SoftButton',
    Component: SoftButton,
  },
  {
    id: 'danger',
    label: 'Danger',
    description: 'Destructive action button with strong warning style',
    exportName: 'DangerButton',
    Component: DangerButton,
  },
  {
    id: 'buy',
    label: 'Buy',
    description: 'Primary call-to-action button for purchasing items',
    exportName: 'BuyButton',
    Component: DangerButton,
  },
];

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface ButtonCardProps {
  button: ButtonDefinition;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ button }) => {
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `import { ${button.exportName} } from 'animora'\n\n<${button.exportName} onClick={handleClick}>\n  ${button.label}\n</${button.exportName}>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <motion.div className="character-card" variants={cardAnim} initial="hidden" animate="show" whileHover={{ y: -8 }}>
      <div className="card-header">
        <h3 className="card-title">{button.label}</h3>
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
          <button className={`icon-btn copy-btn ${copiedCode ? 'copied' : ''}`} title="Copy Code" onClick={handleCopyCode}>
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
          <button.Component>{button.label}</button.Component>
        ) : (
          <div className="code-block">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </motion.div>

      <div className="card-info">
        <p className="emotion-label">{button.description}</p>
      </div>
    </motion.div>
  );
};

const ButtonsSection: React.FC = () => {
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
        <h1>Buttons Showcase</h1>
        <p>Reusable button components with distinct styles and interactions.</p>
      </motion.header>

      <motion.section className="characters-grid" variants={containerAnim} initial="hidden" animate="show">
        {BUTTONS.map((button) => (
          <ButtonCard key={button.id} button={button} />
        ))}
      </motion.section>
    </div>
  );
};

export default ButtonsSection;
