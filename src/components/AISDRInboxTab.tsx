import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Inbox, MessageCircle, User, Bot, Search, ChevronRight, Clock, TrendingUp } from "lucide-react";
import { formatTime, getConfidenceColor } from "@/lib/utils";
import sdrData from "@/data/sdr-inbox.json";

export function AISDRInboxTab() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = sdrData.conversations.filter(conv =>
    conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedConv = sdrData.conversations.find(c => c.id === selectedConversation);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-800";
      case "escalated": return "bg-orange-100 text-orange-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Demo Banner */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-800 font-semibold">AI SDR Demo Active</span>
          </div>
          <span className="text-gray-600">|</span>
          <span className="text-gray-700">Showing how AI handles student & gamer inquiries to free up human SDS for enterprise customers</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold">
                  {sdrData.conversations.filter(c => c.status === "active").length}
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Escalated Today</p>
                <p className="text-2xl font-bold">
                  {sdrData.conversations.filter(c => c.status === "escalated").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Handling Rate</p>
                <p className="text-2xl font-bold text-green-600">84%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2-Panel Layout */}
      <div className="grid grid-cols-12 gap-6 h-[600px]">
        {/* Left Panel - Conversation List */}
        <div className="col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Inbox className="h-5 w-5" />
                AI SDR Inbox
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-[460px]">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm truncate">{conversation.subject}</h3>
                          <Badge className={getPriorityColor(conversation.priority)} size="sm">
                            {conversation.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.senderName}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {conversation.messages[conversation.messages.length - 1]?.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {conversation.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Conversation Detail */}
        <div className="col-span-8">
          <Card className="h-full">
            {selectedConversation && selectedConv ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(selectedConv.priority)}>
                      {selectedConv.priority} priority
                    </Badge>
                    <Badge className={getStatusColor(selectedConv.status)}>
                      {selectedConv.status}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {selectedConv.senderName} - {selectedConv.subject}
                  </CardTitle>
                  <CardDescription>
                    {selectedConv.sender} • {formatTime(selectedConv.timestamp)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 overflow-y-auto h-[400px]">
                    {selectedConv.messages.map((message) => (
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
                                ? "bg-gray-50 border border-gray-200 text-gray-900"
                                : "bg-blue-50 border border-blue-200 text-blue-900"
                            }`}
                          >
                            <div className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{message.content}</div>
                            {message.sender === "ai" && message.confidence && (
                              <div className="mt-2 text-xs text-gray-500">
                                Confidence: <span className={getConfidenceColor(message.confidence)}>
                                  {Math.round(message.confidence * 100)}%
                                </span>
                              </div>
                            )}
                            {message.sender === "ai" && message.hasAttachments && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="text-xs text-gray-600 mb-2">📎 Attachments:</div>
                                <div className="space-y-1">
                                  {message.attachments?.map((attachment, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                      <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                                        <span className="text-blue-600">📄</span>
                                      </div>
                                      <span className="text-blue-700 hover:underline cursor-pointer">{attachment}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-semibold">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the left panel to view the email thread</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Email Features Demo */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">✉️ Email-Style AI SDR Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-1">📎 Rich Attachments</h4>
            <p className="text-blue-700">PDF guides, video tutorials, setup scripts, and documentation</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">🔗 Smart Recommendations</h4>
            <p className="text-blue-700">build.nvidia.com, webinars, student programs, and community resources</p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-1">🎯 Targeted Content</h4>
            <p className="text-blue-700">Student discounts, academic resources, and campus gaming programs</p>
          </div>
        </div>
      </div>
    </div>
  );
}