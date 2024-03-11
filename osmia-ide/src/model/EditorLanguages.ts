const languages = [ // TODO refactor & update
  "text",
  // "TypeScript",
  "JavaScript",
  // "CSS",
  // "LESS",
  // "SCSS",
  "JSON",
  "HTML",
  // "XML",
  // "PHP",
  // "C#",
  // "C++",
  // "Razor",
  // "Markdown",
  // "Diff",
  // "Java",
  // "VB",
  // "CoffeeScript",
  // "Handlebars",
  // "Batch",
  // "Pug",
  // "F#",
  // "Lua",
  // "Powershell",
  // "Python",
  // "Ruby",
  // "SASS",
  // "R",
  // "Objective-C"
].map(l => l.toLowerCase());
languages.sort((a, b) => a.localeCompare(b));

const EDITOR_LANGUAGES = languages;

export default EDITOR_LANGUAGES;
