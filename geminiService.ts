
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Initializing GoogleGenAI using only process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const suggestRecipesFromIngredients = async (ingredients: string[]) => {
  const prompt = `Com base nos seguintes ingredientes disponíveis: ${ingredients.join(', ')}, sugira 3 nomes de receitas criativas e seus tipos (Doce, Salgado, Fitness, Vegetariano, Rápido).`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              type: { type: Type.STRING },
              reason: { type: Type.STRING, description: "Por que essa receita combina com os ingredientes?" }
            },
            required: ["title", "type", "reason"]
          }
        }
      }
    });

    // Fixed: response.text is a getter, used correctly.
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getNutritionalEstimation = async (recipeTitle: string, ingredients: string[]) => {
  const prompt = `Estime as informações nutricionais para a receita "${recipeTitle}" com estes ingredientes: ${ingredients.join(', ')}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calories: { type: Type.STRING },
            protein: { type: Type.STRING },
            carbs: { type: Type.STRING },
            fat: { type: Type.STRING }
          },
          required: ["calories", "protein", "carbs", "fat"]
        }
      }
    });

    // Fixed: response.text is a getter, used correctly.
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Nutrition Error:", error);
    return null;
  }
};
