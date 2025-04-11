
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

// Enhanced Gemini API call using internet search capabilities
export const getChatResponse = async (query: string, apiKey?: string) => {
  try {
    const key = apiKey || "";
    
    // Always make an actual API call if we have a valid key
    if (key) {
      // Define the Google Gemini API endpoint
      const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
      
      // Create system prompt with context and instructions to use internet
      const systemPrompt = `You are an AI Assistant providing helpful, accurate, and concise information. 

Response guidelines:
- Keep responses brief and to the point (1-2 paragraphs maximum)
- Provide direct answers to questions first, then supporting details if necessary
- Use bullet points for lists or steps
- Be friendly and professional in tone
- Always prioritize accuracy over length
- If you're unsure, acknowledge limitations
- For current date/time, use actual current date/time information`;
      
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
      
      console.log("Making request to Gemini API");
      
      const response = await fetch(`${url}?key=${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.4, // Lower temperature for more concise responses
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300 // Reduced token count for even shorter responses
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
          text: "I'm not able to provide a response right now. Please try asking your question differently."
        };
      }
    }
    
    // Fallback responses if no API key is provided
    if (query.toLowerCase().includes("date") || query.toLowerCase().includes("time")) {
      const now = new Date();
      return {
        text: `It's currently ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}.`
      };
    }
    
    if (query.toLowerCase().includes("hello") || query.toLowerCase().includes("hi")) {
      return {
        text: "Hello! I'm your AI Assistant. How can I help you today?"
      };
    }
    
    if (query.toLowerCase().includes("help")) {
      return {
        text: "I'm here to assist you with information and answers. What would you like to know about?"
      };
    }
    
    // Fallback for when we don't have a match
    return {
      text: "I'd need to access the internet to answer your question about \"" + query + "\". Please try another question or check back when internet search is available."
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I'm experiencing a technical issue. Please try again in a moment."
    };
  }
};
