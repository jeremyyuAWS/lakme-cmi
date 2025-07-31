import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Satellite, TrendingUp, AlertTriangle, Eye, Play, Pause, Settings, Download, Wifi, Radio } from "lucide-react";

interface MarketDataTabProps {
  onInsightsCaptured: (insights: any[]) => void;
}

export function MarketDataTab({ onInsightsCaptured }: MarketDataTabProps) {
  const [isAggregating, setIsAggregating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [capturedInsights, setCapturedInsights] = useState<any[]>([]);
  const [currentSource, setCurrentSource] = useState("");
  const [activeSourceIndex, setActiveSourceIndex] = useState(-1);

  const dataSources = [
    { name: "Google Trends", status: "active", lastSync: "2 min ago", insights: 23 },
    { name: "Instagram", status: "active", lastSync: "5 min ago", insights: 18 },
    { name: "TikTok", status: "active", lastSync: "1 min ago", insights: 31 },
    { name: "Nykaa", status: "active", lastSync: "3 min ago", insights: 15 },
    { name: "Amazon Reviews", status: "active", lastSync: "4 min ago", insights: 12 },
    { name: "Flipkart", status: "warning", lastSync: "15 min ago", insights: 8 },
    { name: "FSSAI Database", status: "active", lastSync: "10 min ago", insights: 5 }
  ];

  const trendingSignals = [
    {
      id: 1,
      category: "Ingredient Buzz",
      signal: "Niacinamide surge in skincare searches",
      sentiment: "positive",
      confidence: 0.94,
      source: "Google Trends + Instagram",
      timestamp: "2 hours ago",
      volume: 2847
    },
    {
      id: 2,
      category: "Pain Point Cluster",
      signal: "Lakmé 9to5 Primer dryness complaints",
      sentiment: "negative",
      confidence: 0.87,
      source: "Nykaa + Amazon Reviews",
      timestamp: "1 hour ago",
      volume: 156
    },
    {
      id: 3,
      category: "New Launch Watch",
      signal: "Maybelline refillable lipstick launch",
      sentiment: "neutral",
      confidence: 0.91,
      source: "Instagram + TikTok",
      timestamp: "30 min ago",
      volume: 1234
    },
    {
      id: 4,
      category: "Packaging Trends",
      signal: "Sustainable packaging mentions +45%",
      sentiment: "positive",
      confidence: 0.89,
      source: "Multiple platforms",
      timestamp: "3 hours ago",
      volume: 3421
    },
    {
      id: 5,
      category: "Regulatory Alert",
      signal: "New FSSAI guidelines on SPF claims",
      sentiment: "neutral",
      confidence: 0.96,
      source: "FSSAI Database",
      timestamp: "6 hours ago",
      volume: 89
    }
  ];

  const startAggregation = () => {
    setIsAggregating(true);
    setProgress(0);
    setActiveSourceIndex(0);
    
    // Simulate scanning each data source
    const sources = dataSources.map(s => s.name);
    let sourceIndex = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAggregating(false);
          setLastUpdate(new Date());
          setCurrentSource("");
          setActiveSourceIndex(-1);
          
          // Simulate new insights being captured
          const newInsights = trendingSignals.slice(0, 3);
          setCapturedInsights(prev => [...newInsights, ...prev]);
          onInsightsCaptured(newInsights);
          
          return 100;
        }
        
        // Update current source being scanned
        const newProgress = prev + 10;
        const newSourceIndex = Math.floor((newProgress / 100) * sources.length);
        if (newSourceIndex < sources.length && newSourceIndex !== sourceIndex) {
          sourceIndex = newSourceIndex;
          setCurrentSource(sources[sourceIndex]);
          setActiveSourceIndex(sourceIndex);
        }
        
        return prev + 10;
      });
    }, 300);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800";
      case "negative": return "bg-red-100 text-red-800";
      case "neutral": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Controls */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Satellite className={`h-6 w-6 ${isAggregating ? 'animate-spin text-blue-600' : 'text-blue-900'}`} />
              Market Data Aggregator Agent
              {isAggregating && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </h2>
            <p className="text-blue-700">Continuously monitoring digital market signals across 7 data sources</p>
            {isAggregating && currentSource && (
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <Radio className="h-4 w-4 animate-pulse" />
                <span className="animate-pulse">Currently scanning: <strong>{currentSource}</strong></span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={startAggregation}
              disabled={isAggregating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAggregating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isAggregating ? "Aggregating..." : "Start Manual Scan"}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
        
        {isAggregating && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="h-4 w-4 text-blue-600 animate-bounce" />
              <span className="text-sm text-blue-700 animate-pulse">
                Scanning {dataSources.length} data sources for beauty market signals...
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-700">Scanning all data sources...</span>
              <span className="text-sm text-blue-700">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      {/* Data Sources Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5" />
              Data Sources Status
            </CardTitle>
            <CardDescription>
              Real-time status of all connected data sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataSources.map((source, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  isAggregating && activeSourceIndex === index 
                    ? 'bg-blue-100 border-2 border-blue-300 shadow-md transform scale-105' 
                    : isAggregating && activeSourceIndex > index
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(source.status)} ${
                      isAggregating && activeSourceIndex === index ? 'animate-pulse scale-150' : ''
                    }`}></div>
                    <span className="font-medium">{source.name}</span>
                    {isAggregating && activeSourceIndex === index && (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      isAggregating && activeSourceIndex === index ? 'text-blue-600 animate-pulse' : ''
                    }`}>
                      {source.insights} insights
                    </div>
                    <div className="text-xs text-gray-500">{source.lastSync}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Today's Summary
            </CardTitle>
            <CardDescription>
              Key metrics from today's data aggregation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className={`text-center p-4 bg-blue-50 rounded-lg transition-all duration-300 ${
                isAggregating ? 'animate-pulse border-2 border-blue-200' : ''
              }`}>
                <div className="text-2xl font-bold text-blue-600">112</div>
                <div className="text-sm text-blue-700">Total Signals</div>
              </div>
              <div className={`text-center p-4 bg-green-50 rounded-lg transition-all duration-300 ${
                isAggregating ? 'animate-pulse border-2 border-green-200' : ''
              }`}>
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-green-700">High Priority</div>
              </div>
              <div className={`text-center p-4 bg-purple-50 rounded-lg transition-all duration-300 ${
                isAggregating ? 'animate-pulse border-2 border-purple-200' : ''
              }`}>
                <div className="text-2xl font-bold text-purple-600">7</div>
                <div className="text-sm text-purple-700">New Trends</div>
              </div>
              <div className={`text-center p-4 bg-orange-50 rounded-lg transition-all duration-300 ${
                isAggregating ? 'animate-pulse border-2 border-orange-200' : ''
              }`}>
                <div className="text-2xl font-bold text-orange-600">94%</div>
                <div className="text-sm text-orange-700">Accuracy</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Daily Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Signals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Live Market Signals
            </CardTitle>
            <div className="text-sm text-gray-600">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
          <CardDescription>
            Real-time insights captured from beauty and cosmetics market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingSignals.map((signal) => (
              <div key={signal.id} className={`p-4 border rounded-lg transition-all duration-300 ${
                isAggregating 
                  ? 'animate-pulse bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {signal.category}
                      </Badge>
                      <Badge className={getSentimentColor(signal.sentiment)}>
                        {signal.sentiment}
                      </Badge>
                      {isAggregating && (
                        <Badge className="bg-blue-100 text-blue-800 animate-bounce">
                          Live
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{signal.timestamp}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{signal.signal}</h3>
                    <p className="text-sm text-gray-600">
                      Source: {signal.source} • Volume: {signal.volume.toLocaleString()} mentions
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Confidence: {Math.round(signal.confidence * 100)}%
                    </div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${signal.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {signal.sentiment === "negative" && signal.signal.includes("Lakmé") && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Action Required</span>
                    </div>
                    <p className="text-xs text-red-700">
                      This signal involves our Lakmé brand and requires immediate attention from the R&D team.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}