import { Router } from "express";
import CoreClientRoute from "../services/core/core.route";
import AuthClientRoute from "../services/auth/auth.route";
import AdmissionRoute from "../services/admission/admission.route";
import MessageRoute from "../services/message/message.route";
import SettingRoute from "../services/setting/setting.route";
import MessengerRoute from "../services/messenger/messenger.route";

const router = Router();

router.use("/core", CoreClientRoute);
router.use("/auth", AuthClientRoute);
router.use("/admission", AdmissionRoute);
router.use("/message", MessageRoute);
router.use("/setting", SettingRoute);
router.use("/messenger", MessengerRoute);

export default router;
