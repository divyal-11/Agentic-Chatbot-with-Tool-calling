# 🚀 Agentic AI Chatbot (Perplexity Clone)

A production-ready, full-stack AI chat interface with integrated **Agentic Tool Calling** and real-time web search. This project replicates the core functionality and clean UX of Perplexity.ai, combining the blazing-fast streaming of Llama-3 (via Groq) with autonomous web search capabilities (via Tavily).

## ✨ Core Features

*   **⚡ Blazing Fast Streaming:** Utilizes a custom POST-based `ReadableStream` architecture to stream AI responses in real-time, removing the limitations of basic GET EventSources.
*   **🌐 Autonomous Web Search:** The AI dynamically decides when to use the Tavily Search API to fetch real-time, up-to-date information before answering.
*   **🧠 Conversation Memory:** Built with LangGraph checkpointing to maintain deep contextual memory across the entire chat session.
*   **🛡️ Graceful Error Handling:** Backend is wrapped in robust `try/except` bounds, yielding structural error events to the frontend if rate limits are hit or APIs fail.
*   **💅 Premium Markdown UI:** Responses are dynamically rendered using `react-markdown` and Tailwind Typography, complete with syntax-highlighted code blocks, lists, and formatted text.
*   **📐 Clean Architecture:** The complex frontend streaming logic is entirely decoupled from the UI via a custom `useChatStream` React hook.

## 🏗️ Tech Stack

**Frontend:**
*   Next.js 15 (React 19)
*   Tailwind CSS v4 + Typography (`prose`)
*   Custom React Hooks
*   React-Markdown

**Backend:**
*   FastAPI (Python)
*   LangGraph (Stateful AI Workflow)
*   LangChain
*   Llama-3.3-70b (via Groq API)

**Deployment:**
*   **Frontend:** Vercel
*   **Backend:** Dockerized on Railway

---

## 🚀 Getting Started Locally

### Prerequisites
*   Node.js 18+
*   Python 3.10+
*   [Groq API key](https://console.groq.com/keys)
*   [Tavily API key](https://tavily.com/)

### 1. Clone & Setup Backend
```bash
git clone https://github.com/divyal-11/Agentic-Chatbot-with-Tool-calling.git
cd Agentic-Chatbot-with-Tool-calling/server

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `server` directory and add your keys:
```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Start the FastAPI server:
```bash
uvicorn app:app --reload
```
*(Server runs on `http://localhost:8000`)*

### 2. Setup Frontend
Open a new terminal window:
```bash
cd Agentic-Chatbot-with-Tool-calling/client

# Install dependencies
npm install

# Start the development server
npm run dev
```
*(Client runs on `http://localhost:3000`)*

---

## 🔍 How the Agentic Workflow Operates

1.  **Input:** User sends a query via the Next.js UI (`POST` request).
2.  **State Management:** LangGraph receives the query and checks the `checkpoint_id` to load previous conversation history into state.
3.  **LLM Routing:** Llama-3 evaluates the prompt and decides whether it has the knowledge to answer directly or if it requires real-time data.
4.  **Tool Execution:** If real-time data is needed, LangGraph pauses the LLM, triggers the `tavily_search_results_json` tool, and streams a "Searching the web" status event to the client.
5.  **Synthesis:** The search results are injected back into the LLM's context window.
6.  **Streaming:** The final synthesized answer is streamed token-by-token back to the client and rendered dynamically into Markdown.

---
*Built with modern full-stack best practices.*
