import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tech-Digital",
    version: "1.0.0",
    description: "API documentation for My App",
  },
  server: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://tech-digital.vercel.app"
          : "http://localhost:4000",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis:
    process.env.NODE_ENV === "production"
      ? ["./src/routes/*.js"]
      : ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
