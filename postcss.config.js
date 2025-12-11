// postcss.config.js
/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ tailwindcss 대신 이걸 사용
  },
}
