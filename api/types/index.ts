// API Request/Response Types

export interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
  timestamp?: string;
}

export interface CodeExplainRequest {
  code: string;
  language?: string;
  context?: string;
}

export interface CodeExplainResponse {
  success: boolean;
  explanation?: string;
  error?: string;
}

export interface StoryGenerateRequest {
  chapterId: string;
  userChoice?: string;
}

export interface StoryGenerateResponse {
  success: boolean;
  content?: string;
  nextChoices?: string[];
  error?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}
