import type { Gender } from "@/utils/types";
import { request } from "./request";

const getGenders = (): Promise<Array<Gender>> =>
  new Promise((rs, rj) => {
    request()
      .get("/admission/genders")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const GenderService = {
  getGenders,
};

export default GenderService;
