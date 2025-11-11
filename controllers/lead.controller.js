import columnModel from "../models/column.model.js";
import leadModel from "../models/lead.model.js";
import userModel from "../models/user.model.js";
import { sendErrorResponse, sendResponse } from "../utils/response.js";

async function createLead(req, res) {
  try {
    const { columnId } = req.params;
    const { name, order } = req.body;
    const column = await columnModel.findById(columnId).populate({ path: "leads" });
    if (!column) return sendErrorResponse(res, 404, "Column does not exist");
    if (order !== column.leads.length) return sendErrorResponse(res, 406, "The order does not match");
    const lead = await leadModel.create({
      name,
      order,
      column: columnId,
    });
    return sendResponse(res, 201, "Lead successfully created", lead.toJSON());
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

async function moveLead(req, res) {
  try {
    const { columnId, leadId } = req.params;
    const { targetColumnId, targetOrder } = req.body;
    const lead = await leadModel.findById(leadId);
    if (!lead) return sendErrorResponse(res, 404, "Lead not found");
    await leadModel.updateMany({ column: columnId, order: { $gt: lead.order } }, { $inc: { order: -1 } });
    lead.column = targetColumnId;
    lead.order = targetOrder;
    await lead.save();
    await leadModel.updateMany({ column: targetColumnId, order: { $gt: targetOrder } }, { $inc: { order: 1 } });
    return sendResponse(res, 200, "Lead moved successfully");
  } catch (error) {}
}

async function updateLead(req, res) {
  try {
    const { columnId, leadId } = req.params;
    if (!columnId) return sendErrorResponse(res, 400, "Invalid column");
    if (!leadId) return sendErrorResponse(res, 400, "Invalid lead");
    const { name } = req.body;
    const lead = await leadModel.findById(id);
    if (!lead) return sendErrorResponse(res, 404, "Lead not found");
    if (lead.column !== columnId) return sendErrorResponse(res, 422, "Column mismatch");
    lead.name = name;
    await lead.save();
    return sendResponse(res, 200, null, lead);
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

async function deleteLead(req, res) {
  try {
    const { columnId, leadId } = req.params;
    if (!columnId) return sendErrorResponse(res, 400, "Column ID required");
    if (!leadId) return sendErrorResponse(res, 400, "Lead ID required");
    const leadToDelete = await leadModel.findById(leadId);
    if (!leadToDelete) return sendErrorResponse(res, 404, "Lead not found");
    await leadModel.findByIdAndDelete(leadId);
    await leadModel.updateMany({ column: columnId, order: { $gt: leadToDelete.order } }, { $inc: { order: -1 } });
    return sendResponse(res, 200, "Lead deleted and order updated");
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
}

export { createLead, updateLead, deleteLead, moveLead };
