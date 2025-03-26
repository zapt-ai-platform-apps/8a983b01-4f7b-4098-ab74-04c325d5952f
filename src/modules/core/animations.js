// Animation configurations for the application
export const animations = {
  // Fade in animation
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  // Fade in from bottom animation
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  
  // Fade in from top animation
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  
  // Scale in animation
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  
  // Loading spinner animation
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  
  // Slide in from right animation
  slideInRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  
  // Slide in from left animation
  slideInLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  
  // Timing functions
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  
  // Duration constants
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  
  // Apply an animation using CSS classes
  getAnimationClass: (animationType, duration = 'standard', timing = 'ease') => {
    const durationValue = typeof duration === 'string' 
      ? animations.duration[duration] 
      : duration;
    
    const timingFunction = animations.timing[timing] || timing;
    
    // Return the appropriate class based on the animation type
    switch (animationType) {
      case 'fadeIn':
        return 'animate-fadeIn';
      case 'fadeInUp':
        return 'animate-fadeInUp';
      case 'fadeInDown':
        return 'animate-fadeInDown';
      case 'scaleIn':
        return 'animate-scaleIn';
      case 'spin':
        return 'animate-spin';
      case 'slideInRight':
        return 'animate-slideInRight';
      case 'slideInLeft':
        return 'animate-slideInLeft';
      default:
        return '';
    }
  },
  
  // Create a CSS animation style object
  getAnimationStyle: (animationType, duration = 'standard', timing = 'ease', delay = 0) => {
    const animation = animations[animationType];
    if (!animation) return {};
    
    const durationValue = typeof duration === 'string' 
      ? animations.duration[duration] 
      : duration;
    
    const timingFunction = animations.timing[timing] || timing;
    
    return {
      animation: `${durationValue}ms ${timingFunction} ${delay}ms forwards`,
      ...animation.from,
    };
  }
};

// Add these to tailwind.config.js
export const tailwindAnimations = {
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    fadeInDown: {
      '0%': { opacity: '0', transform: 'translateY(-20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    scaleIn: {
      '0%': { opacity: '0', transform: 'scale(0.95)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
    slideInRight: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    slideInLeft: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
  },
  animation: {
    fadeIn: 'fadeIn 0.3s ease-out forwards',
    fadeInUp: 'fadeInUp 0.3s ease-out forwards',
    fadeInDown: 'fadeInDown 0.3s ease-out forwards',
    scaleIn: 'scaleIn 0.3s ease-out forwards',
    slideInRight: 'slideInRight 0.3s ease-out forwards',
    slideInLeft: 'slideInLeft 0.3s ease-out forwards',
  },
};