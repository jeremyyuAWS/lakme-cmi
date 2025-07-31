import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Search, Filter, Tag, ArrowRight, Zap, Brain, GitBranch } from "lucide-react";

interface KnowledgeStructurerTabProps {
  insights: any[];
}

export function KnowledgeStructurerTab({ insights }: KnowledgeStructurerTabProps) {
  const [structuredData, setStructuredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBucket, setSelectedBucket] = useState("all");
  const [isProcessing, setIsProcessing] = useState(false);

  const buckets = [
    { id: "ingredient_buzz", name: "Ingredient Buzz", count: 23, color: "bg-green-100 text-green-800" },
    { id: "pain_point_clusters", name: "Pain Point Clusters", count: 18, color: "bg-red-100 text-red-800" },
    { id: "new_launch_watch", name: "New Launch Watch", count: 15, color: "bg-blue-100 text-blue-800" },
    { id: "packaging_trends", name: "Packaging Trends", count: 12, color: "bg-purple-100 text-purple-800" },
    { id: "regulatory_alerts", name: "Regulatory Alerts", count: 8, color: "bg-yellow-100 text-yellow-800" },
    { id: "competitor_moves", name: "Competitor Moves", count: 11, color: "bg-orange-100 text-orange-800" }
  ];

  const sampleStructuredData = [
    {
      id: 1,
      bucket: "ingredient_buzz",
      title: "Niacinamide Trend Analysis",
      summary: "Significant surge in niacinamide-related searches and product launches across beauty platforms",
      tags: ["niacinamide", "skincare", "acne", "pores"],
      confidence: 0.94,
      sources: ["Google Trends", "Instagram", "TikTok"],
      timestamp: "2024-01-15T10:30:00Z",
      keyInsights: [
        "450% increase in niacinamide searches over 6 months",
        "Top concern: acne and pore visibility",
        "Age group 18-25 showing highest interest"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Consider niacinamide variant for 9to5 range", "Research supplier partnerships"]
    },
    {
      id: 2,
      bucket: "pain_point_clusters",
      title: "Lakmé 9to5 Primer Dryness Issues",
      summary: "Clustered complaints about dryness and flaking with current primer formulation",
      tags: ["primer", "dryness", "flaking", "9to5", "formulation"],
      confidence: 0.87,
      sources: ["Nykaa", "Amazon", "Flipkart"],
      timestamp: "2024-01-15T09:15:00Z",
      keyInsights: [
        "156 complaints mentioning dryness in past 4 weeks",
        "Common issue: works well initially, dries out after 4 hours",
        "Particularly problematic for combination skin types"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Reformulate with hydrating agents", "Consider gel-based primer variant"]
    },
    {
      id: 3,
      bucket: "new_launch_watch",
      title: "Maybelline Refillable Lipstick Initiative",
      summary: "Competitor launched sustainable refillable lipstick line with strong market response",
      tags: ["sustainable", "refillable", "lipstick", "maybelline", "packaging"],
      confidence: 0.91,
      sources: ["Instagram", "TikTok", "Brand websites"],
      timestamp: "2024-01-15T08:45:00Z",
      keyInsights: [
        "1,234 mentions within 24 hours of launch",
        "Strong positive sentiment around sustainability",
        "Price point: ₹850 for refillable + ₹450 for refills"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Evaluate refillable packaging for Absolute range", "Analyze cost implications"]
    },
    {
      id: 4,
      bucket: "packaging_trends",
      title: "Sustainable Packaging Momentum",
      summary: "45% increase in sustainable packaging mentions across beauty conversations",
      tags: ["sustainable", "eco-friendly", "packaging", "environment"],
      confidence: 0.89,
      sources: ["Multiple platforms"],
      timestamp: "2024-01-15T07:20:00Z",
      keyInsights: [
        "Gen Z driving 68% of sustainability conversations",
        "Key terms: biodegradable, refillable, minimal packaging",
        "Willingness to pay 15-20% premium for sustainable options"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Develop sustainable packaging roadmap", "Partner with eco-packaging suppliers"]
    },
    {
      id: 5,
      bucket: "regulatory_alerts",
      title: "New FSSAI Guidelines on SPF Claims",
      summary: "FSSAI published updated guidelines requiring enhanced testing protocols for SPF claims in cosmetic products",
      tags: ["fssai", "spf", "sunscreen", "testing", "compliance"],
      confidence: 0.96,
      sources: ["FSSAI Database", "Regulatory Updates"],
      timestamp: "2024-01-15T12:20:00Z",
      keyInsights: [
        "All SPF products must undergo broad-spectrum testing",
        "New labeling requirements for water resistance claims",
        "Compliance deadline: March 2024 for new launches"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Audit all Lakmé sun protection products", "Update testing protocols", "Review marketing claims"]
    },
    {
      id: 6,
      bucket: "regulatory_alerts",
      title: "BIS Standards Update for Cosmetic Packaging",
      summary: "Bureau of Indian Standards introduces new requirements for cosmetic packaging safety and recyclability",
      tags: ["bis", "packaging", "safety", "recyclability", "standards"],
      confidence: 0.93,
      sources: ["BIS Official Portal", "Industry Publications"],
      timestamp: "2024-01-14T14:45:00Z",
      keyInsights: [
        "New plastic recycling codes mandatory from April 2024",
        "Enhanced safety testing for lip products packaging",
        "Sustainable packaging incentives announced"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Review Lakmé packaging compliance", "Source sustainable packaging materials", "Update product labels"]
    },
    {
      id: 7,
      bucket: "competitor_moves",
      title: "L'Oréal Launches AI-Powered Shade Matching",
      summary: "L'Oréal India introduces AR-based foundation shade matching technology across major retail outlets",
      tags: ["loreal", "technology", "shade-matching", "ar", "foundation"],
      confidence: 0.91,
      sources: ["Press Releases", "Retail Reports", "Beauty Media"],
      timestamp: "2024-01-13T16:30:00Z",
      keyInsights: [
        "Deployed across 200+ Nykaa stores nationwide",
        "25% increase in foundation sales reported in pilot stores",
        "Technology partnership with ModiFace"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Evaluate AR technology for Lakmé", "Assess customer response metrics", "Explore tech partnerships"]
    },
    {
      id: 8,
      bucket: "competitor_moves",
      title: "Maybelline Expands Refillable Range",
      summary: "Maybelline New York announces expansion of refillable products beyond lipsticks to include foundations and concealers",
      tags: ["maybelline", "refillable", "sustainable", "expansion", "packaging"],
      confidence: 0.89,
      sources: ["Brand Announcements", "Retail Intelligence", "Sustainability Reports"],
      timestamp: "2024-01-12T11:15:00Z",
      keyInsights: [
        "Refillable foundation launching in Mumbai and Delhi first",
        "30% cost savings for consumers on refills",
        "Partnership with recycling initiative for old compacts"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Fast-track Lakmé refillable product development", "Analyze pricing strategy", "Develop sustainability narrative"]
    },
    {
      id: 9,
      bucket: "competitor_moves",
      title: "Minimalist Enters Color Cosmetics",
      summary: "Skincare brand Minimalist announces entry into color cosmetics with ingredient-focused makeup line",
      tags: ["minimalist", "color-cosmetics", "ingredients", "market-entry", "skincare-makeup"],
      confidence: 0.87,
      sources: ["Brand Website", "Social Media", "Industry Analysis"],
      timestamp: "2024-01-11T09:40:00Z",
      keyInsights: [
        "Launch includes foundations with 2% niacinamide",
        "Direct-to-consumer approach with ingredient transparency",
        "Targeting skincare-conscious makeup users aged 22-32"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Monitor Minimalist's makeup performance", "Evaluate ingredient-focused positioning", "Assess market response"]
    },
    {
      id: 10,
      bucket: "regulatory_alerts",
      title: "Updated Import Duty on Cosmetic Ingredients",
      summary: "Government announces revised import duties on select cosmetic raw materials affecting formulation costs",
      tags: ["import-duty", "raw-materials", "costs", "government", "policy"],
      confidence: 0.94,
      sources: ["Government Gazette", "Trade Publications", "Industry Associations"],
      timestamp: "2024-01-10T13:25:00Z",
      keyInsights: [
        "Hyaluronic acid import duty increased by 15%",
        "Reduced duties on sustainable packaging materials",
        "Effective from February 1, 2024"
      ],
      vectorEmbedding: "embedded",
      actionItems: ["Recalculate product costs", "Explore local ingredient sourcing", "Update pricing strategies"]
    }
  ];

  useEffect(() => {
    if (insights.length > 0) {
      setIsProcessing(true);
      // Simulate processing time
      setTimeout(() => {
        setStructuredData(prev => [...sampleStructuredData, ...prev]);
        setIsProcessing(false);
      }, 2000);
    }
  }, [insights]);

  const filteredData = structuredData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBucket = selectedBucket === "all" || item.bucket === selectedBucket;
    return matchesSearch && matchesBucket;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-900 mb-2">🗂️ Knowledge Structurer Agent</h2>
            <p className="text-green-700">Classifies and structures market signals into searchable vector embeddings</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-green-700">Total Structured</div>
              <div className="text-xl font-bold text-green-900">{structuredData.length}</div>
            </div>
            {isProcessing && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-lg">
                <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-sm text-blue-700">Processing insights...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Buckets */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Signal Buckets
              </CardTitle>
              <CardDescription>
                Click to filter insights by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={selectedBucket === "all" ? "default" : "outline"}
                  className={`w-full justify-start transition-colors ${
                    selectedBucket === "all" ? "bg-blue-600 text-white" : "hover:bg-blue-50"
                  }`}
                  onClick={() => setSelectedBucket("all")}
                >
                  All Buckets ({structuredData.length})
                </Button>
                {buckets.map(bucket => (
                  <Button
                    key={bucket.id}
                    variant={selectedBucket === bucket.id ? "default" : "outline"}
                    className={`w-full justify-between transition-colors ${
                      selectedBucket === bucket.id 
                        ? "bg-blue-600 text-white" 
                        : "hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedBucket(bucket.id)}
                  >
                    <span>{bucket.name}</span>
                    <Badge 
                      variant="secondary" 
                      className={selectedBucket === bucket.id ? "bg-blue-100 text-blue-800" : ""}
                    >
                      {structuredData.filter(item => item.bucket === bucket.id).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Processing Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Embedding Accuracy</span>
                  <span className="font-semibold">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Classification Speed</span>
                  <span className="font-semibold">1.2s avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Vector Similarity</span>
                  <span className="font-semibold">0.87</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6" />
                Structured Knowledge Base
              </CardTitle>
              <CardDescription>
                Vector-embedded insights ready for semantic search and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search structured insights..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedBucket} onValueChange={setSelectedBucket}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by bucket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Buckets</SelectItem>
                    {buckets.map(bucket => (
                      <SelectItem key={bucket.id} value={bucket.id}>
                        {bucket.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter Status Indicator */}
              {selectedBucket !== "all" && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Filtered by: {buckets.find(b => b.id === selectedBucket)?.name}
                      </span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {filteredData.length} results
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBucket("all")}
                      className="text-blue-600 hover:bg-blue-100"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {filteredData.map((item) => {
                  const bucket = buckets.find(b => b.id === item.bucket);
                  return (
                    <div key={item.id} className={`p-6 border rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedBucket === item.bucket ? "border-blue-300 bg-blue-50" : ""
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={bucket?.color || "bg-gray-100 text-gray-800"}>
                            {bucket?.name}
                          </Badge>
                          <Badge variant="outline">
                            {Math.round(item.confidence * 100)}% confidence
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Vector Embedded
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.summary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                          <ul className="space-y-1">
                            {item.keyInsights.map((insight: string, index: number) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 mt-1 text-blue-500 flex-shrink-0" />
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Actions</h4>
                          <ul className="space-y-1">
                            {item.actionItems.map((action: string, index: number) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 mt-1 text-green-500 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          Sources: {item.sources.join(", ")}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredData.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-semibold">No structured insights found</p>
                    <p className="text-sm">Try adjusting your search terms or capture more market data</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}