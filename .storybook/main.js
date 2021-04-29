const path = require("path")

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [],
  webpackFinal: async config => {
    config.resolve.alias["@app"] = path.resolve("src")
    return config
  },
}
