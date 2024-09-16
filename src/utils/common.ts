import authServiceClient from "../services/auth";

export const verify = async <T>(token: string): Promise<T> => {
  return await new Promise((resolve, reject) => {
    authServiceClient.VerifyToken(
      {
        token,
      },
      (err: any, res: any) => {
        if (err) {
          reject("Error");
        }
        resolve(res?.data);
      }
    );
  });
};
