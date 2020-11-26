let path = require('path');
let fs = require('fs');

//封装fs.stat
function stat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if (err) {
                reject(err);
            } else {
                resolve(stat);
            }
        })
    })
}

//封装文件是否存在
function access(file) {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.R_OK, function (err) {
            if (err) {//判断是否可读。可读err为null 否则就是错误原因
                reject(err);
            }
            resolve(1);
        })
    })
}

//封装读取目录
function readDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, fileNames) => {
            if (err) {
                reject(err);
            } else {
                resolve(fileNames);
            }
        })
    })
}

//封装读文件
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { flag: 'r', encoding: 'utf8' }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

//封装写文件
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, { flag: 'w', encoding: 'utf8' }, (err) => {
            if (err) {
                reject(err)
            }
            resolve(1);
        })
    })
}
//读取配置文件
async function readConfig(file = path.join(__dirname,'../', 'autoprefixer.config.json')) {
    const config = await readFile(file);
    const browserslistConfig = JSON.parse(config).browserslist;
    const cssDir = JSON.parse(config).cssDir;
    return{
        browserslistConfig,
        cssDir
    }

}
module.exports = {
    stat,
    readConfig,
    writeFile,
    readFile,
    readDir,
    access
}
