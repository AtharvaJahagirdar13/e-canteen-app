const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.watchFolders = [
  path.resolve(__dirname, "server")
];

module.exports = defaultConfig;
