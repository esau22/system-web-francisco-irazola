/** @type {import('next').NextConfig} */
const nextConfig = {
  // Define aquí tus variables de entorno
  env: {
    // Variable de entorno para la URL de conexión a la base de datos
    DATABASE_URL: process.env.DATABASE_URL,
    // Otras variables de entorno que necesites configurar
  },

  // Configura las reescrituras de URL para API o rutas personalizadas
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/vercel/path0/api/:path*", // Reescribe a la ruta de tu API en Vercel
      },
    ];
  },

  // Personaliza la configuración de webpack si es necesario
  webpack(config, { dev, isServer }) {
    // Aquí puedes añadir configuraciones específicas de webpack
    // Por ejemplo, configuración de alias para importaciones
    config.resolve.alias["@/components"] = path.join(__dirname, "components");
    config.resolve.alias["@/libs"] = path.join(__dirname, "libs");

    // Devuelve la configuración de webpack modificada
    return config;
  },
};

module.exports = nextConfig;
