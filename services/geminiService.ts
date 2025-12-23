import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Movie } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function takes raw English data from TMDB and "Iranian-izes" it
export async function enrichMovieWithGemini(partialMovie: Partial<Movie>): Promise<Movie> {
  const modelId = "gemini-2.0-flash-exp";

  const prompt = `
  I have a movie with the following details:
  Title: "${partialMovie.originalTitle}"
  Overview: "${partialMovie.overview}"
  Rating: ${partialMovie.voteAverage}

  Act as a professional Iranian film critic for "FilmHub".
  Task:
  1. Translate the Title to Farsi (only if it has a common Farsi name, otherwise transliterate or keep it).
  2. Translate/Rewrite the Overview to Farsi. It should be engaging, not a robotic translation.
  3. Write a short "Review" HTML block (approx 150 words). Include styling tags like <b>, <p>. Mention the acting or plot.
  4. Provide a "Why Watch" one-liner.
  5. Give 3 single-word "Mood" tags in Farsi (e.g., ترسناک, غمگین, هیجانی).

  Output JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            faTitle: { type: Type.STRING },
            faOverview: { type: Type.STRING },
            reviewHtml: { type: Type.STRING },
            whyWatch: { type: Type.STRING },
            moods: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["faTitle", "faOverview", "reviewHtml", "whyWatch", "moods"]
        } as Schema
      }
    });

    const aiData = JSON.parse(response.text || "{}");

    return {
      ...partialMovie,
      title: aiData.faTitle || partialMovie.originalTitle || "بدون عنوان",
      overview: aiData.faOverview || "توضیحات در دسترس نیست",
      review: aiData.reviewHtml || "<p>نقد و بررسی توسط هوش مصنوعی در حال تولید است...</p>",
      aiAnalysis: {
        mood: aiData.moods || [],
        whyWatch: aiData.whyWatch || "ارزش دیدن دارد."
      },
      // Ensure required fields are present to satisfy TS
      id: partialMovie.id!,
      posterPath: partialMovie.posterPath || "",
      backdropPath: partialMovie.backdropPath || "",
      releaseDate: partialMovie.releaseDate || "",
      voteAverage: partialMovie.voteAverage || 0,
      genres: partialMovie.genres || [],
    } as Movie;

  } catch (error: any) {
    console.error("Gemini Enrichment Failed:", error);
    throw new Error(error.message);
  }
}