import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, AlertTriangle, Search, Beaker, DollarSign, Shield } from "lucide-react";
import ingredientsData from "@/data/beauty-ingredients.json";

export function IngredientTrendsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allIngredients = [
    ...ingredientsData.trendingIngredients,
    ...ingredientsData.emergingIngredients
  ];

  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "stable": return <div className="h-4 w-4 bg-blue-600 rounded-full" />;
      case "moderate": return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case "emerging": return <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse" />;
      default: return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "rising": return "bg-green-100 text-green-800";
      case "stable": return "bg-blue-100 text-blue-800";
      case "moderate": return "bg-yellow-100 text-yellow-800";
      case "emerging": return "bg-purple-100 text-purple-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 0.8) return "text-green-600";
    if (sentiment >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-pink-900 mb-2">🧪 Ingredient Intelligence Hub</h2>
            <p className="text-pink-700">Monitor trending ingredients, regulatory alerts, and formulation opportunities for Lakmé products</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-pink-700">Ingredients Tracked</div>
            <div className="text-xl font-bold text-pink-900">{allIngredients.length}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trending Up</p>
                <p className="text-2xl font-bold text-green-600">
                  {ingredientsData.trendingIngredients.filter(i => i.trend === "rising").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emerging</p>
                <p className="text-2xl font-bold text-purple-600">
                  {ingredientsData.emergingIngredients.length}
                </p>
              </div>
              <Beaker className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concerns</p>
                <p className="text-2xl font-bold text-red-600">
                  {ingredientsData.ingredientConcerns.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sentiment</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(allIngredients.reduce((sum, ing) => sum + ing.sentiment, 0) / allIngredients.length * 100) / 100}
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ingredients List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-6 w-6" />
                Ingredient Trends Analysis
              </CardTitle>
              <CardDescription>
                Real-time ingredient popularity and market sentiment
              </CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredIngredients.map((ingredient, index) => (
                  <div key={index} className="p-6 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getTrendIcon(ingredient.trend)}
                        <h3 className="font-semibold text-lg">{ingredient.name}</h3>
                        <Badge className={getTrendColor(ingredient.trend)}>
                          {ingredient.trend}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Popularity</div>
                        <div className="text-lg font-bold">{ingredient.popularity}%</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Market Sentiment</span>
                        <span className={`font-semibold ${getSentimentColor(ingredient.sentiment)}`}>
                          {Math.round(ingredient.sentiment * 100)}%
                        </span>
                      </div>
                      <Progress value={ingredient.sentiment * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Market Data</h4>
                        <div className="text-sm text-gray-600">
                          <div>Mentions: {ingredient.mentions.toLocaleString()}</div>
                          {ingredient.costPerKg && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Cost: {ingredient.costPerKg}/kg
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {ingredient.competitorUsage && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Competitor Usage</h4>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.competitorUsage.map((competitor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {competitor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Ingredient Concerns
              </CardTitle>
              <CardDescription>
                Ingredients facing consumer backlash
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ingredientsData.ingredientConcerns.map((concern, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-red-900">{concern.name}</h4>
                      <Badge variant="destructive" className="text-xs">
                        {Math.abs(Math.round(concern.sentiment * 100))}% negative
                      </Badge>
                    </div>
                    <p className="text-sm text-red-700 mb-2">{concern.concern}</p>
                    <div className="text-xs text-red-600">
                      {concern.mentions.toLocaleString()} mentions
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-medium text-red-800 mb-1">Alternatives:</div>
                      <div className="flex flex-wrap gap-1">
                        {concern.alternativesAvailable.map((alt, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Formulation Opportunities</CardTitle>
              <CardDescription>
                AI-identified gaps for Lakmé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Niacinamide + Argan Oil</h4>
                  <p className="text-sm text-green-700">High demand, low competition in premium segment</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Ceramide Foundation</h4>
                  <p className="text-sm text-blue-700">Barrier repair + coverage, untapped market</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Bakuchiol Serum</h4>
                  <p className="text-sm text-purple-700">Natural retinol alternative gaining traction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}