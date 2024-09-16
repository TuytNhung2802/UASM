import { request } from "./request";
import type { SubjectBlock } from "@/utils/types";

const getSubjectBlocks = (): Promise<Array<SubjectBlock>> =>
  new Promise((rs, rj) => {
    request()
      .get("/core/subject-blocks")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const SubjectBlockService = {
  getSubjectBlocks,
};

export default SubjectBlockService;
