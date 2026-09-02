module.exports = {
  email: 'mouhcine.mesmouki7@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/Crushoverride007',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/mouhcinemesmouki/',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/crushoverride007',
    },
    {
      name: 'dailydev',
      url: 'https://app.daily.dev/crushoverride007',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  // `opacity` is the starting value, not the target. At 0 a section is
  // invisible until ScrollReveal fires, so anything below the fold looks
  // missing while you wait - and if a reveal never fires, the page reads as
  // broken. Starting dim means content ahead of you is always there, greyed
  // out, and simply brightens as you reach it.
  //
  // viewFactor is how much of an element must be in view before it reveals.
  // A quarter meant tall sections on a phone brightened late; a tenth starts
  // them as they come over the edge.
  srConfig: (delay = 200, viewFactor = 0.1) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0.12,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
