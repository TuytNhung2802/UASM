import { Router } from "express";
import settingController from "./setting.controller";
import multer from "multer";

const upload = multer();
const router = Router();

router.post(
  "/import-qa-template",
  upload.single("file"),
  settingController.importQATemplate
);
router.get("/sync-rule", settingController.syncRule);
router.get("/statistic-submajor", settingController.statisticSubMajor);
router.get(
  "/generate-source-from-report",
  settingController.generateSourceFromReport
);
router.get("/store-doc-pinecone", settingController.storePinecone);

export default router;
