import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleCors, validateMethod, validateEnv, errorResponse, successResponse, checkRateLimit } from "./utils";
import type { StoryGenerateRequest, StoryGenerateResponse } from "./types";

/**
 * Story Generator API Endpoint
 * Generates dynamic story content based on user choices
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  // Handle CORS
  if (handleCors(req, res)) return;

  // Validate method
  if (!validateMethod(req, res, ["POST"])) return;

  // Rate limiting
  const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
  const rateLimitCheck = checkRateLimit(clientIp as string, 15, 60000);

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
    const { chapterId, userChoice = "" } = req.body as StoryGenerateRequest;

    // Validate input
    if (!chapterId || typeof chapterId !== "string") {
      return errorResponse(res, "Chapter ID is required", 400);
    }

    // Story context based on chapter
    const storyContexts: Record<string, string> = {
      startup: `Generate a compelling narrative about Lakshmi's startup journey, focusing on building Ridge Sports Infra from scratch. Include challenges faced, late nights coding, the thrill of launch day, and the satisfaction of seeing clients use the platform. Keep it personal and inspiring.`,

      enterprise: `Create a story about Lakshmi's experience working with Fortune 500 companies, highlighting the scale of projects, team collaboration, handling high-traffic applications, and the lessons learned about enterprise-level development.`,

      technical: `Narrate a technical deep-dive into one of Lakshmi's projects, explaining the architecture decisions, technology choices, and problem-solving approaches. Make it engaging and show expertise without being dry.`,

      challenge: `Tell a story about a particularly difficult technical challenge Lakshmi faced, how she approached it, the debugging process, and the eventual breakthrough. Include the emotional journey and learning outcomes.`,

      growth: `Share Lakshmi's professional growth story, from early career to 10+ years experience, highlighting key milestones, skill development, and evolution as a developer and leader.`,
    };

    const context = storyContexts[chapterId] || storyContexts["startup"];

    const prompt = `${context}

${
  userChoice ? `The user chose: "${userChoice}". Continue the story based on this choice.\n\n` : ""
}Write 2-3 engaging paragraphs that feel personal and authentic. End with 2-3 compelling choices for what to explore next. Format the choices as a JSON array at the end.

Story should be in first person, from Lakshmi's perspective, and feel like a genuine conversation.`;

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
            content: `You are a creative storyteller helping Lakshmi Seelam share her professional journey as a full-stack developer with 10+ years of experience. 

Write in first person, be authentic, enthusiastic, and make technical concepts accessible. Stories should be:
- Personal and relatable
- 2-3 paragraphs (150-250 words)
- Engaging and inspiring
- End with choices for the reader

Format: 
Story content, then on a new line:
CHOICES: ["choice 1", "choice 2", "choice 3"]`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 350,
        temperature: 0.9,
        presence_penalty: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      return errorResponse(res, "AI service temporarily unavailable", 503);
    }

    const data = await openaiResponse.json();
    const fullContent = data.choices[0]?.message?.content;

    if (!fullContent) {
      return errorResponse(res, "No story generated", 500);
    }

    // Parse content and choices
    const choicesMatch = fullContent.match(/CHOICES:\s*(\[.*\])/s);
    let content = fullContent;
    let nextChoices: string[] = [];

    if (choicesMatch) {
      content = fullContent.substring(0, choicesMatch.index).trim();
      try {
        nextChoices = JSON.parse(choicesMatch[1]);
      } catch (e) {
        console.error("Failed to parse choices:", e);
        nextChoices = ["Continue the journey", "Explore another path", "Learn more"];
      }
    }

    return successResponse(res, {
      content,
      nextChoices,
    } as StoryGenerateResponse);
  } catch (error) {
    console.error("Story generate API error:", error);
    return errorResponse(res, error instanceof Error ? error.message : "Internal server error", 500);
  }
}
