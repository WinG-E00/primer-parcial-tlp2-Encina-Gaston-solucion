// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserModel } from "./user.model.js";

export const ProjectModel = sequelize.define("Project", {


  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, 
    autoIncrement: true,
  },
  code:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM("planning, in_progress", "paused", "finished"),
    defaultValue: "planning",
    allowNull: false,
  },
  stard_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  leader_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
  onDelete: 'CASCADE'
}

);



  // TODO: 1. code: string, único y obligatorio.
  // TODO: 2. name: string, obligatorio.
  // TODO: 3. description: texto, obligatorio.
  // TODO: 4. status: ENUM con los valores planning, in_progress, paused y finished; obligatorio y con planning como valor por defecto.
  // TODO: 5. start_date: fecha (solo día), obligatoria.
  // TODO: 6. budget: decimal, obligatorio.
  // TODO: 7. leader_id: entero, obligatorio, clave foránea hacia User.
