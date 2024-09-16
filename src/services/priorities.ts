import { request } from "./request";
import type { Priority } from "@/utils/types";

const getPriorities = (): Promise<Array<Priority>> =>
  new Promise((rs, rj) => {
    request()
      .get("/admission/priorities")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const PriorityService = {
  getPriorities,
};

export default PriorityService;
