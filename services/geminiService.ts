import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Initialize Gemini
// Note: In a real app, ensure process.env.API_KEY is defined.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getProductRecommendations = async (
  query: string,
  inventory: Product[],
  lang: 'he' | 'en'
): Promise<{ productIds: number[]; reasoning: string }> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    return { productIds: [], reasoning: lang === 'he' ? 'חסר מפתח API' : 'API Key missing' };
  }

  const inventoryString = JSON.stringify(
    inventory.map((p) => ({
      id: p.id,
      name: lang === 'he' ? p.name_he : p.name_en,
      description: lang === 'he' ? p.description_he : p.description_en,
      tags: [p.kosher ? 'kosher' : '', p.vegan ? 'vegan' : '', p.category].filter(Boolean),
    }))
  );

  const prompt = `
    You are a helpful sales assistant for an Israeli goods store named "Blue & Gold".
    
    User Query: "${query}"
    
    Current Inventory:
    ${inventoryString}
    
    Task:
    1. Analyze the user's query.
    2. Select suitable products from the inventory.
    3. Provide a short, friendly explanation (in ${lang === 'he' ? 'Hebrew' : 'English'}) why these fit.
    
    Return JSON format only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productIds: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER },
            },
            reasoning: {
              type: Type.STRING,
            },
          },
          required: ['productIds', 'reasoning'],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      productIds: [],
      reasoning: lang === 'he' 
        ? "מצטערים, הייתה בעיה בתקשורת עם המומחה שלנו." 
        : "Sorry, we had trouble connecting to our expert.",
    };
  }
};