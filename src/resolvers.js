import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        greet: () => "Hello world!"
    }
}

export default resolvers