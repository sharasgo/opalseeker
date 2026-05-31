import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini client lazily to avoid crashing if API key is not yet set
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
You are the Resident Master Gemologist and AI Opal Specialist for "Elite Australian Opals Boutique" (or Outback Fire).
Your role is to guide, educate, and assist discerning collectors looking to buy premium Australian opals online.
You are extremely professional, warm, and speak with high-end luxury charm and absolute scientific accuracy regarding gemology.

Key Australian Opal fields reference:
- Lightning Ridge (NSW): Renowned for the prestigious Black Opal (Body tones N1-N4).
- Queensland Fields (Winton, Quilpie): Sourced for gorgeous Boulder Opals embedded in ironstone backing.
- Coober Pedy (SA): Sourced for exquisite translucent Crystal and White Opals.

Opal Grading Standards:
1. Type: Black, Boulder, Crystal, White, or Semi-Black.
2. Body Tone: N1 (jet black, highest value) to N9 (milky-white, softer value).
3. Brightness: Rated from B1 (exceptional / blinding) to B5 (faint).
4. Major Patterns: Harlequin (rarest, blocky), Pinfire, Floral, Ribbon, Straw, Chinese Writing.
5. Play-of-Color spectrum: Red-fire (rarest & highest value due to larger silica spheres), Orange, Green, Blue.

When the user asks for recommendations, budget advice, or care tips (e.g., using pure warm water, avoiding ultrasonic cleaners), respond like an expert boutique jeweler.
Keep your responses beautiful, informative, formatted with clean Markdown, and highly personal. Include authentic Australian gemologist personality.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages, appraisalData } = await req.json();
    const client = getGeminiClient();

    // If it's a structural appraisal request
    if (appraisalData) {
      const { type, weight, bodyTone, brightness, baseColor, pattern } = appraisalData;
      const appraisalPrompt = `
Generate an Official Gemological Appraisal Certification Draft and Value Estimate based on these characteristics:
- Opal Type: ${type}
- Carat Weight: ${weight} cts
- Body Tone: ${bodyTone}
- Brightness Rate: ${brightness}
- Primary Base Color: ${baseColor}
- Flash Pattern: ${pattern || "Mixed flash"}

Please structure your response with:
1. **OFFICIAL GEMOLOGICAL ASSESSMENT**: Describe the stone's rare attributes and how its pattern and play-of-color react under professional boutique lighting.
2. **ESTIMATED VALUE RANGE (AUD & USD)**: Based on typical market rates for Australian opals (B1/N1/Red can range from $5,000 to $15,000+ per carat; Crystal B1 can be $1,000-$3,000/ct; Boulder can be $800-$4,000/ct; and B3/B4 light tone can be lower $200-$600/ct). Keep prices refined, realistic, and specify the appraisal factors.
3. **COLLECTOR INVESTMENT OUTLOOK**: A short professional recommendation on its rarity and care advice.
`;

      const response = await client.models.generateContent({
        model: "gemini-1.5-flash",
        contents: appraisalPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      return NextResponse.json({ text: response.text });
    }

    // Otherwise, it's a conversational chat
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Format chat history for Gemini API
    // We will map role to 'user' or 'model'
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred with our AI Appraisal Network." },
      { status: 500 }
    );
  }
}
