import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * CORS headers for allowing requests from your frontend
 */
export const corsHeaders = {
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*", // In production, replace with your domain
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

/**
 * Handle CORS preflight requests
 */
export function handleCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }
  return false;
}

/**
 * Validate required environment variables
 */
export function validateEnv(keys: string[]): { valid: boolean; missing?: string[] } {
  const missing = keys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  return { valid: true };
}

/**
 * Error response helper
 */
export function errorResponse(res: VercelResponse, message: string, status = 500) {
  return res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Success response helper
 */
export function successResponse(res: VercelResponse, data: any, status = 200) {
  return res.status(status).json({
    success: true,
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Validate request method
 */
export function validateMethod(req: VercelRequest, res: VercelResponse, allowedMethods: string[]): boolean {
  if (!allowedMethods.includes(req.method || "")) {
    errorResponse(res, `Method ${req.method} not allowed`, 405);
    return false;
  }
  return true;
}

/**
 * Rate limiting helper (basic implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests = 10,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  return input
    .slice(0, maxLength)
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim();
}
