/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,        // 统一基准宽度（所有设备）
      unitPrecision: 5,          // 转换精度
      viewportUnit: 'vw',        // 转换单位
      selectorBlackList: ['.ignore', '.hairlines'], // 排除的类名
      minPixelValue: 1,          // 小于 1px 不转换
      mediaQuery: false,         // 不转换媒体查询中的 px
    },
  },
};

export default config;
