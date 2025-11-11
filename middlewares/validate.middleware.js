import { sendErrorResponse } from "../utils/response.js";

export function validate(schema) {
  return (req, res, next) => {
    try {
      const data = req.body;
      schema.parse(data);
      next();
    } catch (err) {
      if (err.errors) {
        const formatted = err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        }));
        return sendErrorResponse(res, 400, "Validation failed", formatted);
      }
      return sendErrorResponse(res, 500, "Validation middleware error");
    }
  };
}
