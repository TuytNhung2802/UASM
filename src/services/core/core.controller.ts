import { Request, Response, request } from "express";
import coreServiceClient from ".";
import { MyEventEmitter } from "../../events";

const getAllModule = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllModule({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.modules).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createModule = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateModule(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.module).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateModule = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateModule(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.module).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteModule = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteModule({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllMemberSchool = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllMemberSchool({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.schools).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createMemberSchool = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateMemberSchool(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.school).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateMemberSchool = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateMemberSchool(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.school).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteMemberSchool = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteMemberSchool({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importSubjectBlockIntoMajor = async (
  request: Request,
  response: Response
) => {
  try {
    coreServiceClient.ImportSubjectBlockIntoMajor(
      request.body,
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.message).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importMajor = async (request: Request, response: Response) => {
  try {
    coreServiceClient.ImportMajor(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllMajor = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllMajors({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.majors).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createMajor = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateMajor(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.major).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateMajor = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateMajor(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.major).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteMajor = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteMajor({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllSubject = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllSubject({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.subjects).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createSubject = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateSubject(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.subject).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateSubject = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateSubject(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.subject).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteSubject = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteSubject({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importSubjectIntoBlock = async (request: Request, response: Response) => {
  try {
    coreServiceClient.ImportSubjectIntoBlock(
      request.body,
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.message).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importSubject = async (request: Request, response: Response) => {
  try {
    coreServiceClient.ImportSubject(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createSubjectBlock = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateSubjectBlock(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.block).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateSubjectBlock = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateSubjectBlock(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.block).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteSubjectBlock = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteSubjectBlock({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllSubjectBlock = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllSubjectBlock({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.blocks).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importSubjectBlock = async (request: Request, response: Response) => {
  try {
    console.log(request.body);
    coreServiceClient.ImportSubjectBlock(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllFile = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllFiles({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.files).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createFile = async (request: Request, response: Response) => {
  try {
    const { name, extension } = request.body;
    const file = request.file;
    MyEventEmitter.emit("upload_file", { data: file, routing: "write" });
    const path: string = await new Promise((resolve, _reject) => {
      MyEventEmitter.on("return_path", ({ path }) => {
        if (path) {
          resolve(path);
        }
      });
    });
    coreServiceClient.CreateFile(
      { name, extension, path },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.file).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateFile = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, extension } = request.body;
    const file = request.file;
    if (file) {
      MyEventEmitter.emit("upload_file", { data: file, routing: "write" });
    }
    const path: string = await new Promise((resolve, _reject) => {
      MyEventEmitter.on("return_path", ({ path }) => {
        if (path) {
          resolve(path);
        }
      });
    });
    coreServiceClient.UpdateFile(
      { id, body: { name, extension, path } },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.file).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteFile = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteFile({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const importSubMajor = async (request: Request, response: Response) => {
  try {
    coreServiceClient.ImportSubMajor(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllSubMajor = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllSubMajors({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.submajors).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createSubMajor = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateSubMajor(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.submajor).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateSubMajor = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateSubMajor(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.submajor).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteSubMajor = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteSubMajor({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllRule = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllRule({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.rules).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createRule = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateRule(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.rule).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateRule = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateRule(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.rule).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteRule = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteRule({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllCertificate = async (_request: Request, response: Response) => {
  try {
    coreServiceClient.GetAllCertificate({}, (err: any, res: any) => {
      if (err) {
        return response.json(res?.error).status(400);
      }
      return response.json(res.certificates).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const createCertificate = async (request: Request, response: Response) => {
  try {
    coreServiceClient.CreateCertificate(request.body, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.certificate).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateCertificate = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.UpdateCertificate(
      { id, body: request.body },
      (err: any, res: any) => {
        if (err) {
          return response.json("Error").status(400);
        }
        return response.json(res.certificate).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const deleteCertificate = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    coreServiceClient.DeleteCertificate({ id }, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.message).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const coreController = {
  getAllModule,
  createModule,
  updateModule,
  deleteModule,
  createMemberSchool,
  updateMemberSchool,
  deleteMemberSchool,
  createMajor,
  updateMajor,
  deleteMajor,
  getAllMajor,
  createSubject,
  updateSubject,
  deleteSubject,
  createSubjectBlock,
  updateSubjectBlock,
  deleteSubjectBlock,
  getAllMemberSchool,
  getAllSubject,
  getAllSubjectBlock,
  importSubjectBlock,
  importSubject,
  getAllFile,
  createFile,
  updateFile,
  deleteFile,
  importMajor,
  importSubMajor,
  createSubMajor,
  updateSubMajor,
  deleteSubMajor,
  getAllSubMajor,
  importSubjectBlockIntoMajor,
  importSubjectIntoBlock,
  getAllRule,
  createRule,
  updateRule,
  deleteRule,
  getAllCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};

export default coreController;
