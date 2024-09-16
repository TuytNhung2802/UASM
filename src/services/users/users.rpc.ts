import { AuthDB } from "../../data-source";
import { sign } from "../../utils/jwt";
import { Role } from "../roles/roles.entity";
import { Token } from "../tokens/tokens.entity";
import { User } from "./users.entity";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

const userRepo = AuthDB.getRepository(User);
const tokenRepo = AuthDB.getRepository(Token);
const roleRepo = AuthDB.getRepository(Role);

const GetAllUser = async (call: any, callback: any) => {
  try {
    const options = call.request;
    const users = await userRepo.find({
      where: {
        ...options,
      },
      relations: ["role"],
    });
    callback(null, { users: { data: users || [] } });
  } catch (error) {
    callback(null, { error });
  }
};

const Login = async (call: any, callback: any) => {
  try {
    const { email, password } = call.request;
    if (!email || !password) {
      return callback(null, { error: "Missing value" });
    }
    const user = await userRepo.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });
    if (!user) {
      return callback(null, { error: "Not found" });
    }
    const _password = user.password;
    const match = await bcrypt.compare(password, _password);
    if (!match) {
      return callback(null, { error: "Email or password is incorrect" });
    }
    const token = sign({
      id: user.id,
      email,
      role: user.role,
    });
    const userToken: any = await tokenRepo.findOne({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    if (!token || !userToken) {
      return callback(null, { error: "Missing token" });
    }
    Object.keys(token).forEach((item) => {
      userToken[item] = token[item as keyof typeof token];
    });
    await tokenRepo.save(userToken);
    callback(null, { token });
  } catch (error) {
    callback(null, { error });
  }
};

const IsExistUser = async (call: any, callback: any) => {
  try {
    const { email } = call.request;
    let isExisting = false;
    const user = await userRepo.findOne({
      where: {
        email,
      },
    });
    if (user) isExisting = true;
    callback(null, { exist: isExisting });
  } catch (error) {
    callback(null, { error });
  }
};

const CreateUser = async (call: any, callback: any) => {
  try {
    const newUser = new User();
    const token: any = new Token();
    const { user, role } = call.request;
    const { email, password, fullName, socket } = user;
    const { name } = role;
    const existing = await userRepo.findOne({
      where: {
        email,
      },
    });
    if (existing) {
      return callback(null, { error: "Existing user" });
    }
    const targetRole = await roleRepo.findOne({
      where: {
        name: name || "user",
      },
    });
    const salt = await bcrypt.genSalt(10);
    const _password = await bcrypt.hash(password, salt);
    newUser.id = v4();
    newUser.email = email;
    newUser.password = _password;
    newUser.fullName = fullName;
    if (targetRole) {
      newUser.role = targetRole;
    }
    const _token = sign({
      id: newUser.id,
      email,
      socket,
      role: user.role,
    });
    Object.keys(_token).forEach((item) => {
      token[item] = _token[item as keyof typeof _token];
    });
    newUser.token = token;
    await tokenRepo.save(token);
    await userRepo.save(newUser);
    callback(null, {
      user: newUser,
    });
  } catch (error) {
    callback(null, { error });
  }
};

const UpdateUser = async (call: any, callback: any) => {
  try {
    const { id, body } = call.request;
    const updatedUser: any = await userRepo.findOne({
      where: {
        id,
      },
      relations: {
        token: true,
      },
    });
    if (updatedUser) {
      console.log(updatedUser);
      Object.keys(body).forEach((item) => {
        updatedUser[item] = body[item];
      });
      const _token = sign({
        id: updatedUser.id,
        email: updatedUser.email,
        socket: updatedUser.socket,
      });
      Object.keys(_token).forEach((item) => {
        updatedUser.token[item] = _token[item as keyof typeof _token];
      });
      await userRepo.save(updatedUser);
      callback(null, { user: updatedUser });
    } else {
    }
  } catch (error) {
    callback(null, { error });
  }
};

const DeleteUser = async (call: any, callback: any) => {
  try {
    const { id } = call.request;
    const user = await userRepo.findOneBy({ id });
    if (user) {
      await userRepo.remove(user);
      callback(null, { message: "Success" });
    } else {
      callback(null, { message: "Not found" });
    }
  } catch (error) {
    callback(null, { error });
  }
};

const GetUserById = async (call: any, callback: any) => {
  try {
    const { id } = call.request;
    const user = await userRepo.findOne({
      where: {
        id,
      },
    });
    callback(null, { user });
  } catch (error) {
    callback(null, { error });
  }
};

const GiveScore = async (call: any, callback: any) => {
  try {
    const { score, id } = call.request;
    const user = await userRepo.findOne({
      where: { id },
    });
    if (user) {
      const currentTime = user.ratingTime;
      user.ratingTime = currentTime + 1;
      user.score = (user.score + score) / user.ratingTime;
      await userRepo.save(user);
    }
    callback(null, { message: "give score" });
  } catch (error) {
    callback(null, { error });
  }
};

const userRPC = {
  CreateUser,
  UpdateUser,
  DeleteUser,
  IsExistUser,
  Login,
  GetAllUser,
  GetUserById,
  GiveScore,
};

export default userRPC;
