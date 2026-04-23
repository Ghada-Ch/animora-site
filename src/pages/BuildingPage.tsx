import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {Character} from 'animora-kit';
import type { Emotion } from 'animora-kit';
import type { CharacterType, CharacterAction } from 'animora-kit';
import '../styles/BuildingPage.css';

const EMOTIONS: Emotion[] = [
  'happy',
  'excited',
  'thinking',
  'sad',
  'angry',
  'love',
  'neutral',
];

const ACTIONS: CharacterAction[] = [
  'idle',
  'eye-contact',
  'cover-eyes',
  'turn-back',
  'say-no',
  'walk',
  'jump',
  'wave',
];

const CHARACTERS: CharacterType[] = ['fox', 'robot', 'ghost', 'boy', 'panda'];

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface CharacterCardProps {
  type: CharacterType;
  selectedEmotion: Emotion;
  selectedAction: CharacterAction;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  type,
  selectedEmotion,
  selectedAction,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `import { Character } from 'animora'

<Character
  type="${type}"
  emotion="${selectedEmotion}"
  action="${selectedAction}"
  size="lg"
  variant="glowing"
/>`;

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
      {/* Card Header with Icons */}
      <div className="card-header">
        <h3 className="card-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <div className="card-icons">
          <button
            className="icon-btn preview-btn"
            title="Preview"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            className="icon-btn code-btn"
            title="View Code"
            onClick={() => setIsExpanded(!isExpanded)}
          >
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

      {/* Character Preview */}
      <div className="card-preview">
        <Character
          type={type}
          size="lg"
          emotion={selectedEmotion}
          action={selectedAction}
          variant="glowing"
          interactive
        />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          className="card-expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="code-block">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </motion.div>
      )}

      {/* Card Info */}
      <div className="card-info">
        <p className="emotion-label">Emotion: {selectedEmotion}</p>
        <p className="action-label">Action: {selectedAction}</p>
      </div>
    </motion.div>
  );
};

const BuildingPage: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('happy');
  const [selectedAction, setSelectedAction] = useState<CharacterAction>('idle');

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
    <div className="building-page">
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
        <h1>Start Building with Animora</h1>
        <p>Interactive character showcase — pick emotions and actions to see them in action.</p>
      </motion.header>

      {/* Controls */}
      <motion.section
        className="controls-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="control-group">
          <label>Emotion</label>
          <div className="emotion-grid">
            {EMOTIONS.map(emotion => (
              <button
                key={emotion}
                className={`emotion-btn ${emotion === selectedEmotion ? 'active' : ''}`}
                onClick={() => setSelectedEmotion(emotion)}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Action</label>
          <div className="action-grid">
            {ACTIONS.map(action => (
              <button
                key={action}
                className={`action-btn ${action === selectedAction ? 'active' : ''}`}
                onClick={() => setSelectedAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Character Cards Grid */}
      <motion.section
        className="characters-grid"
        variants={containerAnim}
        initial="hidden"
        animate="show"
      >
        {CHARACTERS.map(type => (
          <CharacterCard
            key={type}
            type={type}
            selectedEmotion={selectedEmotion}
            selectedAction={selectedAction}
          />
        ))}
      </motion.section>

      {/* Footer Info */}
      <motion.section
        className="building-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Quick Tips</h2>
        <ul>
          <li>
            <strong>Preview</strong> — Click the eye icon to expand and see code
          </li>
          <li>
            <strong>Code</strong> — View the component code for each character
          </li>
          <li>
            <strong>Copy</strong> — Click the copy icon to get the code snippet
          </li>
          <li>
            <strong>Customize</strong> — Mix emotions, actions, and sizes to your needs
          </li>
        </ul>
      </motion.section>
    </div>
  );
};

export default BuildingPage;
