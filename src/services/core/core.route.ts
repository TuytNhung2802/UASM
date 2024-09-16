import { Router } from "express";
import coreController from "./core.controller";
import multer from "multer";

const upload = multer();

const router = Router();

// modules
router.get("/modules", coreController.getAllModule);
router.post("/modules", coreController.createModule);
router.put("/modules/:id", coreController.updateModule);
router.delete("/modules/:id", coreController.deleteModule);

// member school
router.get("/member-schools", coreController.getAllMemberSchool);
router.post("/member-schools", coreController.createMemberSchool);
router.put("/member-schools/:id", coreController.updateMemberSchool);
router.delete("/member-schools/:id", coreController.deleteMemberSchool);

// majors
router.post(
  "/majors/import-subjectblock",
  coreController.importSubjectBlockIntoMajor
);
router.post("/majors/import", coreController.importMajor);
router.get("/majors", coreController.getAllMajor);
router.post("/majors", coreController.createMajor);
router.put("/majors/:id", coreController.updateMajor);
router.delete("/majors/:id", coreController.deleteMajor);

// subject
router.post("/subjects/import", coreController.importSubject);
router.get("/subjects", coreController.getAllSubject);
router.post("/subjects", coreController.createSubject);
router.put("/subjects/:id", coreController.updateSubject);
router.delete("/subjects/:id", coreController.deleteSubject);

// subject block
router.post(
  "/subject-blocks/import-subject",
  coreController.importSubjectIntoBlock
);
router.post("/subject-blocks/import", coreController.importSubjectBlock);
router.get("/subject-blocks", coreController.getAllSubjectBlock);
router.post("/subject-blocks", coreController.createSubjectBlock);
router.put("/subject-blocks/:id", coreController.updateSubjectBlock);
router.delete("/subject-blocks/:id", coreController.deleteSubjectBlock);

// files
router.get("/files", coreController.getAllFile);
router.post("/files", upload.single("file"), coreController.createFile);
router.put("/files/:id", upload.single("file"), coreController.updateFile);
router.delete("/files/:id", coreController.deleteFile);

// sub majors
router.post("/submajors/import", coreController.importSubMajor);
router.get("/submajors", coreController.getAllSubMajor);
router.post("/submajors", coreController.createSubMajor);
router.put("/submajors/:id", coreController.updateSubMajor);
router.delete("/submajors/:id", coreController.deleteSubMajor);

// rules
router.get("/rules", coreController.getAllRule);
router.post("/rules", coreController.createRule);
router.put("/rules/:id", coreController.updateRule);
router.delete("/rules/:id", coreController.deleteRule);

// certificates
router.get("/certificates", coreController.getAllCertificate);
router.post("/certificates", coreController.createCertificate);
router.put("/certificates/:id", coreController.updateCertificate);
router.delete("/certificates/:id", coreController.deleteCertificate);

export default router;
