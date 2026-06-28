import env from "dotenv";
env.config({ quiet: true });

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
