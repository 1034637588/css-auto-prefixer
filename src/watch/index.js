let path = require('path');
let fs = require('fs');
const  prefixer = require('../autoFixer/index.js');
const { getCurrentHash, storageFiles } = require('../utils/hashUtils.js');
const { stat, access, readDir } = require('../utils/fileUtls.js');
//读取目录并且监控

async function readDirAndWatch(dir = path.join(__dirname, '../', 'assets', 'styles'), files,browserslistConfig) {
    try {
        let filestat = await stat(dir);
        let isExist = await access(dir);
        if (filestat.isDirectory() && isExist) { //如果是目录的话进行下一步操作
            await storageFiles(dir, files); //遍历当前目录下的css文件并且存储
            let filenames = await readDir(dir);
            filenames.forEach(filename => {
                let fixer = filename.split('.')[1];
                if (fixer === 'css') { //之对css文件进行监控
                    let filePath = path.join(dir, filename); //拼接文件路径
                    watch(filePath, filename, files,browserslistConfig);
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}
//监控目录改变
async function watchDir(dir = path.join(__dirname, '../', 'assets', 'styles'), files,browserslistConfig) {
    let isExist = await access(dir);
    if (!isExist) return;
    fs.watch(dir, (eventType, filename) => {
        let filePath = path.join(dir, filename);
        if (eventType == 'rename') { //之对css文件进行监控 改名字可能会触发原名的rename 新名的rename，添加会触发，删除也会触发
            if (files[filename]) { //如果原来有 说明是删除了 或者是改名后触发了原来的文件名
                fs.unwatchFile(filePath);
                files[filename] = null;
                console.log(filename, '删除或者改名');
            } else { //否则之前没有说明是 新增的文件 或者是改新名字了
                console.log(filename, filePath, '新增');
                watch(filePath, filename, files,browserslistConfig);
                files[filename] = getCurrentHash(filePath);
            }
        }
    })
}
//监控文件
async function watch(file, filename, files,browserslistConfig) {
    fs.watchFile(file, (preStat, newStat) => {
        let currentHash = getCurrentHash(file);
        if (files[filename] && files[filename] !== currentHash) {
            files[filename] = currentHash;
            prefixer.prefixer(file,browserslistConfig); //真的改变了就加前缀
        }
    });
}
module.exports = {
    watch,
    watchDir,
    readDirAndWatch
}
