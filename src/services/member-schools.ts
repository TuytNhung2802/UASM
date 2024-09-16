import { request } from "./request";
import type { MemberSchool } from "@/utils/types";

const getMemberSchools = (): Promise<Array<MemberSchool>> =>
  new Promise((rs, rj) => {
    request()
      .get("/core/member-schools")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const MemberSchoolService = {
  getMemberSchools,
};

export default MemberSchoolService;
