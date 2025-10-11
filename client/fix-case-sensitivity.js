const fs = require("fs");
const path = require("path");

const appFile = path.join(__dirname, "src", "App.jsx");
let content = fs.readFileSync(appFile, "utf8");

content = content.replace(
  /import Home from ["']\.\/pages\/Landing\/Home["'];/,
  'import Home from "./pages/Landing/Home.jsx";'
);

fs.writeFileSync(appFile, content);
