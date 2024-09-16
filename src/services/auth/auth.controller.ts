import { Request, Response } from "express";
import authServiceClient from ".";

const giveScore = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { score } = request.query;
    if (score) {
      authServiceClient.GiveScore(
        { id, score: Number(score) },
        (err: any, res: any) => {
          if (err) {
            return response.json("Error").status(400);
          }
          return response.json(res.message).status(200);
        }
      );
    } else {
      return response.json("Error").status(200);
    }
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllUser = async (request: Request, response: Response) => {
  try {
    const { data } = request.query;
    authServiceClient.GetAllUser(
      JSON.parse(data!.toString()),
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.users).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createUser = async (request: Request, response: Response) => {
  try {
    if (!request.body.user?.password) {
      request.body.user.password = "123";
    }
    authServiceClient.CreateUser(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.user).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    authServiceClient.UpdateUser(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.user).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    authServiceClient.DeleteUser({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const login = async (request: Request, response: Response) => {
  try {
    authServiceClient.Login(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      if (res?.error) {
        return response.json(res.error).status(400);
      }
      return response.json({ accessToken: res.token.accessToken }).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createRole = async (request: Request, response: Response) => {
  try {
    authServiceClient.CreateRole(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.role).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateRole = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    authServiceClient.UpdateRole(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.role).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteRole = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    authServiceClient.DeleteRole({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const verify = async (request: Request, response: Response) => {
  const token = request.headers.authorization;
  try {
    await new Promise((resolve, reject) => {
      authServiceClient.VerifyToken(
        {
          token,
        },
        (err: any, res: any) => {
          if (err) {
            console.log(err);
            reject("Error");
          }
          return response.status(200).json(res?.data);
        }
      );
    });
    // response.status(200).json({ id: "", email: "" });
  } catch (error) {
    console.log(error);
    response.status(500).json("error");
  }
};

const authController = {
  createUser,
  updateUser,
  deleteUser,
  login,
  createRole,
  updateRole,
  deleteRole,
  getAllUser,
  giveScore,
  verify,
};

export default authController;
