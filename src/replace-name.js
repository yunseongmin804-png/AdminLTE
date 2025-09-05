// replace-name.js
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'src'); // 수정할 폴더
const oldName = 'Alexander Pierce';
const newName = '윤성민';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.split(oldName).join(newName);
    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.astro') || fullPath.endsWith('.mdx') || fullPath.endsWith('.html')) {
            replaceInFile(fullPath);
        }
    });
}

walkDir(folder);
console.log('이름 변경 완료!');
