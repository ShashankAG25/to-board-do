import { PrismaClient } from '@prisma/client';

class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, // Load database URL from environment variables
        },
      },
      log: [
        { emit: "event", level: "query" },
        { emit: "stdout", level: "info" },
        { emit: "stdout", level: "warn" },
        { emit: "stdout", level: "error" },
      ],
      errorFormat: "colorless",
    });
  }

  /**
   * Initialize the Prisma connection.
   */
  async initialize() {
    try {
      await this.$connect();
      console.log("\nPrisma connected.");

      // Log queries
      this.$on("query", (e) => {
        console.log(`Query: ${e.query}`);
        console.log(`Params: ${e.params}`);
        console.log(`Duration: ${e.duration}ms`);
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      throw error;
    }
  }

  /**
   * Shutdown the Prisma connection.
   */
  async shutdown() {
    try {
      await this.$disconnect();
      console.log("\n\nPrisma disconnected.");
    } catch (error) {
      console.error("Error disconnecting from the database:", error);
    }
  }
}

const prisma = new PrismaService();
export default prisma;
