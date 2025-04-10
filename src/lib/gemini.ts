
// We'll use Google's Gemini API for generating responses

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

// Sample product data (would be fetched from actual database/API)
const sampleProducts = [
  {
    id: "phone1",
    name: "iPhone Pro Max",
    price: 999,
    description: "The latest smartphone with advanced AI capabilities and 5G connectivity.",
    category: "mobile"
  },
  {
    id: "laptop1",
    name: "MacBook Air",
    price: 1299,
    description: "Ultra-lightweight laptop with powerful processing and all-day battery life.",
    category: "laptop"
  }
];

// Sample policies (to be expanded)
const companyPolicies = {
  refund: "Zithara offers a 30-day money-back guarantee on all products. Returns must be in original packaging.",
  shipping: "Free shipping on orders over $50. Standard delivery takes 3-5 business days.",
  warranty: "All Zithara products come with a 1-year limited warranty covering manufacturing defects.",
  privacy: "Zithara respects user privacy and only collects necessary data. See our privacy policy for details."
};

// Function to generate context from query
const generateContext = (query: string) => {
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();
  let context = "";
  
  // Check if query is about products
  if (
    lowerQuery.includes("phone") || 
    lowerQuery.includes("mobile") || 
    lowerQuery.includes("smartphone")
  ) {
    const phoneProducts = sampleProducts.filter(p => p.category === "mobile");
    context += "Product information: " + JSON.stringify(phoneProducts);
  }
  
  if (
    lowerQuery.includes("laptop") || 
    lowerQuery.includes("computer") || 
    lowerQuery.includes("notebook")
  ) {
    const laptopProducts = sampleProducts.filter(p => p.category === "laptop");
    context += "Product information: " + JSON.stringify(laptopProducts);
  }
  
  // Check if query is about policies
  if (
    lowerQuery.includes("refund") || 
    lowerQuery.includes("return") || 
    lowerQuery.includes("money back")
  ) {
    context += "Refund policy: " + companyPolicies.refund;
  }
  
  if (
    lowerQuery.includes("shipping") || 
    lowerQuery.includes("delivery") || 
    lowerQuery.includes("order status")
  ) {
    context += "Shipping policy: " + companyPolicies.shipping;
  }
  
  if (
    lowerQuery.includes("warranty") || 
    lowerQuery.includes("guarantee") || 
    lowerQuery.includes("repair")
  ) {
    context += "Warranty information: " + companyPolicies.warranty;
  }
  
  if (
    lowerQuery.includes("privacy") || 
    lowerQuery.includes("data") || 
    lowerQuery.includes("information")
  ) {
    context += "Privacy policy: " + companyPolicies.privacy;
  }
  
  return context;
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
      const systemPrompt = `You are a helpful AI assistant for Zithara.ai. Provide concise, accurate information about products, refunds, shipping, and company policies. 
      Use a professional, friendly tone. If you're unsure about something, use your internet search capability to find the answer.
      For current date or time questions, use the actual current date/time.
      For company related information, focus on:
      ${generateContext(query)}
      
      When searching the internet for information, confirm that the information is accurate and up-to-date. 
      Search for the most relevant results before answering.`;
      
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
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
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
          text: "I apologize, but I couldn't generate a response. Please try asking your question differently."
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
        text: "Hello! Welcome to Zithara customer support. How can I help you today?"
      };
    }
    
    if (query.toLowerCase().includes("help")) {
      return {
        text: "I'm here to help! I can provide information about our products, answer questions about orders, shipping, returns, and company policies. What would you like to know about?"
      };
    }
    
    if (query.toLowerCase().includes("store policy") || query.toLowerCase().includes("policies")) {
      return {
        text: "Zithara offers a 30-day money-back guarantee on all products. Returns must be in original packaging. We also provide free shipping on orders over $50, with standard delivery taking 3-5 business days. All our products come with a 1-year limited warranty covering manufacturing defects. Would you like more specific information about any of these policies?"
      };
    }
    
    if (query.toLowerCase().includes("offers") || query.toLowerCase().includes("promotions") || query.toLowerCase().includes("discount")) {
      return {
        text: "We currently have several promotions running! These include 15% off all smartphones when you trade in your old device, free premium headphones with any laptop purchase, and a buy-one-get-one 50% off deal on all accessories. Would you like more details about any specific offer?"
      };
    }
    
    if (query.toLowerCase().includes("laptop") || query.toLowerCase().includes("macbook")) {
      return {
        text: "We have the MacBook Air available for $1299. It's an ultra-lightweight laptop with powerful processing and all-day battery life. Features include a stunning Retina display, the latest M2 chip, and up to 18 hours of battery life. Would you like more details about specifications, available configurations, or accessories?"
      };
    }
    
    // Generate context-aware responses based on our sample data
    const context = generateContext(query);
    if (context) {
      if (query.toLowerCase().includes("phone") || query.toLowerCase().includes("mobile")) {
        return {
          text: "I found the iPhone Pro Max which costs $999. It's our latest smartphone with advanced AI capabilities and 5G connectivity. Features include a 6.7-inch Super Retina XDR display, the A16 Bionic chip, a professional camera system with 48MP main camera, and all-day battery life. Would you like more details about this product?"
        };
      }
    }
    
    // Fallback for when we don't have a match
    return {
      text: `I understand you're asking about "${query}". To provide you with the most accurate and up-to-date information, I'd need to access the internet. Please try again later when internet search is available, or ask about our products, return policy, shipping information, or other store policies that I can help with directly.`
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I apologize, but I encountered an error processing your request. Please try again later or contact our customer support team."
    };
  }
};
