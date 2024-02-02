import dotenv from "dotenv";
dotenv.config();

export const config = {
  name: process.env.NAME,
  host: process.env.HOST,
  port: process.env.PORT,
  secret: process.env.JWT_SECRETS,
};
