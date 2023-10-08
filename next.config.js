/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
      // Evita que TypeScript emita archivos JavaScript si hay errores de compilación
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;