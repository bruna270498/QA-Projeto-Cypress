const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://bugbank.netlify.app/',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      // implement node event listeners here
      on("task", {
        setData: newData => {
            data = newData !== null ? { ...data, ...newData } : {};
            return data;
        },
        getData: () => {
            return data;
        },
        cleanData: () => {
            return {};
        },
    });
    return config
    },
  },
});
