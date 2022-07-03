// postcss.config.js
module.exports = {
  // 配置要使用的 postcss插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用L生产游览器css 样式规则前缀
    // VueCLI 内部已经配置了  autoprefixer插件
    // 所以配置了一遍，所以产生 冲突
    // 'autoprefixer': { // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'ios >= 8']
    // },
    // 配置使用  postcss-pxtorem 插件
    // 作用  把px 转为 rem
    'postcss-pxtorem': {
      // lib-flexible的rem 适配方案 ：把一行分为10份，每分是1/10
      // 所以rootValue 应该设置为你的设计稿宽度的十分之一
      // 我们设计稿书 750 ，所以应该设置为 750/10=75
      // 但是vant 建议设置为 37.5， 为什么？因为bant书基于375写的
      // 然而rootValue 是75所以必须/2大一倍
      // 所以必须设置为37.5， 唯一的缺点就是使用我们设计稿的尺寸都必须/2
      // 有没有更好的办法？
      // 如果是 Vant 的样式，按照 37.5 来转换
      // 如果是 我们自己 的样式，按照 75 来转换
      // 1通过查阅文档，我们发现rootValue 支持两种类型：
      // 数字： 固定的数值
      //  函数：可以动态处理返回
      //        postcss-pxtorem 处理每个css文件的时候都会来调用这个函数
      //        它会把处理的css文件相关的星系通过参数传递给该值

      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 75,
      // 配置要转换的css属性
      // * 表示所有
      propList: ['*']
    }
  }
}
