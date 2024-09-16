import { request } from "./request";
import type { Majors } from "@/utils/types";

const getMajors = (): Promise<Array<Majors>> =>
  new Promise((rs, rj) => {
    request()
      .get("/core/majors")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const MajorService = {
  getMajors,
};

export default MajorService;
