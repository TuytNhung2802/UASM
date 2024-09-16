import { Request, Response } from "express";
import { MyEventEmitter } from "../../events";
import admissionServiceClient from ".";

const applyApplicationAdmissionRegistration = (
  request: Request,
  response: Response
) => {
  try {
    const body = request.body;
    MyEventEmitter.emit("apply_admission", {
      form: "admission_registration",
      data: body,
    });
    return response.json("Wait to verify, code send to your email").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getApplyApplicationAdmissionRegistration = (
  request: Request,
  response: Response
) => {
  try {
    admissionServiceClient.GetAllApplicationRegistration(
      {},
      (err: any, res: any) => {
        if (err) {
          return response.json(res?.error).status(400);
        }
        return response.json(res.applications).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult =
  (request: Request, response: Response) => {
    try {
      admissionServiceClient.GetAllApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult(
        {},
        (err: any, res: any) => {
          if (err) {
            return response.json(res?.error).status(400);
          }
          console.log(res);
          return response.json(res.applications).status(200);
        }
      );
    } catch (error) {
      return response.json("Error").status(500);
    }
  };

const applyApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult =
  (request: Request, response: Response) => {
    try {
      const body = request.body;
      MyEventEmitter.emit("apply_admission", {
        form: "admission_consideration_according_to_the_competence_assessment_test_result",
        data: body,
      });
      return response
        .json("Wait to verify, code send to your email")
        .status(200);
    } catch (error) {
      return response.json("Error").status(500);
    }
  };

const getApplicationForAdmissionWithAHighSchoolScript = (
  request: Request,
  response: Response
) => {
  try {
    admissionServiceClient.GetAllApplicationForAdmissionWithAHighSchoolScript(
      {},
      (err: any, res: any) => {
        if (err) {
          return response.json(res?.error).status(400);
        }
        console.log(res);
        return response.json(res.applications).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const applyApplicationForAdmissionWithAHighSchoolScript = (
  request: Request,
  response: Response
) => {
  try {
    const body = request.body;
    MyEventEmitter.emit("apply_admission", {
      form: "admission_with_high_school_script",
      data: body,
    });
    return response.json("Wait to verify, code send to your email").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getApplicationForStraightAdmissionAndPriorityConsideration = (
  request: Request,
  response: Response
) => {
  try {
    admissionServiceClient.GetAllApplicationForStraightAdmissionAndPriorityConsideration(
      {},
      (err: any, res: any) => {
        if (err) {
          return response.json(res?.error).status(400);
        }
        console.log(res);
        return response.json(res.applications).status(200);
      }
    );
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const applyApplicationForStraightAdmissionAndPriorityConsideration = (
  request: Request,
  response: Response
) => {
  try {
    const body = request.body;
    MyEventEmitter.emit("apply_admission", {
      form: "admission_and_priority_consideration",
      data: body,
    });
    return response.json("Wait to verify, code send to your email").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllGender = async (_request: Request, response: Response) => {
  try {
    admissionServiceClient.GetAllGender({}, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.genders).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllArea = async (_request: Request, response: Response) => {
  try {
    admissionServiceClient.GetAllArea({}, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.areas).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllPriority = async (_request: Request, response: Response) => {
  try {
    admissionServiceClient.GetAllPriority({}, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.priorities).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getAllObjectAdmission = async (_request: Request, response: Response) => {
  try {
    admissionServiceClient.GetAllObjectAdmission({}, (err: any, res: any) => {
      if (err) {
        return response.json("Error").status(400);
      }
      return response.json(res.objects).status(200);
    });
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getRegistrationByCode = async (request: Request, response: Response) => {
  try {
    const { code } = request.query;
    const application = await new Promise((resolve, reject) => {
      admissionServiceClient.GetApplicationRegistrationByCode(
        { code: code as string },
        (err: any, res: any) => {
          if (err) {
            reject("Error");
          }
          resolve(res);
        }
      );
    });
    return response.status(200).json(application);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getTestResultByCode = async (request: Request, response: Response) => {
  try {
    const { code } = request.query;
    const application = await new Promise((resolve, reject) => {
      admissionServiceClient.GetApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResultByCode(
        { code: code as string },
        (err: any, res: any) => {
          if (err) {
            reject("Error");
          }
          resolve(res);
        }
      );
    });
    return response.status(200).json(application);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getHighSchoolScriptByCode = async (
  request: Request,
  response: Response
) => {
  try {
    const { code } = request.query;
    const application = await new Promise((resolve, reject) => {
      admissionServiceClient.GetApplicationForAdmissionWithAHighSchoolScriptByCode(
        { code: code as string },
        (err: any, res: any) => {
          if (err) {
            reject("Error");
          }
          resolve(res);
        }
      );
    });
    return response.status(200).json(application);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const getPriorityConsiderationByCode = async (
  request: Request,
  response: Response
) => {
  try {
    const { code } = request.query;
    const application = await new Promise((resolve, reject) => {
      admissionServiceClient.GetApplicationForStraightAdmissionAndPriorityConsiderationByCode(
        { code: code as string },
        (err: any, res: any) => {
          if (err) {
            reject("Error");
          }
          resolve(res);
        }
      );
    });
    return response.status(200).json(application);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const autoAccept = (request: Request, response: Response) => {
  try {
    admissionServiceClient.AutoAccept({}, (err: any, res: any) => {
      if (err) {
        // return response.json(err).status(400);
      }
    });
    return response.json("Done").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateApplicationRegistration = (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  try {
    admissionServiceClient.UpdateApplicationRegistration(
      {
        id,
        ...request.body,
      },
      (err: any, res: any) => {
        if (err) {
          // return response.json(err).status(400);
        }
      }
    );
    return response.json("Done").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateApplicationForAdmissionWithAHighSchoolScript = (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  try {
    admissionServiceClient.UpdateApplicationForAdmissionWithAHighSchoolScript(
      {
        id,
        ...request.body,
      },
      (err: any, res: any) => {
        if (err) {
          // return response.json(err).status(400);
        }
      }
    );
    return response.json("Done").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult =
  (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      admissionServiceClient.UpdateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult(
        {
          id,
          ...request.body,
        },
        (err: any, res: any) => {
          if (err) {
            // return response.json(err).status(400);
          }
        }
      );
      return response.json("Done").status(200);
    } catch (error) {
      return response.json("Error").status(500);
    }
  };

const updateApplicationForStraightAdmissionAndPriorityConsideration = (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  try {
    admissionServiceClient.UpdateApplicationForStraightAdmissionAndPriorityConsideration(
      {
        id,
        ...request.body,
      },
      (err: any, res: any) => {
        if (err) {
          // return response.json(err).status(400);
        }
      }
    );
    return response.json("Done").status(200);
  } catch (error) {
    return response.json("Error").status(500);
  }
};

const admissionController = {
  applyApplicationAdmissionRegistration,
  applyApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult,
  applyApplicationForAdmissionWithAHighSchoolScript,
  applyApplicationForStraightAdmissionAndPriorityConsideration,
  getAllGender,
  getAllArea,
  getAllPriority,
  getAllObjectAdmission,
  getApplyApplicationAdmissionRegistration,
  getApplicationForAdmissionWithAHighSchoolScript,
  getApplicationForStraightAdmissionAndPriorityConsideration,
  getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult,
  getRegistrationByCode,
  getTestResultByCode,
  getHighSchoolScriptByCode,
  getPriorityConsiderationByCode,
  autoAccept,
  updateApplicationRegistration,
  updateApplicationForAdmissionWithAHighSchoolScript,
  updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult,
  updateApplicationForStraightAdmissionAndPriorityConsideration,
};

export default admissionController;
