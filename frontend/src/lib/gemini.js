class GeminiAPI {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    this.baseUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  }

  async generateContent(prompt) {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I could not generate a response."
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I am currently unavailable. Please try again later.";
    }
  }
}

export const geminiAPI = new GeminiAPI();
