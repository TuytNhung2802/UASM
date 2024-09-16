import { request } from "./request";
import type { Basic } from "@/utils/types";

const getObjectAdmissions = (): Promise<Array<Basic>> =>
  new Promise((rs, rj) => {
    request()
      .get("/admission/object-admissions")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const ObjectAdmissionService = {
  getObjectAdmissions,
};

export default ObjectAdmissionService;
