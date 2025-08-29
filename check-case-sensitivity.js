import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      callback(filepath);
    }
  });
}

function checkImports(file) {
  const content = fs.readFileSync(file, "utf8");
  const importRegex = /from\s+['"](.+)['"]/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // only check local imports
    if (importPath.startsWith(".") || importPath.startsWith("@/")) {
      const absPath = path.resolve(
        path.dirname(file),
        importPath.replace(/^@\//, "./")
      );

      // try to resolve file
      const possibleFiles = [
        absPath,
        absPath + ".ts",
        absPath + ".tsx",
        absPath + ".js",
        absPath + ".jsx",
        path.join(absPath, "index.tsx"),
        path.join(absPath, "index.ts"),
        path.join(absPath, "index.js"),
        path.join(absPath, "index.jsx"),
      ];

      for (let pf of possibleFiles) {
        if (fs.existsSync(pf)) {
          const actualName = path.basename(pf);
          const usedName = path.basename(absPath);
          if (actualName !== usedName) {
            console.warn(
              `⚠️ Case mismatch in import:
  File: ${file}
  Import: ${importPath}
  Expected: ${actualName}
  Found:    ${usedName}`
            );
          }
          break;
        }
      }
    }
  }
}

// walk through your source files
walk(ROOT_DIR, checkImports);

console.log("✅ Case sensitivity check complete");
