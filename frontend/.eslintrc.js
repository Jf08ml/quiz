module.exports = {
  root: true, // Indica que este es el archivo de configuración principal
  env: {
    node: true, // Define el entorno Node.js
    browser: true, // Define el entorno del navegador
  },
  extends: [
    "plugin:vue/vue3-essential", // Reglas esenciales para Vue 3
    "eslint:recommended", // Conjunto de reglas recomendadas por ESLint
  ],
  parserOptions: {
    parser: "@babel/eslint-parser", // Utiliza el parser de Babel
    requireConfigFile: false, // Indica que no se requiere un archivo de configuración para Babel
  },
  rules: {
    // Aquí puedes definir o sobrescribir reglas específicas
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // otras reglas personalizadas
  },
};
