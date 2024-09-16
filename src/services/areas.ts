import { request } from "./request";
import type { Area } from "@/utils/types";

const getAreas = (): Promise<Array<Area>> =>
  new Promise((rs, rj) => {
    request()
      .get("/admission/areas")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const AreaService = {
  getAreas,
};

export default AreaService;
