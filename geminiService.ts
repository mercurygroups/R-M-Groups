
import { GoogleGenAI } from "@google/genai";
import { COMPANY_DETAILS } from "./constants";

// Initialize Gemini AI with API key
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

export const getTravelAdvice = async (userPrompt: string) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create the prompt with system context
    const prompt = `You are the R&M Groups Travel Assistant. 
Company Name: ${COMPANY_DETAILS.name}. 
Services provided: Flights (Domestic/Intl), Passports, Insurance, Visas (Tour/Conf), Private Jets, Luxury Cars/Buses (Interstate Nigeria), Urban Delivery Bikes (Lagos, PH, Abuja).
Phone: ${COMPANY_DETAILS.phone}. Email: ${COMPANY_DETAILS.email}.
Always be professional, helpful, and encourage users to contact us directly via WhatsApp or Phone for bookings.
Refer to R&M Groups in your responses.

User question: ${userPrompt}`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "I'm sorry, I couldn't process that. Please contact R&M Groups support.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI assistant is currently taking a short break. Please reach out to us at " + COMPANY_DETAILS.phone;
  }
};
