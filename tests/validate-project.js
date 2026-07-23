const fs = require("fs");
const path = require("path");

const projectFolder = path.join(__dirname, "..");
const pages = [
  "index.html",
  "membership.html",
  "trainers.html",
  "workouts.html",
  "meal-plans.html",
  "bmi.html",
  "attendance.html",
  "contact.html",
  "login.html",
  "signup.html"
];

let errors = [];

function addError(message) {
  errors.push(message);
}

function checkLocalLinks(fileName, html) {
  const linkPattern = /(href|src)="([^"]+)"/g;
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const target = match[2];
    const isExternal =
      target.startsWith("http") ||
      target.startsWith("#") ||
      target.startsWith("mailto:");

    if (!isExternal) {
      const cleanTarget = target.split("?")[0].split("#")[0];
      const targetPath = path.join(projectFolder, cleanTarget);

      if (!fs.existsSync(targetPath)) {
        addError(`${fileName}: missing local target ${target}`);
      }
    }
  }
}

for (const page of pages) {
  const pagePath = path.join(projectFolder, page);

  if (!fs.existsSync(pagePath)) {
    addError(`Missing page: ${page}`);
    continue;
  }

  const html = fs.readFileSync(pagePath, "utf8");

  if (!html.includes('name="viewport"')) {
    addError(`${page}: missing viewport metadata`);
  }

  if (!html.includes("assets/favicon.svg")) {
    addError(`${page}: missing favicon`);
  }

  if (!html.includes('class="navbar"')) {
    addError(`${page}: missing navbar`);
  }

  if (!html.includes('href="contact.html"')) {
    addError(`${page}: Contact is missing from navigation`);
  }

  if (html.includes("images.pexels.com")) {
    addError(`${page}: external Pexels image reference found`);
  }

  checkLocalLinks(page, html);
}

const css = fs.readFileSync(path.join(projectFolder, "style.css"), "utf8");
let braceBalance = 0;

for (const character of css) {
  if (character === "{") braceBalance++;
  if (character === "}") braceBalance--;
}

if (braceBalance !== 0) {
  addError("style.css: unbalanced braces");
}

const cssUrlPattern = /url\(["']?([^"')]+)["']?\)/g;
let cssUrl;

while ((cssUrl = cssUrlPattern.exec(css)) !== null) {
  const target = cssUrl[1];

  if (!target.startsWith("http") && !target.startsWith("data:")) {
    const targetPath = path.join(projectFolder, target);
    if (!fs.existsSync(targetPath)) {
      addError(`style.css: missing local target ${target}`);
    }
  }
}

const script = fs.readFileSync(path.join(projectFolder, "script.js"), "utf8");

if (script.includes("alert(")) {
  addError("script.js: browser alert() is still present");
}

if (script.includes("images.pexels.com")) {
  addError("script.js: external Pexels image reference found");
}

if (errors.length > 0) {
  console.error("Validation failed:\n");
  for (const error of errors) {
    console.error("- " + error);
  }
  process.exit(1);
}

console.log(`Validation passed for ${pages.length} pages.`);
