/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-px-to-viewport-8-plugin': {
      viewportWidth: 375,        // 手机端基准宽度
      unitPrecision: 5,          // 转换精度
      viewportUnit: 'vw',        // 转换单位
      selectorBlackList: ['.ignore', '.hairlines'], // 移除了 'adm-'，现在会转换 antd-mobile
      minPixelValue: 1,          // 小于 1px 不转换
      mediaQuery: false,         // 不转换媒体查询中的 px

      // 平板适配配置
      landscape: true,           // 启用横屏/平板适配
      landscapeUnit: 'vw',       // 平板/横屏使用 vw
      landscapeWidth: 768,       // 平板基准宽度
    },
  },
};

export default config;
