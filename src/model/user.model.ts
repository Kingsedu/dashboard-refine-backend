import { Sequelize, DataTypes } from "sequelize";
import mysql from "mysql2/promise";
import { sequelize } from "../db/connect.db";

export const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 50],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true },
);

export const Subject = sequelize.define(
  "Subject",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 50],
      },
    },
  },
  { freezeTableName: true },
);

// Department.hasMany(Teacher, {
//   foreignKey: "departmentId",
// });
// Teacher.belongsTo(Department, {
//   foreignKey: "departmentId",
// });
// Department → Subjects
Department.hasMany(Subject, {
  foreignKey: "departmentId",
});
Subject.belongsTo(Department, {
  foreignKey: "departmentId",
});
