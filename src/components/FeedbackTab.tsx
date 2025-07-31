import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Filter, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import feedbackData from "@/data/feedback-logs.json";

interface FeedbackTabProps {
  externalFeedback?: any[];
}

export function FeedbackTab({ externalFeedback = [] }: FeedbackTabProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Combine original feedback with external feedback from supervision
  const allFeedback = [...externalFeedback, ...feedbackData.feedbackLogs];
  
  const filteredLogs = allFeedback.filter(log => {
    const matchesType = selectedType === "all" || log.feedbackType === selectedType;
    const matchesSearch = log.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.reviewerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    const typeData = feedbackData.feedbackTypes.find(t => t.id === type);
    return typeData ? `bg-${typeData.color}-100 text-${typeData.color}-800` : "bg-gray-100 text-gray-800";
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved": return "bg-green-100 text-green-800";
      case "flagged": return "bg-red-100 text-red-800";
      case "feedback_provided": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "flagged": return <AlertCircle className="h-4 w-4" />;
      case "feedback_provided": return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    total: allFeedback.length,
    approved: allFeedback.filter(l => l.action === "approved").length,
    flagged: allFeedback.filter(l => l.action === "flagged").length,
    feedbackProvided: allFeedback.filter(l => l.action === "feedback_provided").length
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-red-600">{stats.flagged}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Improvement Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round((stats.approved / stats.total) * 100)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Feedback & Retraining Log
          </CardTitle>
          <CardDescription>
            Track all feedback provided to AI agents for continuous improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search feedback logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {feedbackData.feedbackTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                {externalFeedback.includes(log) && (
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">New</Badge>
                    <span className="text-sm text-green-700">Just submitted from supervision</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(log.feedbackType)}>
                      {feedbackData.feedbackTypes.find(t => t.id === log.feedbackType)?.name}
                    </Badge>
                    <Badge className={getActionColor(log.action)}>
                      {getActionIcon(log.action)}
                      {log.action.replace('_', ' ')}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">{formatTime(log.timestamp)}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reviewer</p>
                    <p className="text-sm">{log.reviewerName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confidence</p>
                    <p className="text-sm">{Math.round(log.confidence * 100)}%</p>
                  </div>
                </div>
                
                {log.originalIntent !== log.correctedIntent && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-600">Intent Correction</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                        {log.originalIntent}
                      </span>
                      <span>→</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                        {log.correctedIntent}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600">Notes</p>
                  <p className="text-sm text-gray-700">{log.notes}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {log.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold">No feedback logs found</p>
              <p className="text-sm">Try adjusting your search filters or provide feedback from the supervision tab</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}