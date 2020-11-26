
const postcss = require('postcss');
const path = require('path');
const autoprefixer = require('autoprefixer');
const { access, readFile, writeFile} = require('../utils/fileUtls.js');
//自动加前缀
async function prefixer(filePath,browserslistConfig) {
    try {
        let isExist = await access(filePath);
        if (isExist) { //如果文件存在
            let css = await readFile(filePath);
            postcss([autoprefixer({
                overrideBrowserslist: browserslistConfig ? browserslistConfig : [
                    "last 2 versions",
                    "> 1%",
                    "iOS 7",
                    "last 3 iOS versions",
                    "not ie <= 8",
                    "Android >= 4.0"
                ]
            })]).process(css, { from: filePath, to: filePath }).then(result => {
                writeFile(filePath, result.css);
            });
        }
    } catch (error) {
        console.log(error)
    }
}
exports.prefixer = prefixer;