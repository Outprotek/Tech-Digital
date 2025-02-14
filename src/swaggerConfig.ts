import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech-Digital",
      version: "1.0.0",
      description: "API documentation for My App",
    },
    servers: [
      {
        url: "http://localhost:4000", // Sesuaikan dengan server kamu
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Sesuaikan path jika pakai JavaScript: ["./src/routes/*.js"]
};

export default swaggerOptions;
