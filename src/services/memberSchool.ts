import { MemberSchool } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<MemberSchool>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/member-schools")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: {
  body: Partial<Omit<MemberSchool, "majors"> & { majors: Array<string> }>;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/member-schools", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: {
  params: { id: string };
  body: Partial<Omit<MemberSchool, "majors"> & { majors: Array<string> }>;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/member-schools/${req.params.id}`, req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const deleted = (req: { params: { id: string } }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .delete(`/core/member-schools/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const MemberSchoolService = {
  getAll,
  create,
  update,
  deleted,
};

export default MemberSchoolService;
