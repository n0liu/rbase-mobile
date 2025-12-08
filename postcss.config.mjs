/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines', 'adm-'],
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
};

export default config;
