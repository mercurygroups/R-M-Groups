
import { GoogleGenAI } from "@google/genai";
import { COMPANY_DETAILS } from "./constants";

// @google/genai Coding Guidelines: Initialization MUST use exactly the named parameter format and API key from process.env.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getTravelAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the R&M Groups Travel Assistant. 
        Company Name: ${COMPANY_DETAILS.name}. 
        Services provided: Flights (Domestic/Intl), Passports, Insurance, Visas (Tour/Conf), Private Jets, Luxury Cars/Buses (Interstate Nigeria), Urban Delivery Bikes (Lagos, PH, Abuja).
        Phone: ${COMPANY_DETAILS.phone}. Email: ${COMPANY_DETAILS.email}.
        Always be professional, helpful, and encourage users to contact us directly via WhatsApp or Phone for bookings.
        Refer to R&M Groups in your responses.`,
        temperature: 0.7,
      },
    });

    // @google/genai Coding Guidelines: Use the .text() method on the response object.
    return response.text() || "I'm sorry, I couldn't process that. Please contact R&M Groups support.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI assistant is currently taking a short break. Please reach out to us at " + COMPANY_DETAILS.phone;
  }
};
