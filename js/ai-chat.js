/**
 * AI Chat Widget
 * Floating chatbot that integrates with /api/chat
 */

class AIChatWidget {
  constructor() {
    this.isOpen = false;
    this.conversationHistory = [];
    this.apiEndpoint = "/api/chat";
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
        this.addMessage(
          `Sorry, I'm having trouble connecting right now. Please try again or reach me at lakshmivseelam@gmail.com`,
          "assistant",
          true
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      this.removeTypingIndicator();
      this.addMessage(
        `Oops! Something went wrong. You can reach me directly at lakshmivseelam@gmail.com or (+91) 9029272122`,
        "assistant",
        true
      );
    }
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
