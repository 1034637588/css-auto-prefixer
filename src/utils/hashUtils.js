let path = require('path');
let fs = require('fs');
let md5 = require('md5');
const { stat, access, readDir } = require('./fileUtls.js');
//封装获取当前哈希值的函数
function getCurrentHash(filePath) {
    let realFile = fs.readFileSync(filePath);
    return md5(realFile);
}
//存储文件的hash
async function storageFiles(dir,files) {
    let filestat = await stat(dir);
    let isExist = await access(dir);
    if (filestat.isDirectory() && isExist) { //如果是目录的话进行下一步操作
        let filenames = await readDir(dir); //读取目录下的文件
        filenames.forEach((filename) => {
            let fixer = filename.split('.')[1];
            if (fixer === 'css') { //之对css文件进行监控
                let filePath = path.join(dir, filename); //拼接文件路径
                files[filename] = getCurrentHash(filePath);
            }
        });
        console.log(files);
    }
}
module.exports = {
    getCurrentHash,
    storageFiles
}


