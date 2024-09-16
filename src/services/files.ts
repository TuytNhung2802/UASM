import { FileType } from "@/utils/types";
import { request } from "./request";

const files = (): Promise<Array<FileType>> =>
  new Promise((rs, rj) => {
    request()
      .get("/core/files")
      .then(({ data }) => {
        if (data) {
          rs(data?.data);
        }
      })
      .catch((error) => {
        rj(error);
      });
  });

const FileService = {
  files,
};

export default FileService;
