/**
 * AI Chat Widget
 * Floating chatbot that integrates with /api/chat
 */

class AIChatWidget {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    // Update this URL with your actual Vercel deployment URL
    this.apiEndpoint = "https://lakshmivseelam-portfolio-backend.vercel.app/api/chat";
    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.showWelcomeMessage();
  }

  createChatWidget() {
    const chatHTML = `
      <div id="ai-chat-widget" class="ai-chat-widget">
        <!-- Toggle Button -->
        <button id="chat-toggle-btn" class="chat-toggle-btn" aria-label="Toggle AI Chat">
          <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span class="chat-badge">AI</span>
        </button>

        <!-- Chat Container -->
        <div id="chat-container" class="chat-container">
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="chat-avatar">
                <span>LS</span>
              </div>
              <div class="chat-header-text">
                <h3>AI Lakshmi</h3>
                <p class="chat-status">
                  <span class="status-dot"></span> Online
                </p>
              </div>
            </div>
            <button id="chat-minimize-btn" class="chat-minimize-btn" aria-label="Minimize chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          <div id="chat-messages" class="chat-messages">
            <!-- Messages will be inserted here -->
          </div>

          <div class="chat-input-container">
            <div class="quick-questions">
              <button class="quick-question-btn" data-question="What technologies do you use?">
                💻 Tech Stack
              </button>
              <button class="quick-question-btn" data-question="Tell me about your experience">
                📚 Experience
              </button>
              <button class="quick-question-btn" data-question="What projects have you built?">
                🚀 Projects
              </button>
            </div>
            <div class="chat-input-wrapper">
              <input 
                type="text" 
                id="chat-input" 
                class="chat-input" 
                placeholder="Ask me anything..."
                maxlength="500"
              />
              <button id="chat-send-btn" class="chat-send-btn" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <p class="chat-disclaimer">
              AI-powered responses • May not always be accurate
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", chatHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById("chat-toggle-btn");
    const minimizeBtn = document.getElementById("chat-minimize-btn");
    const sendBtn = document.getElementById("chat-send-btn");
    const input = document.getElementById("chat-input");
    const quickQuestionBtns = document.querySelectorAll(".quick-question-btn");

    toggleBtn.addEventListener("click", () => this.toggleChat());
    minimizeBtn.addEventListener("click", () => this.toggleChat());
    sendBtn.addEventListener("click", () => this.sendMessage());
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    quickQuestionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const question = btn.dataset.question;
        input.value = question;
        this.sendMessage();
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const container = document.getElementById("chat-container");
    const toggleBtn = document.getElementById("chat-toggle-btn");

    if (this.isOpen) {
      container.classList.add("open");
      toggleBtn.classList.add("open");
      setTimeout(() => document.getElementById("chat-input").focus(), 300);
    } else {
      container.classList.remove("open");
      toggleBtn.classList.remove("open");
    }
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.addMessage(
        `Hi! I'm AI Lakshmi 👋\n\nI can answer questions about my experience, skills, projects, and more. What would you like to know?`,
        "assistant",
        false
      );
    }, 1000);
  }

  async sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    input.value = "";

    // Add to conversation history
    this.conversationHistory.push({
      role: "user",
      content: message,
    });

    // Show typing indicator
    this.showTypingIndicator();

    // Try local knowledge base first
    const localResponse = this.getLocalResponse(message);
    if (localResponse) {
      setTimeout(() => {
        this.removeTypingIndicator();
        this.addMessage(localResponse, "assistant");
        this.conversationHistory.push({
          role: "assistant",
          content: localResponse,
        });
      }, 800);
      return;
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationHistory: this.conversationHistory.slice(-10), // Last 5 exchanges
        }),
      });

      const data = await response.json();

      // Remove typing indicator
      this.removeTypingIndicator();

      if (data.success && data.reply) {
        this.addMessage(data.reply, "assistant");
        this.conversationHistory.push({
          role: "assistant",
          content: data.reply,
        });
      } else {
        // Fallback to local response
        const fallback = this.getFallbackResponse(message);
        this.addMessage(fallback, "assistant");
      }
    } catch (error) {
      console.error("Chat error:", error);
      this.removeTypingIndicator();
      // Use fallback instead of error
      const fallback = this.getFallbackResponse(message);
      this.addMessage(fallback, "assistant");
    }
  }

  getLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Experience questions
    if (lowerMessage.includes('experience') || lowerMessage.includes('years')) {
      return "I have 10+ years of professional experience as a Full-Stack Developer. I've worked on 50+ projects ranging from startups to Fortune 500 companies, building scalable solutions with React, Angular, Node.js, and cloud technologies.";
    }
    
    // Skills questions
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      return "My core technical skills include:\n\n**Frontend:** React, Angular, Vue.js, JavaScript/TypeScript, HTML5, CSS3\n**Backend:** Node.js, Python, PHP, REST APIs, GraphQL\n**Database & Cloud:** MongoDB, MySQL, PostgreSQL, AWS, Azure, Google Cloud\n**Mobile & Tools:** React Native, Flutter, Git, Docker, CI/CD, Agile\n\nI specialize in full-stack development, scalable architecture, UI/UX design, and leading development teams.";
    }
    
    // Project questions
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return "I've delivered several notable projects:\n\n**Ridge Sports Infra:** Modern responsive website with dynamic content management, achieving 95+ PageSpeed score\n\n**Aashri Society NGO:** Angular platform with WCAG 2.1 AA accessibility, donation processing, and multi-language support\n\n**Rotary Club Digital Hub:** Community platform with member portal, event management, and 150% organic traffic increase\n\n**Petswonder E-Commerce:** Scalable platform handling 500+ daily transactions with React, Node.js, and MongoDB\n\nPlus confidential enterprise projects for Fortune 500 companies. Check out the Work section for more details!";
    }
    
    // Location questions
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based')) {
      return "I'm based in Hyderabad, India. I'm open to remote work opportunities and can collaborate with teams globally.";
    }
    
    // Contact questions
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach me at:\n\n📧 Email: lakshmivseelam@gmail.com\n📱 Phone: (+91) 9029272122 / (+91) 9967623013\n💼 LinkedIn: linkedin.com/in/lakshmiseelam\n📍 Location: Hyderabad, India\n\nFeel free to reach out for opportunities, collaborations, or just to chat about tech!";
    }
    
    // Education questions
    if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
      return "I have a strong educational background in Computer Science and have continuously updated my skills through professional certifications and hands-on experience with cutting-edge technologies.";
    }
    
    return null;
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm happy to answer questions about my experience, skills, projects, and how I can help with your next development challenge. What would you like to know?";
    }
    
    if (lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('opportunity')) {
      return "Yes, I'm open to new opportunities! With 10+ years of full-stack development experience, I can help with:\n\n• Building scalable web applications\n• Leading development teams\n• Cloud architecture & deployment\n• Mobile app development\n• Technical consulting\n\nLet's discuss your project: lakshmivseelam@gmail.com or (+91) 9029272122";
    }
    
    // Default response
    return "I'd be happy to help! I can share information about my:\n\n• 10+ years of full-stack development experience\n• Technical skills (React, Angular, Node.js, Cloud)\n• Portfolio projects\n• Contact information\n\nWhat would you like to know? Or feel free to reach me directly at lakshmivseelam@gmail.com";
  }

  addMessage(text, role, isError = false) {
    const messagesContainer = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${role}-message ${isError ? "error-message" : ""}`;

    if (role === "assistant") {
      messageDiv.innerHTML = `
        <div class="message-avatar">LS</div>
        <div class="message-content">
          <div class="message-text">${this.formatMessage(text)}</div>
          <div class="message-time">${this.getTimeString()}</div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">${this.escapeHtml(text)}</div>
          <div class="message-time">${this.getTimeString()}</div>
        </div>
      `;
    }

    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById("chat-messages");
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message assistant-message typing-indicator";
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = `
      <div class="message-avatar">LS</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();
  }

  formatMessage(text) {
    // Convert line breaks to <br>
    text = this.escapeHtml(text);
    text = text.replace(/\n/g, "<br>");

    // Make URLs clickable
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

    return text;
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById("chat-messages");
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  }
}

// Initialize chat widget when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new AIChatWidget());
} else {
  new AIChatWidget();
}
