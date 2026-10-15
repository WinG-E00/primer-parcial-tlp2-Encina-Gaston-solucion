// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {

    //Desestructuro todo de el req
    const { username, email, password, role } = req.body;


    //Hasheo la password
    const passwordHasheada = hashPassword(password);

    //Creacion del el usuario
    const UsuarioCreado = await UserModel.create({
      username,
      email,
      password: passwordHasheada,
      role
    })

    
    return res.status(201).json({ message: "EL usuario a sido creado exitosamente", usuario: [username, email, role]  })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {


    // Desestructuracion de el req body
    const { email, password } = req.body;


    // Usuario encontrado 
    const findedUser = UserModel.findOne({ where: { email } })

    if (!findedUser) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }


  //validar si la contraseña es correcta
  const validPassword = await comparePassword(password, findedUser.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  // Generar el json web token
  const token = generateToken({
    id: findedUser.id,
    username: findedUser.username,
    role: findedUser.role,
  });


   res.cookie("token", token, {
    httpOnly: true,

    //Esto es simplemente para que tenga un limite de tiempo el token 
    maxAge: 1000 * 60 * 60, // 1 hora
  });




  return res.status(200).json({ message: "Usuario logeado exitosamente" })




    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {

      //se limpian las cookies
      res.clearCookie('token', { httpOnly: true, path: '/' });

      //Retorna la respuesta
      return res.status(200).json({ message: 'Sesión cerrada correctamente' });


    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
