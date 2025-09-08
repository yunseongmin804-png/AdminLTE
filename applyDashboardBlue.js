const fs = require("fs");
const path = require("path");

// 재귀적으로 폴더 안 .astro 파일 찾기
function getAstroFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAstroFiles(filePath));
    } else if (file.endsWith(".astro")) {
      results.push(filePath);
    }
  });
  return results;
}

// 파일 안 h3/p 태그에 dashboard-blue 적용
function applyDashboardBlue(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Dashboard → 대시보드
  content = content.replace(/Dashboard/g, "대시보드");

  // h3 또는 p 태그에 dashboard-blue 클래스 적용
  content = content.replace(
    /<(h3|p)([^>]*)>(대시보드[^\<]*)<\/\1>/g,
    '<$1$2 class="$1$2 dashboard-blue">$3</$1>'
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ 처리 완료: ${filePath}`);
}

// 프로젝트 src/html 폴더 내 모든 .astro 파일 처리
const astroFiles = getAstroFiles(path.join(__dirname, "src/html"));
astroFiles.forEach(applyDashboardBlue);

console.log("🎉 모든 .astro 파일 처리 완료! 이제 브라우저에서 대시보드가 파란색으로 표시됩니다.");
