// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { ProjectModel } from "./project.model.js";

export const ProjectTechnologyModel = sequelize.define(
  "ProjectTechnology",
  {

    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },

    technology_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  },
  {

    timestamps: false,
    // TODO: 4. Desactivar las columnas createdAt y updatedAt.
  },
);


//
//  ProjectModel.belongsToMany()



    // TODO: 1. id: entero, clave primaria y autoincremental.
    // TODO: 2. project_id: entero, obligatorio, clave foránea hacia Project.
    // TODO: 3. technology_id: entero, obligatorio, clave foránea hacia Technology.

