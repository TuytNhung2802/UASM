/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/utils/types";
import { request } from "./request";
import qs from "query-string";

const getUsers = (req: { body: any }): Promise<Array<User>> =>
  new Promise((rs, rj) => {
    request()
      .get(`/auth/users?data=${encodeURIComponent(JSON.stringify(req.body))}`)
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const giveScore = (req: { params: { id: string }; query: any }) =>
  new Promise((rs, rj) => {
    const querystring = qs.stringify(req.query);
    request()
      .put(`/auth/users/give-score/${req.params.id}?${querystring}`)
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const verify = () =>
  new Promise((rs, rj) => {
    request()
      .get("/auth/users/verify")
      .then(({ data }) => {
        if (data) {
          rs(data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const UserService = {
  getUsers,
  giveScore,
  verify,
};

export default UserService;
