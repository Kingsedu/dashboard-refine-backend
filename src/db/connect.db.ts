import { Logging } from "./../../node_modules/sequelize/types/model.d";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { ENV_CONST } from "../config/env.config";

export const sequelize = new Sequelize(
  ENV_CONST.database as string,
  ENV_CONST.username as string,
  ENV_CONST.password,
  {
    host: "localhost",
    dialect: "mysql",
    logging: (msg) => console.log(msg),
  },
);
