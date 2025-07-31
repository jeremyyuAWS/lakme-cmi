import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Sparkles, TrendingUp, Search, AlertTriangle } from "lucide-react";

export function ConversationalAgentTab() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: "user" | "ai";
    content: string;
    timestamp: Date;
    suggestions?: string[];
    charts?: any[];
  }>>([
    {
      id: "1",
      sender: "ai",
      content: "Hello! I'm your Lakmé CMI & R&D Intelligence Assistant. I can help you with insights about consumer trends, ingredient analysis, competitor intelligence, and market research. What would you like to explore today?",
      timestamp: new Date(Date.now() - 30000),
      suggestions: [
        "Why are there negative reviews around Lakmé 9to5 primer?",
        "Is there a rise in refillable packaging launches in India?",
        "Show me consumer complaints on serums from the past 4 weeks",
        "Compare consumer sentiment on Lakmé vs Maybelline serums"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleResponses = {
    "9to5 primer": {
      content: `Based on my analysis of customer reviews and feedback across Nykaa, Amazon, and Flipkart, here are the key issues with Lakmé 9to5 Primer:

**Main Complaints (156 mentions in past 4 weeks):**
• **Dryness**: 67% of complaints mention the primer becoming dry and flaky after 4 hours
• **Skin Type Issues**: Particularly problematic for combination skin (45% of dry skin complaints)
• **Application**: Some users report it pills when applied over moisturizer

**Sentiment Analysis:**
• Overall rating dropped from 4.2 to 3.8 stars over 6 months
• Positive mentions focus on longevity and oil control
• Negative sentiment peaked around "dryness" and "flaking"

**Recommendations:**
1. Consider reformulating with hydrating agents like hyaluronic acid
2. Develop a gel-based variant for combination skin
3. Improve application instructions for better layering`,
      suggestions: [
        "What ingredients could solve the dryness issue?",
        "Show me competitor primers that don't have this problem",
        "What's the cost impact of reformulation?"
      ]
    },
    "refillable packaging": {
      content: `Yes, there's been a significant surge in refillable packaging launches in the Indian beauty market:

**Key Trends:**
• **45% increase** in refillable packaging mentions over past 6 months
• **Maybelline** recently launched refillable lipsticks (₹850 base + ₹450 refills)
• **L'Oréal** testing refillable foundation compacts in metro cities
• **Nykaa** introduced refillable house brand products

**Consumer Response:**
• **68% driven by Gen Z** consumers (age 18-25)
• Willingness to pay **15-20% premium** for sustainable options
• Top motivations: environmental concern (78%), cost savings over time (45%)

**Market Opportunity:**
• Estimated ₹2,400 crore sustainable beauty market by 2025
• Premium segment showing highest adoption rates

**Action Items:**
1. Evaluate refillable packaging for Absolute range
2. Partner with eco-packaging suppliers
3. Pilot test in Delhi/Mumbai markets first`,
      suggestions: [
        "What's the cost analysis for refillable vs traditional packaging?",
        "Which Lakmé products are best suited for refillable format?",
        "Show me competitor pricing strategies for refillables"
      ]
    },
    "serum complaints": {
      content: `Here's a comprehensive analysis of serum-related complaints from the past 4 weeks:

**Overall Landscape (2,847 mentions analyzed):**

**Top Complaint Categories:**
1. **Texture Issues** (34%): "too sticky", "doesn't absorb", "pills under makeup"
2. **Efficacy Concerns** (28%): "no visible results after 6 weeks", "breakouts increased"
3. **Packaging Problems** (21%): "dropper doesn't work properly", "product oxidizes quickly"
4. **Pricing Concerns** (17%): "too expensive for quantity", "better alternatives available"

**Brand Breakdown:**
• **Lakmé Absolute Argan Oil Serum**: 234 complaints (mainly texture and absorption)
• **Plum Niacinamide**: 189 complaints (packaging and dropper issues)  
• **Minimalist Vitamin C**: 156 complaints (oxidation and efficacy)
• **The Ordinary Hyaluronic**: 143 complaints (availability and pricing)

**Demographic Insights:**
• Age 22-28: Most vocal about efficacy expectations
• Combination skin types: Highest complaint rate (40% higher than others)
• Metro cities showing 2.3x more serum complaints than tier-2 cities

**Opportunity Areas:**
1. Focus on fast-absorbing, lightweight textures
2. Improve packaging with better dispensing mechanisms
3. Clear communication about realistic timelines for results`,
      suggestions: [
        "What serum formulations are trending positively?",
        "How do our serum complaints compare to competitors?",
        "What's the ideal price point for serums in Indian market?"
      ]
    },
    "sentiment comparison": {
      content: `Here's a detailed sentiment comparison between Lakmé and Maybelline serums over the past 30 days:

**Overall Sentiment Scores:**
• **Lakmé Serums**: 3.6/5 (down from 3.8 last month)
• **Maybelline Serums**: 4.1/5 (stable)

**Lakmé Strengths:**
✅ **Price Point**: 73% mention "affordable" or "value for money"
✅ **Availability**: Easy to find in tier-2/3 cities
✅ **Brand Trust**: 68% mention "trusted Indian brand"

**Lakmé Challenges:**
❌ **Texture**: 45% complaints about "thick/sticky" consistency
❌ **Results Timeline**: Consumers expect faster results
❌ **Ingredient Transparency**: Requests for cleaner ingredient lists

**Maybelline Advantages:**
✅ **Texture**: 78% positive mentions for "lightweight feel"
✅ **Packaging**: Premium look and functionality
✅ **Instant Results**: Better immediate skin feel

**Maybelline Weaknesses:**
❌ **Price**: 52% mention "expensive" 
❌ **Availability**: Limited in smaller cities
❌ **Skin Sensitivity**: 23% report irritation issues

**Key Insights:**
1. Lakmé has trust and accessibility advantage
2. Maybelline leads in product experience and immediate satisfaction
3. Opportunity for Lakmé: Improve texture while maintaining price advantage

**Strategic Recommendations:**
• Reformulate for lighter, fast-absorbing textures
• Enhance packaging premium-ness perception
• Communicate ingredient benefits more clearly`,
      suggestions: [
        "What ingredients make Maybelline serums feel lighter?",
        "How can we improve Lakmé's texture without increasing cost?",
        "Show me successful texture innovations in Indian market"
      ]
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user" as const,
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      let aiResponse;
      
      // Simple keyword matching for demo responses
      if (text.toLowerCase().includes("9to5") && text.toLowerCase().includes("primer")) {
        aiResponse = sampleResponses["9to5 primer"];
      } else if (text.toLowerCase().includes("refillable")) {
        aiResponse = sampleResponses["refillable packaging"];
      } else if (text.toLowerCase().includes("serum") && text.toLowerCase().includes("complaints")) {
        aiResponse = sampleResponses["serum complaints"];
      } else if (text.toLowerCase().includes("sentiment") && text.toLowerCase().includes("maybelline")) {
        aiResponse = sampleResponses["sentiment comparison"];
      } else {
        // Default response
        aiResponse = {
          content: `I understand you're asking about "${text}". Let me analyze the latest market data and consumer insights to provide you with actionable intelligence.

Based on current trends and consumer behavior patterns, I can help you with:

• **Consumer Sentiment Analysis** - Real-time feedback from social media and review platforms
• **Ingredient Trends** - What's gaining traction in beauty formulations
• **Competitor Intelligence** - Latest launches and market positioning
• **Regulatory Updates** - FSSAI guidelines and compliance requirements
• **Pain Point Analysis** - Common consumer complaints and unmet needs

Could you be more specific about what aspect you'd like me to focus on?`,
          suggestions: [
            "Analyze trending ingredients this month",
            "Show me competitor launches in skincare",
            "What are consumers saying about sustainable beauty?",
            "Compare our foundation range with market leaders"
          ]
        };
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai" as const,
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-purple-900 mb-2 flex items-center gap-2">
              💬 Conversational AI Agent
              <Badge className="bg-green-100 text-green-800">
                <Sparkles className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </h2>
            <p className="text-purple-700">Ask me anything about beauty trends, consumer insights, and market intelligence</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-700">Response Time</div>
            <div className="text-xl font-bold text-purple-900">&lt; 3s avg</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Assistant Chat
              </CardTitle>
              <CardDescription>
                Real-time insights from beauty market intelligence
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[400px] pr-2">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "ai" 
                        ? "bg-purple-100 text-purple-600" 
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {message.sender === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div className={`flex-1 max-w-[75%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                      <div className={`rounded-lg p-3 ${
                        message.sender === "ai"
                          ? "bg-gray-50 text-gray-900"
                          : "bg-blue-600 text-white"
                      }`}>
                        <div className="whitespace-pre-wrap text-sm break-words">{message.content}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.sender === "ai" && (
                        <div className="mt-3 space-y-2">
                          <div className="text-xs text-gray-600 font-medium">Suggested follow-ups:</div>
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left text-xs p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-700 break-words"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about trends, ingredients, competitors, or consumer insights..."
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button
                  onClick={() => handleSuggestionClick("What are the top trending ingredients this week?")}
                  className="w-full text-left p-3 bg-blue-50 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                >
                  <div className="font-medium">Top Trending Ingredients</div>
                  <div className="text-gray-600">Niacinamide, Vitamin C, Retinol</div>
                </button>
                
                <button
                  onClick={() => handleSuggestionClick("Show me competitor launches this month")}
                  className="w-full text-left p-3 bg-green-50 rounded-lg text-sm hover:bg-green-100 transition-colors"
                >
                  <div className="font-medium">New Competitor Launches</div>
                  <div className="text-gray-600">3 new products detected</div>
                </button>
                
                <button
                  onClick={() => handleSuggestionClick("What regulatory alerts do I need to know?")}
                  className="w-full text-left p-3 bg-yellow-50 rounded-lg text-sm hover:bg-yellow-100 transition-colors"
                >
                  <div className="font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Regulatory Alerts
                  </div>
                  <div className="text-gray-600">2 new FSSAI updates</div>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Queries</CardTitle>
              <CardDescription>
                Try these example questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Why are there negative reviews around Lakmé 9to5 primer?",
                  "Compare Lakmé vs Maybelline serum sentiment",
                  "Show me refillable packaging trends in India",
                  "What ingredients are causing consumer complaints?",
                  "Analyze competitor pricing strategies"
                ].map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(query)}
                    className="w-full text-left p-2 text-xs bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}