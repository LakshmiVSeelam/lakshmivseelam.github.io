# 🤖 AI-Powered Interactive Portfolio

**Lakshmi Seelam's Portfolio** - A next-generation portfolio website featuring AI chatbot, interactive storytelling, and modern design.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LakshmiVSeelam/lakshmivseelam.github.io)

## ✨ Features

### 🤖 **AI Chat Widget**

- Conversational AI that responds as Lakshmi
- Maintains conversation context
- Quick question shortcuts
- Real-time responses powered by OpenAI GPT-3.5

### 📖 **Interactive Story**

- Choose-your-own-adventure career journey
- Dynamic AI-generated content
- Multiple story paths and chapters
- Engaging narrative with smooth animations

### 💼 **Professional Portfolio**

- Modern, responsive design
- Dark theme with gradient accents
- Smooth animations and transitions
- Mobile-optimized experience

---

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. **Clone the repository:**

```bash
git clone https://github.com/LakshmiVSeelam/lakshmivseelam.github.io.git
cd lakshmivseelam.github.io
```

2. **Install dependencies:**

```bash
npm install
```

3. **Deploy to Vercel:**

```bash
npm install -g vercel
vercel login
vercel
```

4. **Add your OpenAI API key:**

```bash
vercel env add OPENAI_API_KEY
```

5. **Deploy to production:**

```bash
vercel --prod
```

### Option 2: Run Locally

1. **Clone and install:**

```bash
git clone https://github.com/LakshmiVSeelam/lakshmivseelam.github.io.git
cd lakshmivseelam.github.io
npm install
```

2. **Create `.env.local`:**

```bash
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
```

3. **Run development server:**

```bash
vercel dev
```

4. **Open in browser:**

```
http://localhost:3000
```

---

## 📁 Project Structure

```
lakshmivseelam.github.io/
├── api/                        # Vercel serverless functions
│   ├── chat.ts                 # AI chatbot endpoint
│   ├── explain-code.ts         # Code explainer endpoint
│   ├── generate-story.ts       # Story generator endpoint
│   ├── utils.ts                # Shared utilities
│   └── types/
│       └── index.ts            # TypeScript types
├── js/                         # Frontend JavaScript
│   ├── common.js               # Original portfolio scripts
│   ├── ai-chat.js              # Chat widget logic
│   ├── ai-chat.css             # Chat widget styles
│   ├── interactive-story.js    # Story feature logic
│   └── interactive-story.css   # Story styles
├── assets/                     # Images and media
├── index.html                  # Main HTML file
├── style.css                   # Main styles
├── vercel.json                 # Vercel configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── API_README.md               # Backend documentation
├── FRONTEND_README.md          # Frontend documentation
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # This file
```

---

## 🎨 Features In Detail

### AI Chat Widget 💬

Located in the bottom-right corner of every page.

**Capabilities:**

- Real-time AI conversations
- Context-aware responses
- Quick question buttons
- Professional and friendly tone
- Error handling with fallback contact info

**Try asking:**

- "What technologies do you use?"
- "Tell me about your experience"
- "What projects have you built?"

### Interactive Story 📖

Navigate to the "Story" section in the menu.

**Experience:**

- Choose your path through Lakshmi's career
- Multiple story chapters and endings
- Dynamic AI-generated content
- Progress tracking
- Smooth animations

**Story Paths:**

- 🚀 Startup Journey
- 🏢 Enterprise Experience
- 💻 Technical Deep Dive
- 💪 Challenging Problems
- 📈 Professional Growth

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Customization

**Update Colors:**

