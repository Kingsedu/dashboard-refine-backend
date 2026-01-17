import express from "express";
import mysql from "mysql2/promise";
import { Department, sequelize, Subject } from "./syncdata/syncdata";
const app = express();
app.use(express.json());
const PORT = 8080;
const departments = [
  {
    code: "CS",
    name: "Computer Science",
    description: "Software engineering and computing",
  },
  {
    code: "ENG",
    name: "Engineering",
    description: "Engineering and applied sciences",
  },
  {
    code: "BUS",
    name: "Business Administration",
    description: "Management and business studies",
  },
];

app.get("/", (req, res) => {
  res.json({ status: "successful", message: "the serve is active" });
});
console.log("checking if set-up is correct");
const startDataBase = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is running a http://localhost:${PORT}`);
    });
    await sequelize.authenticate();
    console.log("connected to database successful");
    const result = await sequelize.sync({ alter: true });
    // console.log(result);
    const data = await Department.bulkCreate(departments, {
      validate: true,
      ignoreDuplicates: true,
    });
    const csDept = await Department.findOne({ where: { code: "CS" } });
    const engDept = await Department.findOne({ where: { code: "ENG" } });

    // console.log(data);
    const csDepstJson = csDept?.toJSON();
    const engDepstJson = engDept?.toJSON();

    const subjects = [
      {
        name: "Data Structures",
        code: "CS101",
        departmentId: csDepstJson!.id,
      },
      {
        name: "Operating Systems",
        code: "CS201",
        departmentId: csDepstJson!.id,
      },
      {
        name: "Thermodynamics",
        code: "ENG101",
        departmentId: engDepstJson!.id,
      },
    ];
    const datasubject = await Subject.bulkCreate(subjects, {
      validate: true,
      ignoreDuplicates: true,
    });
    console.log(datasubject.toString());
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startDataBase();
