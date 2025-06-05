import swaggerJSDoc from 'swagger-jsdoc';


export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medisure API',
      version: '1.0.0',
      description: 'Documentación de la API de Medisure',
    },
  },
  apis: ['./src/presentation/routes/*.ts', './src/presentation/auth/*.ts'], // Ajusta las rutas a tus archivos de rutas/controllers
});