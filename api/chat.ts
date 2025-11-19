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
import type { ChatRequest, ChatResponse } from "./types";

/**
 * AI Chat API Endpoint
 * Handles conversations with AI Lakshmi
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Validate method
  if (!validateMethod(req, res, ["POST"])) return;

  // Rate limiting (10 requests per minute per IP)
  const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const rateLimitCheck = checkRateLimit(clientIp as string, 10, 60000);

  if (!rateLimitCheck.allowed) {
    return errorResponse(res, "Rate limit exceeded. Please try again later.", 429);
  }

  // Validate environment
  const envCheck = validateEnv(["OPENAI_API_KEY"]);
  if (!envCheck.valid) {
    console.error("Missing environment variables:", envCheck.missing);
    return errorResponse(res, "Server configuration error", 500);
  }

  // Debug: Check API key
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("API Key present:", !!apiKey);
  console.log("API Key length:", apiKey?.length || 0);
  console.log("API Key prefix:", apiKey?.substring(0, 10) || "none");

  try {
    const { message, conversationHistory = [] } = req.body as ChatRequest;

    // Validate input
    if (!message || typeof message !== "string") {
      return errorResponse(res, "Message is required", 400);
    }

    const sanitizedMessage = sanitizeInput(message, 500);

    if (sanitizedMessage.length === 0) {
      return errorResponse(res, "Message cannot be empty", 400);
    }

    // Build conversation context
    const messages = [
      {
        role: "system",
        content: `You are Lakshmi Seelam, a passionate and experienced full-stack developer with 10+ years of expertise. 

Your personality:
- Enthusiastic about technology and problem-solving
- Clear communicator who explains complex concepts simply
- Professional but friendly and approachable
- Proud of your work but humble
- Passionate about helping businesses grow through technology

Your background:
- 10+ years in full-stack development
- Experience with startups, scale-ups, and Fortune 500 companies
- Expertise: React, Node.js, Python, MongoDB, AWS, UI/UX design
- Built platforms for Ridge Sports Infra, NGOs (Aashri Society), Rotary Clubs
- Specialized in scalable architectures and mobile applications
- Based in Hyderabad, India

Your projects include:
- Ridge Sports Infra: Complete digital transformation for sports infrastructure company
- Aashri Society: Website for NGO focused on social welfare
- Rotary Club websites: Multiple club websites with modern design
- Petswonder: E-commerce platform for pet products
- Several NDA projects for major companies

Key skills:
- Frontend: React, Angular, Vue.js, HTML5, CSS3, JavaScript/TypeScript
- Backend: Node.js, Python, PHP, REST APIs, GraphQL
- Databases: MongoDB, MySQL, PostgreSQL
- Cloud: AWS, Azure, Google Cloud
- Mobile: React Native, Flutter
- Tools: Git, Docker, CI/CD, Agile/Scrum

Contact: lakshmivseelam@gmail.com | (+91) 9029272122

Respond naturally as Lakshmi would, keeping answers concise (2-3 sentences usually) but informative. Be enthusiastic about your work and eager to discuss opportunities.`,
      },
      ...conversationHistory.slice(-5), // Keep last 5 messages for context
      {
        role: "user",
        content: sanitizedMessage,
      },
    ];

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 200,
        temperature: 0.8,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      return errorResponse(res, "AI service temporarily unavailable", 503);
    }

    const data = await openaiResponse.json();
    const reply = data.choices[0]?.message?.content;

    if (!reply) {
      return errorResponse(res, "No response from AI", 500);
    }

    return successResponse(res, { reply } as ChatResponse);
  } catch (error) {
    console.error("Chat API error:", error);
    return errorResponse(res, error instanceof Error ? error.message : "Internal server error", 500);
  }
}
