const adm_zip = require('adm-zip');
// console.log(process.argv);
let ver = process.argv.length>2 && process.argv.slice(-1)[0] || '01'
let t = new Date()
let month = t.getMonth()+1
let day = t.getDate()
let date = ''+t.getFullYear()+(month>9?month:'0'+month)+(day>9?day:'0'+day)
console.log(date)
//creating archives
const zip = new adm_zip();
zip.addLocalFolder('./dist');
zip.writeZip(`C:/Users/zhouxianfu/Desktop/zip/dist-${date}.zip`);
console.log('dist 压缩完成')
//extracting archives  
// var unzip = new adm_zip('C:/Users/zhouxianfu/Desktop/zip/dist.zip');
// unzip.extractAllTo("C:/Users/zhouxianfu/Desktop/git/zmio", /*overwrite*/true);
