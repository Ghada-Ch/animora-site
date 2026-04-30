/**
 * Animated Button Component
 * Interactive button with character reactions
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {Character } from 'animora';
import { COLORS, MOTION } from 'animora';
import type { CharacterType } from 'animora';
import type { Emotion } from 'animora';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  character?: CharacterType;
  characterSize?: 'xs' | 'sm' | 'md';
  emotion?: Emotion;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  md: {
    padding: '12px 24px',
    fontSize: '16px',
  },
  lg: {
    padding: '16px 32px',
    fontSize: '18px',
  },
};

const variantStyles = {
  primary: {
    background: COLORS.gradient.primary,
    color: 'white',
  },
  secondary: {
    background: `linear-gradient(135deg, ${COLORS.brand.purple} 0%, ${COLORS.brand.cyan} 100%)`,
    color: 'white',
  },
  outline: {
    background: 'transparent',
    border: `2px solid ${COLORS.brand.cyan}`,
    color: COLORS.brand.cyan,
  },
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  character,
  characterSize = 'sm',
  emotion = 'happy',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200);
      onClick?.();
    }
  };

  const buttonContent = character ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Character
        type={character}
        size={characterSize}
        emotion={isHovered ? 'excited' : emotion}
        interactive={false}
      />
      <span>{children}</span>
    </div>
  ) : (
    children
  );

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || loading}
      className={`animora-button ${variant} ${className}`}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant as keyof typeof variantStyles],
        border: variant === 'outline' ? undefined : 'none',
        borderRadius: '12px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        overflow: 'hidden',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s ease',
      }}
      animate={{
        scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        boxShadow: isHovered
          ? `0 0 20px ${COLORS.emotions.excited}`
          : 'none',
      }}
      transition={MOTION.transitions.hover}
    >
      {loading && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: COLORS.gradient.primary,
            opacity: 0.2,
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {buttonContent}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
