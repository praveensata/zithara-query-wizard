
// AI Assistant using Google's Gemini API

// Types for Gemini API
export interface GeminiMessage {
  role: "user" | "model";
  parts: {
    text: string;
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Function to generate context from query
const generateContext = (query: string) => {
  return "";
};

// Enhanced Gemini API call using internet search capabilities
export const getChatResponse = async (query: string, apiKey?: string) => {
  try {
    const key = apiKey || "";
    
    // Always make an actual API call if we have a valid key
    if (key) {
      // Define the Google Gemini API endpoint
      const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      
      // Create system prompt with context and instructions to use internet
      const systemPrompt = `You are a helpful AI assistant. Provide accurate, concise information on any topic. 
      Your answers should be brief and to the point - prefer 2-3 short paragraphs at most.
      Use a professional, friendly tone and informal language.
      
      For current date or time questions, use the actual current date/time.
      
      When searching the internet for information, confirm that the information is accurate and up-to-date.
      Search for the most relevant results before answering.
      
      Important guidelines:
      - Keep responses concise and to the point
      - Always prioritize accuracy over verbosity
      - Use simple language when possible
      - When appropriate, organize information with bullet points
      - Never make up information - if you don't know, say so`;
      
      // Prepare messages for the API call
      const messages = [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "user",
          parts: [{ text: query }]
        }
      ];
      
      console.log("Making request to Gemini API with key:", key);
      
      const response = await fetch(`${url}?key=${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.6,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800 // Limiting token count for more concise responses
          },
          // Enable internet search capability
          tools: [{
            googleSearch: {}
          }],
          safetySettings: [
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });
      
      if (!response.ok) {
        console.error("API response not OK:", response.status);
        const errorText = await response.text();
        console.error("API error details:", errorText);
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
            
        return {
          text: data.candidates[0].content.parts[0].text
        };
      } else {
        console.error("Unexpected API response format:", data);
        return {
          text: "I couldn't generate a response. Please try asking your question differently."
        };
      }
    }
    
    // Fallback responses if no API key is provided
    if (query.toLowerCase().includes("date") || query.toLowerCase().includes("time")) {
      const now = new Date();
      return {
        text: `Today's date is ${now.toLocaleDateString()} and the current time is ${now.toLocaleTimeString()}.`
      };
    }
    
    if (query.toLowerCase().includes("hello") || query.toLowerCase().includes("hi") || query.toLowerCase().includes("hlo") || query.toLowerCase().includes("hii")) {
      return {
        text: "Hello! How can I help you today?"
      };
    }
    
    if (query.toLowerCase().includes("help")) {
      return {
        text: "I'm here to help! I can answer questions on a wide range of topics, provide explanations, offer suggestions, or just chat. What would you like to know about?"
      };
    }
    
    // Fallback for when we don't have a match
    return {
      text: `I understand you're asking about "${query}". To provide you with the most accurate information, I'd need to access the internet. Please try again when internet search is available.`
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I apologize, but I encountered an error processing your request. Please try again later."
    };
  }
};
