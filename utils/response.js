export function sendResponse(res, statusCode, message, data = null) {
  const payload = {};
  if (message) payload.message = message;
  if (data) payload.data = data;
  if (!message && !data) {
    throw new Error("[sendResponse]: No data or message provided for response");
  }
  return res.status(statusCode).json(payload);
}

export function sendErrorResponse(res, statusCode, message, errors) {
  const payload = { message };
  if (errors) payload.errors = errors;
  if (!message && !errors) {
    throw new Error("[sendErrorResponse]: No data or message provided for response");
  }
  return res.status(statusCode).json(payload);
}

export function sendCookieResponse(res, statusCode, message, data, tokenName, tokenValue) {
  return res.cookie(tokenName, tokenValue).status(statusCode).json({ message, data });
}
