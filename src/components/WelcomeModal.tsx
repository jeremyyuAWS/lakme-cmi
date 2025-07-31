import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Satellite, Database, MessageCircle, FileText, BarChart3, BookOpen } from "lucide-react";

interface WelcomeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WelcomeModal({ open, onOpenChange }: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <img 
              src="/images/Unilever-logo-2.png" 
              alt="Unilever" 
              className="h-6 w-auto"
            />
            Welcome to Lakmé CMI & R&D Intelligence
          </DialogTitle>
          <DialogDescription className="text-base">
            Autonomous AI system for continuous market monitoring, consumer insights, and R&D intelligence for Lakmé innovation teams.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Market Data Aggregator</h3>
            </div>
            <p className="text-sm text-gray-600">Monitor trending ingredients, consumer sentiment, and competitor launches across digital platforms.</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Knowledge Structurer</h3>
            </div>
            <p className="text-sm text-gray-600">Classify and structure market signals into searchable insights for ingredient trends and pain points.</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <p className="text-sm text-gray-600">Chat-based interface for real-time queries about consumer trends, ingredients, and market insights.</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold">Weekly Reports</h3>
            </div>
            <p className="text-sm text-gray-600">Auto-generated weekly CMI & R&D reports with consumer trends and competitor analysis.</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold">Analytics</h3>
            </div>
            <p className="text-sm text-gray-600">Track trend identification accuracy, query resolution, and system adoption metrics.</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-red-600" />
              <h3 className="font-semibold">Knowledge Base</h3>
            </div>
            <p className="text-sm text-gray-600">Centralized repository of beauty industry insights, ingredient data, and regulatory information.</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">🚀 AI-Powered Beauty Intelligence</h3>
          <p className="text-sm text-gray-700">
            This system continuously monitors market signals, structures consumer insights, and provides actionable intelligence 
            for Lakmé's R&D and product innovation teams to stay ahead of beauty trends.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700">
            Start Exploring
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}