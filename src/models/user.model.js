// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { ProfileModel } from "./profile.model.js";

export const UserModel = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM("developer", "administrator"),
      allowNull: false,
      defaultValue: "developer",
    },
  },
  
  {
    onDelete: "CASCADE",
  }
  // TODO: 1. Activar la eliminación lógica (paranoid) en las opciones del modelo.
);



// Relacion

UserModel.hasOne(ProfileModel,{
  foreignKey: 'user_id',
  as: 'Profile'
})


