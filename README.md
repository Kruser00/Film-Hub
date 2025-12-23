# FilmHub (فیلم هاب) - AI Powered Movie Database

FilmHub is a fully automated, client-side movie database application tailored for Persian (Farsi) speakers. It combines real-time data from **TMDB (The Movie Database)** with the generative power of **Google Gemini 2.0 AI** to create unique, localized content and reviews.

## 🚀 Features

*   **Hybrid Data Engine:** Fetches hard data (Cast, Year, Poster) from TMDB and enriches it with AI-generated Farsi reviews and summaries.
*   **Smart Localization:** Automatically translates and culturally adapts movie overviews.
*   **Client-Side Architecture:** Built with React 19 and Vite, running entirely in the browser with no backend server required.
*   **Virtual Admin:** An automated "bot" that simulates indexing movies to populate the database over time.
*   **Watchlist:** LocalStorage-based persistence for user favorites.

## 🛠 Tech Stack

*   **Framework:** React 19 + TypeScript + Vite
*   **Styling:** Tailwind CSS (CDN)
*   **AI Model:** Google Gemini 2.0 Flash Exp (@google/genai)
*   **Data Source:** TMDB API

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/filmhub.git
    cd filmhub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your Google Gemini API Key:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  **Crucial:** Add `API_KEY` to the **Environment Variables** section in Vercel settings.
4.  Deploy!

---
*Powered by Google Gemini & TMDB*
