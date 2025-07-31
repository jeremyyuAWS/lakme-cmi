import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, MessageSquare, AlertTriangle, User, Bot, Clock, Tag, Plus, Filter, SortDesc, Bell, Settings, BarChart3, Zap, Target, TrendingUp } from "lucide-react";
import { formatTime, getConfidenceColor } from "@/lib/utils";
import sdrData from "@/data/sdr-inbox.json";
import feedbackData from "@/data/feedback-logs.json";

interface HumanSupervisionTabProps {
  onFeedbackProvided?: (feedback: any) => void;
}

export function HumanSupervisionTab({ onFeedbackProvided }: HumanSupervisionTabProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [feedbackLogs, setFeedbackLogs] = useState(feedbackData.feedbackLogs);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // Filtering and sorting states
  const [filters, setFilters] = useState({
    confidence: "all",
    priority: "all",
    tags: "all",
    timeRange: "all"
  });
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Auto-escalation settings
  const [autoEscalationRules, setAutoEscalationRules] = useState({
    confidenceThreshold: 0.7,
    timeThreshold: 30, // minutes
    enabled: true
  });
  
  const [feedbackForm, setFeedbackForm] = useState({
    feedbackType: "",
    originalIntent: "",
    correctedIntent: "",
    notes: "",
    tags: [] as string[],
    confidence: 0.85
  });
  const [customTag, setCustomTag] = useState("");
  const [actionHistory, setActionHistory] = useState<Array<{
    id: string;
    action: "approved" | "flagged" | "escalated" | "feedback_provided";
    conversationId: string;
    timestamp: string;
    reason?: string;
  }>>([]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const lowConfidenceConvs = sdrData.conversations.filter(c => {
        const lastMessage = c.messages[c.messages.length - 1];
        return c.status === "active" && lastMessage?.confidence && lastMessage.confidence < autoEscalationRules.confidenceThreshold;
      });
      
      if (lowConfidenceConvs.length > 0) {
        const newNotification = {
          id: Date.now().toString(),
          type: "low_confidence",
          message: `${lowConfidenceConvs.length} conversation(s) below confidence threshold`,
          timestamp: new Date().toISOString(),
          conversations: lowConfidenceConvs.map(c => c.id)
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      }
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(interval);
  }, [autoEscalationRules.confidenceThreshold]);

  const pendingReviews = sdrData.conversations.filter(c => c.status === "active");
  const selectedConv = sdrData.conversations.find(c => c.id === selectedConversation);
  
  const enterpriseConversations = sdrData.conversations.filter(c => c.tags.includes("enterprise"));
  const highPriorityConversations = sdrData.conversations.filter(c => c.priority === "high");
  
  const predefinedTags = [
    "intent_wrong", "entity_extraction", "routing_error", "knowledge_gap",
    "tone_adjustment", "missed_opportunity", "escalation_needed", "technical_accuracy",
    "student_specific", "gamer_focused", "pricing_question", "product_recommendation",
    "enterprise", "dgx_spark", "research", "deployment", "excellent_response", 
    "priority_handling", "minor_improvement", "creator", "budget", "rtx4060", "comprehensive",
    "encouraging", "appropriate", "excellent", "gaming", "dlss", "cuda", "development",
    "docker", "technical_support", "upgrade", "rtx4070", "comparison", "value", "streaming"
  ];

  // Advanced filtering logic
  const getFilteredAndSortedConversations = () => {
    let filtered = pendingReviews.filter(conv => {
      const lastMessage = conv.messages[conv.messages.length - 1];
      
      // Confidence filter
      if (filters.confidence !== "all") {
        const confidence = lastMessage?.confidence || 0;
        if (filters.confidence === "high" && confidence < 0.9) return false;
        if (filters.confidence === "medium" && (confidence < 0.7 || confidence >= 0.9)) return false;
        if (filters.confidence === "low" && confidence >= 0.7) return false;
      }
      
      // Priority filter
      if (filters.priority !== "all" && conv.priority !== filters.priority) return false;
      
      // Tags filter
      if (filters.tags !== "all" && !conv.tags.includes(filters.tags)) return false;
      
      // Time range filter
      if (filters.timeRange !== "all") {
        const convTime = new Date(conv.timestamp);
        const now = new Date();
        const diffHours = (now.getTime() - convTime.getTime()) / (1000 * 60 * 60);
        
        if (filters.timeRange === "1h" && diffHours > 1) return false;
        if (filters.timeRange === "4h" && diffHours > 4) return false;
        if (filters.timeRange === "24h" && diffHours > 24) return false;
      }
      
      return true;
    });
    
    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "confidence":
          aValue = a.messages[a.messages.length - 1]?.confidence || 0;
          bValue = b.messages[b.messages.length - 1]?.confidence || 0;
          break;
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        case "timestamp":
        default:
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  };

  const handleBulkAction = (action: "approve" | "flag" | "escalate") => {
    selectedConversations.forEach(convId => {
      const newAction = {
        id: Date.now().toString() + convId,
        action: action === "approve" ? "approved" : action === "flag" ? "flagged" : "escalated",
        conversationId: convId,
        timestamp: new Date().toISOString(),
        reason: `Bulk ${action} action`
      };
      setActionHistory(prev => [...prev, newAction as any]);
    });
    setSelectedConversations([]);
  };

  const handleSelectConversation = (convId: string, selected: boolean) => {
    if (selected) {
      setSelectedConversations(prev => [...prev, convId]);
    } else {
      setSelectedConversations(prev => prev.filter(id => id !== convId));
    }
  };

  const handleSelectAll = () => {
    const filteredConvs = getFilteredAndSortedConversations();
    if (selectedConversations.length === filteredConvs.length) {
      setSelectedConversations([]);
    } else {
      setSelectedConversations(filteredConvs.map(c => c.id));
    }
  };

  // Performance metrics for supervisor
  const supervisorMetrics = {
    totalReviewed: actionHistory.length,
    approvalRate: actionHistory.length > 0 ? (actionHistory.filter(a => a.action === "approved").length / actionHistory.length * 100) : 0,
    avgResponseTime: "2.3 min", // simulated
    feedbackProvided: actionHistory.filter(a => a.action === "feedback_provided").length,
    escalationRate: actionHistory.length > 0 ? (actionHistory.filter(a => a.action === "escalated").length / actionHistory.length * 100) : 0
  };

  const handleApprove = (conversationId: string) => {
    setActionHistory(prev => [...prev, {
      id: Date.now().toString(),
      action: "approved",
      conversationId,
      timestamp: new Date().toISOString()
    }]);
    setSelectedConversation(null);
  };

  const handleFlag = (conversationId: string, reason: string) => {
    setActionHistory(prev => [...prev, {
      id: Date.now().toString(),
      action: "flagged",
      conversationId,
      timestamp: new Date().toISOString(),
      reason
    }]);
    setSelectedConversation(null);
  };

  const handleEscalate = (conversationId: string) => {
    setActionHistory(prev => [...prev, {
      id: Date.now().toString(),
      action: "escalated",
      conversationId,
      timestamp: new Date().toISOString()
    }]);
    setSelectedConversation(null);
  };

  const handleProvideFeedback = () => {
    if (!selectedConversation) return;
    
    const selectedConv = sdrData.conversations.find(c => c.id === selectedConversation);
    if (!selectedConv) return;
    
    setFeedbackForm({
      feedbackType: "",
      originalIntent: "",
      correctedIntent: "",
      notes: "",
      tags: [],
      confidence: 0.85
    });
    
    const lastMessage = selectedConv.messages[selectedConv.messages.length - 1];
    if (lastMessage?.confidence) {
      setFeedbackForm(prev => ({ ...prev, confidence: lastMessage.confidence }));
    }
    
    setShowFeedbackDialog(true);
  };

  const handleSubmitFeedback = () => {
    if (!selectedConversation || !feedbackForm.feedbackType || !feedbackForm.notes) return;
    
    const selectedConv = sdrData.conversations.find(c => c.id === selectedConversation);
    if (!selectedConv) return;
    
    const newFeedback = {
      id: `fb-${Date.now()}`,
      timestamp: new Date().toISOString(),
      conversationId: selectedConversation,
      reviewer: "john.smith@nvidia.com",
      reviewerName: "John Smith",
      feedbackType: feedbackForm.feedbackType,
      originalIntent: feedbackForm.originalIntent || "general_inquiry",
      correctedIntent: feedbackForm.correctedIntent || feedbackForm.originalIntent || "general_inquiry",
      confidence: feedbackForm.confidence,
      notes: feedbackForm.notes,
      tags: feedbackForm.tags,
      action: "feedback_provided"
    };
    
    setFeedbackLogs(prev => [newFeedback, ...prev]);
    
    if (onFeedbackProvided) {
      onFeedbackProvided(newFeedback);
    }
    
    setActionHistory(prev => [...prev, {
      id: Date.now().toString(),
      action: "feedback_provided",
      conversationId: selectedConversation,
      timestamp: new Date().toISOString(),
      reason: `Feedback provided: ${feedbackForm.feedbackType}`
    }]);
    
    setShowFeedbackDialog(false);
    setSelectedConversation(null);
  };

  const handleToggleTag = (tag: string) => {
    setFeedbackForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !feedbackForm.tags.includes(customTag.trim())) {
      setFeedbackForm(prev => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()]
      }));
      setCustomTag("");
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "approved": return "bg-green-100 text-green-800";
      case "flagged": return "bg-red-100 text-red-800";
      case "escalated": return "bg-orange-100 text-orange-800";
      case "feedback_provided": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredConversations = getFilteredAndSortedConversations();

  if (selectedConversation) {
    const lastMessage = selectedConv?.messages[selectedConv.messages.length - 1];
    const isLowConfidence = lastMessage?.confidence && lastMessage.confidence < 0.8;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => setSelectedConversation(null)}>
            ← Back to Supervision Queue
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Review Conversation: {selectedConv?.subject}
            </CardTitle>
            <CardDescription>
              Review AI response and take appropriate action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              {selectedConv?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === "ai" ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "ai"
                        ? "bg-[#76B900]/20 text-[#76B900]"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {message.sender === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.sender === "ai" ? "text-left" : "text-right"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "ai"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      {message.sender === "ai" && message.confidence && (
                        <div className="mt-2 text-xs text-gray-500">
                          Confidence: <span className={getConfidenceColor(message.confidence)}>
                            {Math.round(message.confidence * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isLowConfidence && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">Low Confidence Alert</h4>
                </div>
                <p className="text-sm text-yellow-700">
                  AI response confidence is below 80%. Consider reviewing for accuracy and appropriateness.
                </p>
              </div>
            )}

            {feedbackLogs.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📝 Recent Feedback Provided</h4>
                <div className="space-y-2">
                  {feedbackLogs.slice(0, 3).map(feedback => (
                    <div key={feedback.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{feedback.feedbackType.replace('_', ' ')}</Badge>
                        <span className="text-blue-700">{feedback.notes.substring(0, 50)}...</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={() => handleApprove(selectedConv?.id || "")}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Response
              </Button>
              
              <Button
                onClick={() => handleFlag(selectedConv?.id || "", "Requires improvement")}
                variant="destructive"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Flag for Review
              </Button>
              
              <Button
                onClick={() => handleEscalate(selectedConv?.id || "")}
                variant="outline"
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Escalate to SDS
              </Button>
              
              <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleProvideFeedback}
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    Provide Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Provide AI Feedback</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="feedbackType">Feedback Type</Label>
                      <Select value={feedbackForm.feedbackType} onValueChange={(value) => setFeedbackForm(prev => ({ ...prev, feedbackType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          {feedbackData.feedbackTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="originalIntent">Original Intent</Label>
                        <Input
                          id="originalIntent"
                          value={feedbackForm.originalIntent}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, originalIntent: e.target.value }))}
                          placeholder="e.g., product_recommendation"
                        />
                      </div>
                      <div>
                        <Label htmlFor="correctedIntent">Corrected Intent</Label>
                        <Input
                          id="correctedIntent"
                          value={feedbackForm.correctedIntent}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, correctedIntent: e.target.value }))}
                          placeholder="e.g., student_discount_inquiry"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="confidence">AI Confidence Score</Label>
                      <Input
                        id="confidence"
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={feedbackForm.confidence}
                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, confidence: parseFloat(e.target.value) }))}
                      />
                    </div>
                    
                    <div>
                      <Label>Feedback Tags</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {predefinedTags.map(tag => (
                            <Button
                              key={tag}
                              type="button"
                              variant={feedbackForm.tags.includes(tag) ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleToggleTag(tag)}
                            >
                              {tag.replace('_', ' ')}
                            </Button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add custom tag"
                            value={customTag}
                            onChange={(e) => setCustomTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                          />
                          <Button type="button" onClick={handleAddCustomTag} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {feedbackForm.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {feedbackForm.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleToggleTag(tag)}
                                  className="ml-1 text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Detailed Notes</Label>
                      <Textarea
                        id="notes"
                        value={feedbackForm.notes}
                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Provide detailed feedback about the AI's response..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSubmitFeedback}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={!feedbackForm.feedbackType || !feedbackForm.notes}
                      >
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Notifications Bar */}
      {notifications.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="h-5 w-5 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800">Active Notifications</h4>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 3).map(notification => (
              <div key={notification.id} className="flex items-center justify-between text-sm">
                <span className="text-yellow-700">{notification.message}</span>
                <span className="text-yellow-600">{formatTime(notification.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold">{pendingReviews.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enterprise Cases</p>
                <p className="text-2xl font-bold text-blue-600">{enterpriseConversations.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityConversations.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Your Approval Rate</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(supervisorMetrics.approvalRate)}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Feedback Given</p>
                <p className="text-2xl font-bold text-blue-600">{supervisorMetrics.feedbackProvided}</p>
              </div>
              <Tag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Conversation List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Supervision Queue ({filteredConversations.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Auto-Escalation Settings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Enable Auto-Escalation</Label>
                          <Select 
                            value={autoEscalationRules.enabled ? "enabled" : "disabled"} 
                            onValueChange={(value) => setAutoEscalationRules(prev => ({ ...prev, enabled: value === "enabled" }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enabled">Enabled</SelectItem>
                              <SelectItem value="disabled">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Confidence Threshold</Label>
                          <Input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={autoEscalationRules.confidenceThreshold}
                            onChange={(e) => setAutoEscalationRules(prev => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) }))}
                          />
                          <p className="text-xs text-gray-500 mt-1">Conversations below this threshold will auto-escalate</p>
                        </div>
                        <div>
                          <Label>Time Threshold (minutes)</Label>
                          <Input
                            type="number"
                            min="5"
                            max="120"
                            value={autoEscalationRules.timeThreshold}
                            onChange={(e) => setAutoEscalationRules(prev => ({ ...prev, timeThreshold: parseInt(e.target.value) }))}
                          />
                          <p className="text-xs text-gray-500 mt-1">Auto-escalate if no response within this time</p>
                        </div>
                        <Button onClick={() => setShowSettingsDialog(false)} className="w-full">
                          Save Settings
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              {/* Advanced Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <Select value={filters.confidence} onValueChange={(value) => setFilters(prev => ({ ...prev, confidence: value }))}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Confidence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Confidence</SelectItem>
                    <SelectItem value="high">High (90%+)</SelectItem>
                    <SelectItem value="medium">Medium (70-90%)</SelectItem>
                    <SelectItem value="low">Low (&lt;70%)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timestamp">Time</SelectItem>
                    <SelectItem value="confidence">Confidence</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="text-xs"
                >
                  <SortDesc className="h-3 w-3 mr-1" />
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </div>
              
              {/* Bulk Actions */}
              {selectedConversations.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedConversations.length} selected
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleBulkAction("approve")} className="bg-green-600 hover:bg-green-700">
                        Bulk Approve
                      </Button>
                      <Button size="sm" onClick={() => handleBulkAction("flag")} variant="destructive">
                        Bulk Flag
                      </Button>
                      <Button size="sm" onClick={() => handleBulkAction("escalate")} variant="outline">
                        Bulk Escalate
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedConversations.length === filteredConversations.length && filteredConversations.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                  <span className="text-gray-600">Select all</span>
                </div>
                
                {filteredConversations.map((conversation) => {
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  const isLowConfidence = lastMessage?.confidence && lastMessage.confidence < autoEscalationRules.confidenceThreshold;
                  const isSelected = selectedConversations.includes(conversation.id);
                  const isEnterprise = conversation.tags.includes("enterprise");
                  const isHighPriority = conversation.priority === "high";

                  return (
                    <div
                      key={conversation.id}
                      className={`p-4 border rounded-lg transition-colors ${
                        isEnterprise ? "border-blue-200 bg-blue-50" :
                        isHighPriority ? "border-red-200 bg-red-50" :
                        isLowConfidence ? "border-yellow-200 bg-yellow-50" : "hover:bg-gray-50"
                      } ${isSelected ? "border-blue-300 bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectConversation(conversation.id, e.target.checked)}
                          className="mt-1 rounded"
                        />
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{conversation.subject}</h3>
                            <div className="flex items-center gap-2">
                              {isEnterprise && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  Enterprise
                                </Badge>
                              )}
                              {isLowConfidence && (
                                <Badge variant="destructive" className="bg-yellow-100 text-yellow-800">
                                  Low Confidence
                                </Badge>
                              )}
                              <Badge className={`${
                                conversation.priority === "high" ? "bg-red-100 text-red-800" :
                                conversation.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {conversation.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <User className="h-4 w-4" />
                            <span>{conversation.senderName}</span>
                            <span>•</span>
                            <span>{formatTime(conversation.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {lastMessage?.content}
                          </p>
                          {lastMessage?.confidence && (
                            <div className="mt-2 flex items-center gap-4 text-xs">
                              <span>
                                Confidence: <span className={getConfidenceColor(lastMessage.confidence)}>
                                  {Math.round(lastMessage.confidence * 100)}%
                                </span>
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {conversation.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredConversations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-semibold">No conversations need review</p>
                    <p className="text-sm">Try adjusting your filters or check back later</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Action History & Performance */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Your Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Reviewed</span>
                  <span className="font-semibold">{supervisorMetrics.totalReviewed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approval Rate</span>
                  <span className="font-semibold text-green-600">{Math.round(supervisorMetrics.approvalRate)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Escalation Rate</span>
                  <span className="font-semibold text-orange-600">{Math.round(supervisorMetrics.escalationRate)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Feedback Given</span>
                  <span className="font-semibold text-blue-600">{supervisorMetrics.feedbackProvided}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>
                Your recent supervision decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actionHistory.slice(-8).reverse().map((action) => {
                  const conversation = sdrData.conversations.find(c => c.id === action.conversationId);
                  return (
                    <div key={action.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getActionColor(action.action)}>
                          {action.action.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatTime(action.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium line-clamp-1">{conversation?.subject}</p>
                      {action.reason && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{action.reason}</p>
                      )}
                    </div>
                  );
                })}
                {actionHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-8 text-sm">No actions taken yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}