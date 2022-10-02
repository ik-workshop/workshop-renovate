let scope = "";

function log(msg1, ...msg) {
  console.log(`[${scope}] ${msg1}`, ...msg);
}

function warn(msg1, ...msg) {
  console.warn(`[${scope}] ${msg1}`, ...msg);
}

function setScope(name) {
  scope = name;
}

module.exports = {
  log,
  warn,
  setScope,
};
