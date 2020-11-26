/* 
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
    5.默认监控路径为根目录下 assets/styles

*/
//实现效果为指定自动加前缀的目录，然后 
const { readConfig } = require('./utils/fileUtls.js');
const { watchDir, readDirAndWatch } = require('./watch/index.js');
let files = {};//用来存放目录下的文件 文件名为key hash为value
let browserslistConfig = null; //用来存储配置文件
let cssDir = null; //配置文件下的css存放目录

run();

async function run() {
    const data = await readConfig(); //读取配置文件 赋值给browserslistConfig
    browserslistConfig = data.browserslistConfig;
    cssDir = data.cssDir;
    //读取配置文件
    await readDirAndWatch(cssDir, files,browserslistConfig); //这里传递参数 只是为了后面的函数都可以获取
    await watchDir(cssDir, files,browserslistConfig);
}



