import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SuccessBanner, WarningBanner } from 'animora';

type PreviewBannerProps = {
  title?: string;
  message?: string;
  children?: React.ReactNode;
};

type BannerDefinition = {
  id: string;
  title: string;
  description: string;
  exportName: string;
  message: string;
  Component: React.ComponentType<PreviewBannerProps>;
};

const BANNERS: BannerDefinition[] = [
  {
    id: 'success',
    title: 'Success Banner',
    description: 'Positive confirmation banner for completed actions',
    exportName: 'SuccessBanner',
    message: 'Payment received. Your plan is now active.',
    Component: SuccessBanner,
  },
  {
    id: 'warning',
    title: 'Warning Banner',
    description: 'Attention banner for important warnings and checks',
    exportName: 'WarningBanner',
    message: 'Your trial ends in 2 days. Update billing details.',
    Component: WarningBanner,
  },
  
];

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface BannerCardProps {
  banner: BannerDefinition;
}

const BannerCard: React.FC<BannerCardProps> = ({ banner }) => {
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `import { ${banner.exportName} } from 'animora'\n\n<${banner.exportName}\n  title="${banner.title}"\n  message="${banner.message}"\n/>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <motion.div className="character-card" variants={cardAnim} initial="hidden" animate="show" whileHover={{ y: -8 }}>
      <div className="card-header">
        <h3 className="card-title">{banner.title}</h3>
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
          <banner.Component title={banner.title} message={banner.message} />
        ) : (
          <div className="code-block">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </motion.div>

      <div className="card-info">
        <p className="emotion-label">{banner.description}</p>
      </div>
    </motion.div>
  );
};

const BannersSection: React.FC = () => {
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
        <h1>Banners Showcase</h1>
        <p>Reusable banners for success and warning feedback states.</p>
      </motion.header>

      <motion.section className="characters-grid" variants={containerAnim} initial="hidden" animate="show">
        {BANNERS.map((banner) => (
          <BannerCard key={banner.id} banner={banner} />
        ))}
      </motion.section>
    </div>
  );
};

export default BannersSection;
