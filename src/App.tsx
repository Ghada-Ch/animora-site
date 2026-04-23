import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Character, AnimatedButton } from "animora-kit";
import type { Emotion } from 'animora-kit';
import type { CharacterAction, CharacterType } from 'animora-kit';
import './App.css';

type EmotionSpec = {
  name: Emotion;
  color: string;
  label: string;
};

const EMOTIONS: EmotionSpec[] = [
  { name: 'happy', color: '#FFD166', label: 'Happy' },
  { name: 'excited', color: '#22D3AE', label: 'Excited' },
  { name: 'thinking', color: '#60A5FA', label: 'Thinking' },
  { name: 'sad', color: '#818CF8', label: 'Sad' },
  { name: 'angry', color: '#F87171', label: 'Angry' },
  { name: 'love', color: '#F472B6', label: 'Love' },
  { name: 'neutral', color: '#94A3B8', label: 'Neutral' },
];

const CHARACTERS: CharacterType[] = ['fox', 'robot', 'ghost', 'boy', 'panda'];
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

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const LOGO_IMAGE = '/logo.png';

const App: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('happy');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>('fox');
  const [selectedAction, setSelectedAction] = useState<CharacterAction>('idle');
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0 });

  const selectedEmotionSpec = useMemo(
    () => EMOTIONS.find(item => item.name === selectedEmotion) || EMOTIONS[0],
    [selectedEmotion],
  );

  return (
    <div className="animora-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <main className="animora-board">
        <motion.section
          className="panel hero-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65 }}
        >
          <div className="hero-content">
            <div className="brand-lockup">
              <img src={LOGO_IMAGE} alt="Animora logo" className="logo-image logo-image-main" />
              <div>
                <h1>animora</h1>
                <p className="hero-tagline">Bring interfaces to life.</p>
              </div>
            </div>
            <p className="hero-copy">
              Animora is a JavaScript library of 100+ living characters and an
              emotion engine that makes your UI expressive, interactive, and alive.
            </p>
            <div className="hero-pill-row">
              <span>100+ Characters</span>
              <span>Emotion Engine</span>
              <span>Lightweight</span>
            </div>
          </div>
          
          <motion.div>
          <div
            style={{ marginBottom: '50px' }}
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1, x: hoverOffset.x, y: hoverOffset.y }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onMouseEnter={() =>
              setHoverOffset({
                x: Math.round((Math.random() - 0.5) * 48),
                y: Math.round((Math.random() - 0.5) * 28),
              })
            }
            onMouseLeave={() => setHoverOffset({ x: 0, y: 0 })}
          >
            <Character
              type={selectedCharacter}
              size="2xl"
              emotion={selectedEmotion}
              action={selectedAction}
              variant="glowing"
              interactive
            />
            </div>
           <Link to="/start-building" style={{ marginTop: '500px' }}>
            <AnimatedButton variant="primary" character="robot" emotion="happy">
              Start Building
            </AnimatedButton>
            </Link>
          </motion.div>
         
        </motion.section>

        <motion.section
          className="panel logo-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.08 }}
        >
          <h2>Logo System</h2>
          <p>Primary lockup plus avatar mark for compact surfaces.</p>
          <div className="logo-panel-grid">
            <div className="mini-logo square">
              <img src={LOGO_IMAGE} alt="Animora square mark" className="logo-image logo-image-small" />
            </div>
            <div className="mini-logo circle">
              <img src={LOGO_IMAGE} alt="Animora circular mark" className="logo-image logo-image-small" />
            </div>
            <div className="mini-logo orb">
              <Character
                type="ghost"
                size="md"
                emotion={selectedEmotion}
                variant="interactive"
                interactive={false}
              />
              
            </div>
          </div>
        </motion.section>

        <motion.section
          className="panel palette-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.14 }}
        >
          <h2>Color Palette</h2>
          <div className="gradient-strip" />
          <div className="swatches">
            {['#8B5CF6', '#EC4899', '#3B82F6', '#22D3EE', '#A855F7'].map(color => (
              <div key={color} className="swatch">
                <div style={{ backgroundColor: color }} />
                <span>{color}</span>
              </div>
            ))}
          </div>
          <p className="mini-title">Emotion Glow Colors</p>
          <div className="emotion-dot-row">
            {EMOTIONS.slice(0, 6).map(item => (
              <button
                key={item.name}
                className="emotion-dot"
                onClick={() => setSelectedEmotion(item.name)}
                style={{
                  boxShadow:
                    selectedEmotion === item.name
                      ? `0 0 20px ${item.color}`
                      : 'none',
                }}
              >
                <span style={{ backgroundColor: item.color }} />
                {item.label}
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel typography-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <h2>Typography</h2>
          <div className="font-line">
            <p>Display</p>
            <h3>Space Grotesk</h3>
          </div>
          <div className="font-line">
            <p>Body</p>
            <h4>Plus Jakarta Sans</h4>
          </div>
          <div className="font-line">
            <p>Code</p>
            <code>JetBrains Mono</code>
          </div>
        </motion.section>

        <motion.section
          className="panel character-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.24 }}
        >
          <h2>Character Style Direction</h2>
          <div className="feature-chip-row">
            {ACTIONS.map(item => (
              <button
                key={item}
                className={item === selectedAction ? 'chip active' : 'chip'}
                onClick={() => setSelectedAction(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="character-lineup">
            {CHARACTERS.map(type => (
              <div key={type} className="lineup-item">
                <Character
                  type={type}
                  size="lg"
                  emotion={selectedEmotion}
                  action={selectedAction}
                  variant={type === selectedCharacter ? 'glowing' : 'default'}
                  interactive
                  onClick={() => setSelectedCharacter(type)}
                />
                <button
                  className={type === selectedCharacter ? 'chip active' : 'chip'}
                  onClick={() => setSelectedCharacter(type)}
                >
                  {type}
                </button>
              </div>
            ))}
          </div>
          <div className="feature-chip-row">
            {[
              'Expressive',
              'Adaptive',
              'Emotional',
              'Interactive',
              'Customizable',
            ].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel motion-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.3 }}
        >
          <h2>Motion Identity</h2>
          <div className="motion-row">
            {['idle', 'hover', 'emotion', 'interaction'].map((mode, index) => (
              <motion.div
                key={mode}
                className="motion-step"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2 + index * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Character
                  type="ghost"
                  size="md"
                  emotion={index === 2 ? selectedEmotion : 'excited'}
                  action={index === 3 ? selectedAction : 'idle'}
                  variant="glowing"
                  interactive={false}
                />
                <p>{mode}</p>
              </motion.div>
            ))}
          </div>
          <div className="feature-chip-row slim">
            {[
              'Spring Physics',
              'Micro Interactions',
              'Playful Energy',
              'Alive Presence',
            ].map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="panel personality-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.34 }}
        >
          <h2>Brand Personality</h2>
          <ul>
            <li>Creative and playful</li>
            <li>Modern and futuristic</li>
            <li>Smart and emotional</li>
            <li>Developer friendly</li>
            <li>Lightweight and fast</li>
          </ul>
        </motion.section>

        <motion.section
          className="panel tone-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.36 }}
        >
          <h2>Tone Of Voice</h2>
          <p>
            Friendly, enthusiastic, and empowering. We help developers create
            experiences that feel alive.
          </p>
          <p className="tone-note">
            Current mood: <span>{selectedEmotionSpec.label}</span>
          </p>
        </motion.section>

        <motion.section
          className="panel tagline-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.38 }}
        >
          <h2>Tagline Options</h2>
          <ul>
            <li>Bring interfaces to life.</li>
            <li>Characters that speak UI.</li>
            <li>Emotions for your interface.</li>
            <li>Make UI feel alive.</li>
            <li>Code life. Ship magic.</li>
          </ul>
        </motion.section>

        <motion.section
          className="panel apps-panel"
          variants={cardAnim}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, delay: 0.42 }}
        >
          <h2>Applications</h2>
          <div className="app-grid">
            <article className="mini-app">
              <p>npm package</p>
              <h3>animora</h3>
              <span>npm install animora</span>
            </article>
            <article className="mini-app">
              <p>App icon</p>
              <img src={LOGO_IMAGE} alt="Animora app icon" className="logo-image logo-image-small" />
            </article>
            <article className="mini-app code-card">
              <p>Code Preview</p>
              <pre>
                <code>{`import { Character } from 'animora'\n\n<Character\n  type="${selectedCharacter}"\n  emotion="${selectedEmotion}"\n  action="${selectedAction}"\n  size="lg"\n/>`}</code>
              </pre>
            </article>
          </div>
          <div className="cta-row">
            <Link to="/start-building" style={{ marginTop: '20px' }}>
            <AnimatedButton variant="primary" character="robot" emotion="happy">
              Start Building
            </AnimatedButton>
            </Link>
            <AnimatedButton variant="outline" character="fox" emotion="excited">
              Explore Docs
            </AnimatedButton>
          </div>
        </motion.section>
      </main>
      <footer className="animora-footer">
        <p>animora</p>
        <span>Copyright 2026 Animora. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default App;
