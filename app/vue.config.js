const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, './src/assets/css/index.less'),
      ],
    },
  },
  css: {
    loaderOptions: {
      // 配置样式转换
      postcss: {
        postcssOptions: {
          plugins: [
            [
              'postcss-px-to-viewport',
              {
                unitToConvert: 'px', // 需要转换的单位，默认为"px"
                viewportWidth: 375, // 设计稿的视窗宽度
                unitPrecision: 5, // 单位转换后保留的精度
                //propList: ['*', '!font*'] 不匹配 font 开头的属性
                propList: ['*'], // 能转化为 vw 的属性列表
                viewportUnit: 'vw', // 希望使用的视窗单位
                fontViewportUnit: 'vw', // 字体使用的视窗单位
                selectorBlackList: [], // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
                minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
                mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                replace: true, // 是否直接更换属性值，而不添加备用属性
                exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                include: /\/src\//, // 如果设置了include，那将只有匹配到的文件才会被转换
                landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
                landscapeUnit: 'vw', // 横屏时使用的单位
                landscapeWidth: 1125 // 横屏时使用的视窗宽度
              }
            ]
          ]
        }
      },
      // // 配置 vant 主题
      // less: {
      //   // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
      //   lessOptions: {
      //     modifyVars: {
      //       // 直接覆盖变量
      //       /* 'text-color': '#111',
      //       'border-color': '#eee', */
      //       // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      //       hack: `true; @import "${path.join(__dirname, '/src/styles/cover.less')}";`
      //     }
      //   }
      // }
    }
  },
  // 配置代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:81",
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
