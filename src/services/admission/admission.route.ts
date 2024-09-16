import { Router } from "express";
import { joiValidate } from "../../middlewares/validate";
import admissionController from "./admission.controller";
import {
  applicationForAdmissionWithAHighSchoolScriptSchema,
  applicationAdmissionRegistrationSchema,
  applicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResultSchema,
  applicationForStraightAdmissionAndPriorityConsiderationSchema,
} from "../../utils/joi";

const router = Router();

router.post(
  "/apply/application-admisison-registration",
  joiValidate(applicationAdmissionRegistrationSchema),
  admissionController.applyApplicationAdmissionRegistration
);
router.post(
  "/apply/application-for-admission-consideration-according-to-the-competence-assessment-test-result",
  joiValidate(
    applicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResultSchema
  ),
  admissionController.applyApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult
);
router.post(
  "/apply/application-for-admission-with-a-high-school-script",
  joiValidate(applicationForAdmissionWithAHighSchoolScriptSchema),
  admissionController.applyApplicationForAdmissionWithAHighSchoolScript
);
router.post(
  "/apply/application-for-straight-admission-and-priority-consideration",
  joiValidate(applicationForStraightAdmissionAndPriorityConsiderationSchema),
  admissionController.applyApplicationForStraightAdmissionAndPriorityConsideration
);

router.get("/genders", admissionController.getAllGender);
router.get("/areas", admissionController.getAllArea);
router.get("/priorities", admissionController.getAllPriority);
router.get("/object-admissions", admissionController.getAllObjectAdmission);
router.get(
  "/application-admisison-registration",
  admissionController.getApplyApplicationAdmissionRegistration
);
router.get(
  "/application-admisison-high-school-script",
  admissionController.getApplicationForAdmissionWithAHighSchoolScript
);
router.get(
  "/application-for-straight-admission-and-priority-consideration",
  admissionController.getApplicationForStraightAdmissionAndPriorityConsideration
);
router.get(
  "/application-for-admission-consideration-according-to-the-competence-assessment-test-result",
  admissionController.getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult
);

router.get(
  "/application-admisison-registration/options",
  admissionController.getRegistrationByCode
);
router.get(
  "/application-for-admission-consideration-according-to-the-competence-assessment-test-result/options",
  admissionController.getTestResultByCode
);
router.get(
  "/application-admisison-high-school-script/options",
  admissionController.getHighSchoolScriptByCode
);
router.get(
  "/application-for-straight-admission-and-priority-consideration/options",
  admissionController.getPriorityConsiderationByCode
);

router.get("/auto-accept", admissionController.autoAccept);

router.put(
  "/application-admisison-registration/update/:id",
  admissionController.updateApplicationRegistration
);
router.put(
  "/application-for-admission-consideration-according-to-the-competence-assessment-test-result/update/:id",
  admissionController.updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult
);
router.put(
  "/application-admisison-high-school-script/update/:id",
  admissionController.updateApplicationForAdmissionWithAHighSchoolScript
);
router.put(
  "/application-for-straight-admission-and-priority-consideration/update/:id",
  admissionController.updateApplicationForStraightAdmissionAndPriorityConsideration
);

export default router;
