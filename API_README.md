# AI Portfolio Backend API

Backend serverless functions for Lakshmi's AI-powered portfolio website.

## 🚀 Features

- **AI Chat** - Conversational AI that responds as Lakshmi
- **Code Explainer** - Explains code snippets in natural language
- **Story Generator** - Dynamic storytelling based on user choices
- **Rate Limiting** - Protection against abuse
- **CORS Enabled** - Works with any frontend
- **Type-Safe** - Full TypeScript support

## 📁 Structure

```
api/
├── chat.ts              # AI chatbot endpoint
├── explain-code.ts      # Code explanation endpoint
├── generate-story.ts    # Dynamic story generation
├── utils.ts             # Shared utilities
└── types/
    └── index.ts         # TypeScript type definitions
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-key-here
```

### 3. Run Locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/*`

## 🌐 Deployment to Vercel

### Option 1: CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy!

## 📡 API Endpoints

### 1. Chat API

**Endpoint:** `POST /api/chat`

**Request:**

```json
{
  "message": "What technologies do you specialize in?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "reply": "I specialize in React, Node.js, Python...",
  "timestamp": "2025-11-16T13:00:00.000Z"
}
```

### 2. Code Explainer API

**Endpoint:** `POST /api/explain-code`

**Request:**

```json
{
  "code": "const sum = (a, b) => a + b;",
  "language": "javascript",
  "context": "This is from my utility functions"
}
```

**Response:**

```json
{
  "success": true,
  "explanation": "This is an arrow function that adds two numbers...",
  "timestamp": "2025-11-16T13:00:00.000Z"
}
```

### 3. Story Generator API

**Endpoint:** `POST /api/generate-story`

**Request:**

```json
{
  "chapterId": "startup",
  "userChoice": "Tell me about Ridge Sports Infra"
}
```

**Response:**

```json
{
  "success": true,
  "content": "It was 2020 when I first met the Ridge Sports team...",
  "nextChoices": ["What challenges did you face?", "Show me the tech stack", "What was the outcome?"],
  "timestamp": "2025-11-16T13:00:00.000Z"
}
```

## 🔒 Security Features

- **Rate Limiting:** 10 requests/minute for chat, 5 for code explanation
- **Input Sanitization:** Removes harmful characters
- **Environment Variables:** API keys never exposed to frontend
- **CORS:** Configurable allowed origins
- **Error Handling:** No sensitive data in error messages

## 🧪 Testing Locally

### Test Chat API

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Lakshmi!"}'
```

### Test Code Explainer

```bash
curl -X POST http://localhost:3000/api/explain-code \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"Hello\");", "language": "javascript"}'
```

### Test Story Generator

```bash
curl -X POST http://localhost:3000/api/generate-story \
  -H "Content-Type: application/json" \
  -d '{"chapterId": "startup"}'
```

## 💰 Cost Estimation

### OpenAI API Costs (GPT-3.5-turbo)

- **Input:** $0.0005 per 1K tokens
- **Output:** $0.0015 per 1K tokens

**Example for 1000 visitors:**

- Average 5 chat messages each
- ~100 tokens per interaction
- **Cost:** ~$2-3/month

### Vercel Costs

- **Hobby (Free):** 100GB bandwidth, 100 serverless executions/day
- **Pro ($20/mo):** Unlimited executions, 1TB bandwidth

## 📚 Frontend Integration

### Example: Using the Chat API

```javascript
async function sendMessage(message) {
  try {
    const response = await fetch("https://your-site.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("AI Reply:", data.reply);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

sendMessage("What technologies do you use?");
```

## 🐛 Troubleshooting

### Issue: "Missing environment variables"

**Solution:** Add `OPENAI_API_KEY` to Vercel:

```bash
vercel env add OPENAI_API_KEY
```

### Issue: "Rate limit exceeded"

**Solution:** Rate limits are per-IP. Wait 1 minute or adjust limits in `utils.ts`

### Issue: "CORS error"

**Solution:** Update `corsHeaders` in `utils.ts` with your domain:

```typescript
'Access-Control-Allow-Origin': 'https://yourdomain.com'
```

### Issue: "Function timeout"

**Solution:** Increase timeout in `vercel.json`:

```json
"maxDuration": 30
```

## 📝 License

MIT - feel free to use this as a template for your own portfolio!

## 👩‍💻 Author

**Lakshmi Seelam**

- Email: lakshmivseelam@gmail.com
- Phone: (+91) 9029272122
- Website: [Your Vercel URL]

---

Built with ❤️ using Vercel Serverless Functions and OpenAI