```css
/* In style.css, ai-chat.css, or interactive-story.css */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

**Modify Chat Widget Position:**

```css
/* In js/ai-chat.css */
.ai-chat-widget {
  bottom: 24px;
  right: 24px;
}
```

**Add Story Chapters:**

```javascript
/* In js/interactive-story.js */
const staticStories = {
  newChapter: {
    content: `Your content...`,
    choices: [...]
  }
}
```

---

## 📡 API Endpoints

### 1. Chat API

```
POST /api/chat
Body: { message: string, conversationHistory: array }
Response: { success: boolean, reply: string }
```

### 2. Code Explainer

```
POST /api/explain-code
Body: { code: string, language: string, context?: string }
Response: { success: boolean, explanation: string }
```

### 3. Story Generator

```
POST /api/generate-story
Body: { chapterId: string, userChoice?: string }
Response: { success: boolean, content: string, nextChoices: array }
```

---

## 🧪 Testing

### Test the Features

1. **Chat Widget:**

   - Click the purple button in bottom-right
   - Try quick questions
   - Ask custom questions

2. **Interactive Story:**

   - Navigate to "Story" section
   - Click through different choices
   - Try all story paths

3. **API Endpoints:**
   Visit `/api-test.html` for interactive API testing

### Browser Testing

✅ Chrome/Edge (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Mobile browsers

---

## 💰 Cost Breakdown

### Vercel (Hosting)

- **Free Tier:** 100GB bandwidth, 100 serverless executions/day
- **Pro:** $20/month (unlimited executions)

### OpenAI API

- **GPT-3.5-turbo:** ~$0.002 per conversation
- **Expected cost:** $2-5/month for typical portfolio traffic

### Total

**~$2-5/month** for a fully functional AI portfolio

---

## 🐛 Troubleshooting

### Chat Widget Not Working

1. Check browser console for errors
2. Verify `OPENAI_API_KEY` is set in Vercel
3. Check API endpoint in DevTools Network tab
4. Fallback: Shows contact info if API fails

### Story Section Not Appearing

1. Verify `js/interactive-story.js` is loaded
2. Check console for errors
3. Fallback: Static stories work offline

### API 404 Errors

1. Ensure `vercel.json` exists
2. Redeploy: `vercel --prod`
3. Check API files have `.ts` extension

---

## 📚 Documentation

- **[API_README.md](./API_README.md)** - Backend API documentation
- **[FRONTEND_README.md](./FRONTEND_README.md)** - Frontend features guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[.env.example](./.env.example)** - Environment variables template

---

## 🎯 Tech Stack

### Frontend

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.3
- Font Awesome icons
- Custom animations

### Backend

- Vercel Serverless Functions
- Node.js / TypeScript
- OpenAI GPT-3.5-turbo API

### Infrastructure

- Vercel (hosting + serverless)
- GitHub (version control)
- OpenAI (AI services)

---

## 🌟 What Makes This Special

1. **AI-Powered:** Real conversations, not scripted responses
2. **Interactive:** Users engage with your story
3. **Modern:** Cutting-edge design and UX
4. **Unique:** Stands out from traditional portfolios
5. **Scalable:** Built on serverless architecture
6. **Professional:** Production-ready code

---

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly interactions
- Optimized for small screens
- Fast loading times
- Smooth animations

---

## 🔒 Security

- API keys secured in environment variables
- Rate limiting on all endpoints
- Input sanitization
- CORS configuration
- Error handling without exposing sensitive data

---

## 🚀 Future Enhancements

- [ ] Voice input for chat
- [ ] Multi-language support
- [ ] Save conversation history
- [ ] Share story paths via URL
- [ ] Dark/light mode toggle
- [ ] Analytics dashboard
- [ ] More AI features

---

## 👨‍💻 Development

### Run Development Server

```bash
vercel dev
```

### Build for Production

```bash
vercel --prod
```

### Test API Locally

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

---

## 📄 License

MIT License - Feel free to use this as a template for your own portfolio!

---

## 👩‍💻 Author

**Lakshmi Seelam**

- 📧 Email: lakshmivseelam@gmail.com
- 📱 Phone: (+91) 9029272122
- 💼 LinkedIn: [lakshmiseelam](https://www.linkedin.com/in/lakshmiseelam/)
- 📍 Location: Hyderabad, India

---

## 🙏 Acknowledgments

- OpenAI for GPT-3.5-turbo API
- Vercel for serverless infrastructure
- Bootstrap for UI framework
- Font Awesome for icons

---

## 🎉 Get Started Now!

1. **Star this repo** ⭐
2. **Clone it** 📥
3. **Deploy to Vercel** 🚀
4. **Share your portfolio** 🌍

**Questions?** Open an issue or reach out directly!

---

Built with ❤️ using AI, creativity, and a lot of coffee ☕
