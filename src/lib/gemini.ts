
// We'll use Google's Gemini API for generating responses
// This is a placeholder implementation until you provide the actual API key

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

// This is a placeholder - replace with actual Gemini API call
export const getChatResponse = async (query: string, apiKey: string) => {
  try {
    // For now, we'll create a simulated response
    // In a real implementation, you would make an API call to Gemini

    // Check if we have a proper API key
    if (!apiKey || apiKey === "AIzaSyD1lQqLhc9afbc6MXEDF1u73Wx-uaOqP9M") {
      // Generate context-aware responses without API
      const context = generateContext(query);
      
      if (context) {
        // Use context to generate a meaningful response
        if (query.toLowerCase().includes("phone") || query.toLowerCase().includes("mobile")) {
          return {
            text: "I found the Phone Pro Max which costs $999. It's our latest smartphone with advanced AI capabilities and 5G connectivity. Would you like more details about this product?"
          };
        } else if (query.toLowerCase().includes("laptop")) {
          return {
            text: "We have the ZitharaBook Air available for $1299. It's an ultra-lightweight laptop with powerful processing and all-day battery life. Can I provide any specific information about it?"
          };
        } else if (query.toLowerCase().includes("refund") || query.toLowerCase().includes("return")) {
          return {
            text: "Zithara offers a 30-day money-back guarantee on all products. Returns must be in original packaging. Is there a specific product you're considering returning?"
          };
        } else if (query.toLowerCase().includes("shipping")) {
          return {
            text: "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days. Would you like to know the status of a specific order?"
          };
        }
      }
      
      // Default responses for common queries
      if (query.toLowerCase().includes("hello") || query.toLowerCase().includes("hi")) {
        return {
          text: "Hello! Welcome to Zithara customer support. How can I help you today?"
        };
      } else if (query.toLowerCase().includes("help")) {
        return {
          text: "I'm here to help! I can provide information about our products, answer questions about orders, shipping, returns, and company policies. What would you like to know about?"
        };
      } else {
        return {
          text: "I understand you're asking about " + query + ". To provide the most accurate information, we'd need to connect to our product database. For now, I can tell you that Zithara offers cutting-edge technology products with a 30-day money-back guarantee and excellent customer support. How else can I assist you?"
        };
      }
    }

    // For when an actual API key is provided:
    // This is where you would implement the actual Gemini API call
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    // Create system prompt with context
    const context = generateContext(query);
    const systemPrompt = `You are a helpful AI assistant for Zithara.ai. Provide concise, accurate information about products, refunds, shipping, and company policies. Use a professional, friendly tone. If you're unsure about something, say that you need to check with a human representative. Here is relevant information to help you respond: ${context}`;
    
    const messages: GeminiMessage[] = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "user",
        parts: [{ text: query }]
      }
    ];
    
    const response = await fetch(`${url}?key=${apiKey}`, {
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
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json() as GeminiResponse;
    return {
      text: data.candidates[0]?.content.parts[0].text || "Sorry, I couldn't generate a response. Please try again."
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "I apologize, but I encountered an error processing your request. Please try again later or contact our customer support team."
    };
  }
};
