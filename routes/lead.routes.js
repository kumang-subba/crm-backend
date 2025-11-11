import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { createLeadValidator, updateLeadValidator, moveLeadValidator } from "../validators/lead.validator.js";
import { createLead, deleteLead, updateLead, moveLead } from "../controllers/lead.controller.js";

const leadRouter = Router({ mergeParams: true });

leadRouter.post("/create", validate(createLeadValidator), createLead);
leadRouter.put("/:leadId/update", validate(updateLeadValidator), updateLead);
leadRouter.put("/:leadId/move", validate(moveLeadValidator), moveLead);
leadRouter.delete("/:leadId", deleteLead);

export default leadRouter;
