// applyDashboardBlue.cjs
const fs = require("fs");
const path = require("path");

// CSS 파일 경로
const cssFile = path.join(__dirname, "src", "App.css");

// CSS가 없으면 생성
if (!fs.existsSync(cssFile)) {
  fs.mkdirSync(path.dirname(cssFile), { recursive: true });
  fs.writeFileSync(cssFile, ".dashboard-blue { color: blue; font-weight: bold; }\n");
} else {
  const cssContent = fs.readFileSync(cssFile, "utf8");
  if (!cssContent.includes("dashboard-blue")) {
    fs.appendFileSync(cssFile, ".dashboard-blue { color: blue; font-weight: bold; }\n");
  }
}

// 폴더 탐색 및 처리
function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".astro")) {
      let content = fs.readFileSync(fullPath, "utf8");
      // "Dashboard" → "대시보드"
      content = content.replace(/Dashboard/g, "대시보드");
      // <h3> 또는 <p> 안의 대시보드에 클래스 적용
      content = content.replace(
        /<(h3|p)([^>]*)>(대시보드.*?)<\/\1>/g,
        (_match, tag, attrs, inner) => {
          // 기존 class가 있으면 합치고, 없으면 새로 생성
          if (/class\s*=/.test(attrs)) {
            return `<${tag}${attrs.replace(/class\s*=\s*"(.*?)"/, (_, c) => `class="${c} dashboard-blue"`)}>${inner}</${tag}>`;
          } else {
            return `<${tag}${attrs} class="dashboard-blue">${inner}</${tag}>`;
          }
        }
      );
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`✅ 처리 완료: ${fullPath}`);
    }
  }
}

// src/html 폴더 전체 처리
processDir(path.join(__dirname, "src", "html"));

console.log("🎉 모든 .astro 파일 처리 완료! 이제 브라우저에서 대시보드가 파란색으로 표시됩니다.");
