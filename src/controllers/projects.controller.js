// * ARCHIVO A COMPLETAR
import { signToken } from "../helpers/jwt.helper.js";
import {
  ProjectModel,
  ProjectTechnologyModel,
  TechnologyModel,
  UserModel,
} from "../models/index.js";


import cookieParser from "cookie-parser";


export const createProject = async (_req, res) => {
  try {

    const { code, name, description, status, start_date, budget, leader_id, technologies } = _req.body;



    
    
    
    const proyectoCreado = await ProjectModel.create({
      code,
      name,
      description,
      status,
      start_date,
      budget,
      leader_id
    });

    // Con el metodo de la relacion de muchos a muchos
    if (technologies && technologies.length > 0) {
      await proyectoCreado.setTechnologies(technologies);
    }


    await proyectoCreado.reload({
      include: [
        {
          model: UserModel,
          as: 'leader',
          attributes: ['id', 'username', 'email']
        },
        {
          model: TechnologyModel,
          as: 'technologies',
          attributes: ['id', 'name'], 
          through: { attributes: [] }
        }
      ]
    });


    return res.status(201).json(proyectoCreado)


    // TODO: 1. Crear el project con los datos del body que ya pasaron la validación.
    // ? Revisar de dónde debe salir el leader del proyecto.
    // TODO: 2. Asociar al project las technologies recibidas.
    // TODO: 3. Responder con código 201 y el project con sus technologies y su leader.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllProjects = async (_req, res) => {
  try {

    const todosLosProyectos = ProjectModel.findAll({
      include: [{
        model: UserModel,
        as: "leader",
        attributes: { exclude: ["password"] }
      },
      {
        model: TechnologyModel,
        as: "technologies",
        attributes: ["id", "name", "description"],
        through: { attributes: [] }

      }
    ]
    })

    return res.status(200).json(todosLosProyectos)


    // TODO: 1. Listar todos los projects incluyendo su leader (sin la password) y sus technologies, y responder con código 200 y los projects..
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyProjects = async (req, res) => {
  try {

   const { id: leader_id } = signToken(req.cookies.token);

  


  


    // TODO: 1. Listar los projects cuyo leader sea el usuario logueado, incluyendo sus technologies, y responder con código 200 y los projects.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProject = async (req, res) => {
  try {
    // TODO: 1. Actualizar el project con los datos recibidos.
    // TODO: 2. Reemplazar sus technologies si vienen en el body.
    // TODO: 3. Responder con código 200 y el project actualizado, incluyendo su leader y sus technologies.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    // TODO: 1. Eliminar el project y responder con código 204 sin devolver ningún mensaje.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
