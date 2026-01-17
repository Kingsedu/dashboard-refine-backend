import dotenv from "dotenv";
dotenv.config();

export const ENV_CONST = {
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};
