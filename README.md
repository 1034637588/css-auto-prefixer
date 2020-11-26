# css-auto-prefixer
一个保存css代码，自动添加前缀的插件
    npm run cssAutoPreFix 启动插件
    1.由于fs.watch 方法在文件改变时会短时间内出发多次 所以我选用 watchFile 和 watch结合使用
    2.watch 用来监控目录，监控文件的新增和删除 watchFile监控文件的改变
    3.使用对象 来存储文件的hash，文件名做为key hash为value，用来对比当前哈希，和上一次改变的哈希是否相同，主要用来避免保存但没有修改的情况，因为用到了autoprefixer
        所以如果不做判断，每次变化执行一次autoprefix，执行后触发变化将导致死循环
    4.配置文件可放到根目录下的autoprefixer.config.json 下来控制兼容的浏览器 详细的配置信息可见官网 https://github.com/browserslist/browserslist#custom-usage-data
    --示例配置
    {
    "browserslist":[
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions",
    "not ie <= 8",
    "Android >= 4.0"
    ],
    "cssDir":"C:/Users/sz.develop.intern3/Desktop/test/assets/styles"
    }
    5.默认监控路径为根目录下 assets/styles 可以同过配置文件改变
