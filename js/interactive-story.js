/**
 * Interactive Story Feature
 * Dynamic storytelling that integrates with /api/generate-story
 */

class InteractiveStory {
  constructor() {
    this.currentChapter = "start";
    this.storyHistory = [];
    this.apiEndpoint = "/api/generate-story";
    this.init();
  }

  init() {
    this.createStorySection();
    this.loadInitialStory();
  }

  createStorySection() {
    const existingSection = document.getElementById("story-section");
    if (existingSection) return;

    const storyHTML = `
      <section class="sec story-sec" id="story">
        <div class="container h-100 d-flex flex-column justify-content-center py-5">
          <div class="story-header text-center mb-5" data-aos="fade-up">
            <h1 class="sec-title mb-3">📖 My Journey: An Interactive Story</h1>
            <p class="story-subtitle">
              Choose your own path through my career. Every choice reveals a different chapter.
            </p>
          </div>

          <div id="story-content" class="story-content" data-aos="fade-up" data-aos-delay="200">
            <div class="story-loader">
              <div class="loader-spinner"></div>
              <p>Loading your story...</p>
            </div>
          </div>

          <div id="story-progress" class="story-progress mt-4">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <p class="progress-text">Chapter <span id="chapter-count">0</span> of your journey</p>
          </div>
        </div>
      </section>
    `;

    // Insert after Work section
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.insertAdjacentHTML("afterend", storyHTML);
    } else {
      document.querySelector("main")?.insertAdjacentHTML("beforeend", storyHTML);
    }
  }

  async loadInitialStory() {
    const staticStories = {
      start: {
        content: `<strong>Welcome, traveler!</strong>

It's 2015. I'm sitting in front of my laptop, fingers hovering over the keyboard, heart racing with excitement and a touch of nervousness. This is it – the moment where everything begins.

The tech world sprawls before me like an uncharted territory. Should I dive into the chaotic energy of startups where every day brings new challenges? Or explore the structured world of enterprise, where scale and impact reach millions?

<em>Every choice shapes a different story. Where should we begin?</em>`,
        choices: [
          { text: "🚀 The Startup Adventure", chapter: "startup" },
          { text: "🏢 Enterprise Scale", chapter: "enterprise" },
          { text: "💻 Technical Deep Dive", chapter: "technical" },
        ],
      },
      startup: {
        content: `<strong>Chapter: The Startup Hustle</strong>

Ridge Sports Infra. Just a name on paper when I joined, but a vision that made my eyes light up. "Build our entire digital presence from scratch," they said. No templates. No shortcuts. Pure creation.

I remember my first all-nighter – coffee at 2 AM, debugging CSS at 4 AM, and that magical moment at 6 AM when everything finally clicked. The sunrise had never looked more beautiful.

Launch day was pure adrenaline. We went live. Traffic started pouring in. Clients reached out. We weren't just a website anymore – we were a <em>platform</em>.

The fast-paced chaos taught me more than any textbook ever could. Every bug was a lesson. Every feature request was an opportunity. Every client feedback was gold.`,
        choices: [
          { text: "🛠️ What tech stack did you use?", chapter: "technical" },
          { text: "💪 Tell me about a challenge", chapter: "challenge" },
          { text: "📈 How did you grow?", chapter: "growth" },
        ],
      },
      enterprise: {
        content: `<strong>Chapter: Enterprise at Scale</strong>

Fortune 500 companies. Millions of users. Systems that can't afford to fail. This was a different beast entirely.

I learned that "scale" isn't just about handling traffic – it's about handling complexity. It's about building systems where a single line of code impacts thousands of users. Where performance isn't just nice-to-have; it's mission-critical.

Team collaboration at this level? Mind-blowing. Morning standups with teams across three continents. Code reviews that felt like masterclasses. Deployment pipelines so sophisticated they could deploy to production without breaking a sweat.

The pressure was intense, but so was the learning curve. I discovered that enterprise development isn't about moving fast – it's about moving <em>right</em>.`,
        choices: [
          { text: "🎯 What were the biggest challenges?", chapter: "challenge" },
          { text: "💻 Show me the tech", chapter: "technical" },
          { text: "🌱 How did this shape you?", chapter: "growth" },
        ],
      },
      technical: {
        content: `<strong>Chapter: The Tech Stack Chronicles</strong>

Let me take you behind the scenes of my technical arsenal.

<strong>Frontend Magic:</strong> React became my canvas. Every component a brushstroke. Every state management decision a strategic move. TypeScript added the safety net that let me code fearlessly.

<strong>Backend Power:</strong> Node.js for when speed matters. Python for when elegance matters. Both for when everything matters. RESTful APIs that felt more like conversations than contracts.

<strong>Database Decisions:</strong> MongoDB for flexibility. PostgreSQL for reliability. Redis for that lightning-fast performance that makes users smile.

<strong>The Cloud:</strong> AWS taught me infrastructure. Docker taught me consistency. CI/CD taught me confidence.

But here's the secret – technology is just a tool. The real magic? Knowing which tool to use when, and why.`,
        choices: [
          { text: "🚀 Show me a project", chapter: "startup" },
          { text: "💡 How do you choose technologies?", chapter: "growth" },
          { text: `🎯 What's next for you?`, chapter: "challenge" },
        ],
      },
      challenge: {
        content: `<strong>Chapter: The 3 AM Debugging Session</strong>

Picture this: Production is down. Users are calling. The clock shows 3 AM. And I'm staring at error logs that make absolutely no sense.

This was the Ridge Sports platform. We'd just launched a major feature. Everything worked perfectly in testing. Until it didn't.

<em>The bug:</em> Random timeouts. No pattern. No consistency. Just chaos.

<strong>Hour 1:</strong> Check the obvious. Restart services. Clear caches. Nothing.
<strong>Hour 2:</strong> Dive into logs. Millions of lines. Start pattern matching.
<strong>Hour 3:</strong> Find it. A race condition so subtle, it only appeared under specific load patterns.
<strong>Hour 4:</strong> Fix implemented. Tests written. Deployed.
<strong>Hour 5:</strong> Monitoring. Holding breath. And... success.

That sunrise coffee never tasted better. The lesson? Sometimes the hardest bugs teach you the most valuable lessons about system design.`,
        choices: [
          { text: "📚 What did you learn?", chapter: "growth" },
          { text: "🛠️ Show me your tech approach", chapter: "technical" },
          { text: "🎉 Tell me about successes", chapter: "startup" },
        ],
      },
      growth: {
        content: `<strong>Chapter: Evolution of a Developer</strong>

Ten years. Hundreds of projects. Thousands of commits. Millions of lines of code.

<strong>Year 0-2:</strong> The Eager Learner
"I can build anything!" (Spoiler: I couldn't, but the confidence was cute)
Learning syntax. Breaking things. Fixing things. Repeat.

<strong>Year 3-5:</strong> The Problem Solver
Wait, it's not about the code? It's about solving problems?
Understanding users. Business logic. Architecture decisions.

<strong>Year 6-8:</strong> The Mentor
Teaching juniors. Code reviews. Discovering that explaining code makes you understand it better.

<strong>Year 9-10+:</strong> The Architect
Seeing the big picture. System design. Scalability. Long-term thinking.

But here's what I've really learned: <em>The best developers never stop being students.</em>

Every project teaches something new. Every bug is a lesson. Every code review is an opportunity to grow.`,
        choices: [
          { text: "💼 Let's talk opportunities", chapter: "contact" },
          { text: "🔄 Start over", chapter: "start" },
          { text: "📊 See my projects", chapter: "work" },
        ],
      },
      contact: {
        content: `<strong>Ready to Connect?</strong>

Thank you for journeying through my story! I hope you got a sense of my passion for building great software and solving complex problems.

<strong>Let's talk about:</strong>
• Your next big project
• Technical challenges you're facing
• Opportunities for collaboration
• Or just tech in general!

<strong>Reach me at:</strong>
📧 lakshmivseelam@gmail.com
📱 (+91) 9029272122
📍 Hyderabad, India

I'm always excited to hear about new challenges and opportunities. Whether it's a startup that needs to move fast or an enterprise that needs to scale smart, let's build something amazing together!`,
        choices: [
          { text: "💬 Chat with AI Me", chapter: "chat" },
          { text: "📊 View My Work", chapter: "work" },
          { text: "🔄 Restart Story", chapter: "start" },
        ],
      },
    };

    this.loadStory(staticStories["start"]);
    this.updateProgress(1);
  }

  async loadStory(storyData) {
    const contentDiv = document.getElementById("story-content");

    if (!contentDiv) return;

    // Show loader
    contentDiv.innerHTML = `
      <div class="story-loader">
        <div class="loader-spinner"></div>
        <p>Loading chapter...</p>
      </div>
    `;

    // Simulate loading for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create story card
    const storyCard = document.createElement("div");
    storyCard.className = "story-card fade-in";
    storyCard.innerHTML = `
      <div class="story-text">
        ${storyData.content.replace(/\n/g, "<br><br>")}
      </div>
      <div class="story-choices">
        ${storyData.choices
          .map(
            (choice, index) => `
          <button class="story-choice-btn" data-chapter="${choice.chapter}" data-index="${index}">
            ${choice.text}
          </button>
        `
          )
          .join("")}
      </div>
    `;

    contentDiv.innerHTML = "";
    contentDiv.appendChild(storyCard);

    // Attach click handlers
    const choiceBtns = contentDiv.querySelectorAll(".story-choice-btn");
    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.handleChoice(btn.dataset.chapter));
    });

    // Scroll to story
    setTimeout(() => {
      document.getElementById("story")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  async handleChoice(chapter) {
    // Special cases
    if (chapter === "chat") {
      document.getElementById("chat-toggle-btn")?.click();
      return;
    }

    if (chapter === "work") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    this.currentChapter = chapter;
    this.storyHistory.push(chapter);
    this.updateProgress(this.storyHistory.length + 1);

    // Try to load from API
    await this.loadFromAPI(chapter);
  }

  async loadFromAPI(chapterId) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chapterId,
          userChoice: this.storyHistory[this.storyHistory.length - 1],
        }),
      });

      const data = await response.json();

      if (data.success && data.content) {
        const storyData = {
          content: data.content,
          choices: (data.nextChoices || []).map((choice) => ({
            text: choice,
            chapter: "dynamic",
          })),
        };
        this.loadStory(storyData);
      } else {
        // Fallback to loading initial story
        this.loadInitialStory();
      }
    } catch (error) {
      console.error("Story API error:", error);
      // Fallback to static story
      this.loadInitialStory();
    }
  }

  updateProgress(chapterNum) {
    const countSpan = document.getElementById("chapter-count");
    const progressFill = document.querySelector(".progress-fill");

    if (countSpan) countSpan.textContent = chapterNum;
    if (progressFill) {
      const percentage = Math.min((chapterNum / 8) * 100, 100);
      progressFill.style.width = `${percentage}%`;
    }
  }
}

// Initialize story when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new InteractiveStory());
} else {
  new InteractiveStory();
}
