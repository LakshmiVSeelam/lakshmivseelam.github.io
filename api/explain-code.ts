import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  handleCors,
  validateMethod,
  validateEnv,
  errorResponse,
  successResponse,
  sanitizeInput,
  checkRateLimit,
} from "./utils";
import type { CodeExplainRequest, CodeExplainResponse } from "./types";

/**
 * Code Explainer API Endpoint
 * Explains code snippets in natural language
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Validate method
  if (!validateMethod(req, res, ["POST"])) return;

  // Rate limiting
  const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const rateLimitCheck = checkRateLimit(clientIp as string, 5, 60000);

  if (!rateLimitCheck.allowed) {
    return errorResponse(res, "Rate limit exceeded. Please try again later.", 429);
  }

  // Validate environment
  const envCheck = validateEnv(["OPENAI_API_KEY"]);
  if (!envCheck.valid) {
    console.error("Missing environment variables:", envCheck.missing);
    return errorResponse(res, "Server configuration error", 500);
  }

  try {
    const { code, language = "javascript", context = "" } = req.body as CodeExplainRequest;

    // Validate input
    if (!code || typeof code !== "string") {
      return errorResponse(res, "Code is required", 400);
    }

    const sanitizedCode = sanitizeInput(code, 2000);

    if (sanitizedCode.length === 0) {
      return errorResponse(res, "Code cannot be empty", 400);
    }

    // Build prompt
    const prompt = `As Lakshmi, an experienced full-stack developer, explain this ${language} code in a clear, friendly way. Focus on what it does, why it's structured this way, and any best practices demonstrated.

${context ? `Context: ${context}\n\n` : ""}Code:
\`\`\`${language}
${sanitizedCode}
\`\`\`

Provide a concise but thorough explanation that would help someone understand both what the code does and why it's written this way.`;

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Lakshmi, an expert developer who explains code clearly and professionally. Break down complex concepts into understandable pieces.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      return errorResponse(res, "AI service temporarily unavailable", 503);
    }

    const data = await openaiResponse.json();
    const explanation = data.choices[0]?.message?.content;

    if (!explanation) {
      return errorResponse(res, "No explanation generated", 500);
    }

    return successResponse(res, { explanation } as CodeExplainResponse);
  } catch (error) {
    console.error("Code explain API error:", error);
    return errorResponse(res, error instanceof Error ? error.message : "Internal server error", 500);
  }
}
