import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { WelcomeModal } from "@/components/WelcomeModal";
import { MarketDataTab } from "@/components/MarketDataTab";
import { KnowledgeStructurerTab } from "@/components/KnowledgeStructurerTab";
import { ConversationalAgentTab } from "@/components/ConversationalAgentTab";
import { WeeklyReportsTab } from "@/components/WeeklyReportsTab";
import { IngredientTrendsTab } from "@/components/IngredientTrendsTab";
import { AnalyticsTab } from "@/components/AnalyticsTab";
import { KnowledgeBaseTab } from "@/components/KnowledgeBaseTab";
import { UserManagementTab } from "@/components/UserManagementTab";
import { 
  HelpCircle, 
  Satellite, 
  Database, 
  MessageCircle, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Users,
  Zap,
  Beaker
} from "lucide-react";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("market-data");
  const [insights, setInsights] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeModal open={showWelcome} onOpenChange={setShowWelcome} />
      
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img 
                src="/images/Unilever-logo-2.png" 
                alt="Unilever" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lakmé CMI & R&D Intelligence</h1>
                <p className="text-sm text-gray-600">Powered by AI Market Insights</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowWelcome(true)}
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="market-data" className="flex items-center gap-2">
              <Satellite className="h-4 w-4" />
              Market Data
            </TabsTrigger>
            <TabsTrigger value="knowledge-structurer" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Knowledge Structurer
            </TabsTrigger>
            <TabsTrigger value="conversational" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="ingredients" className="flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              Ingredient Trends
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Weekly Reports
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market-data" className="space-y-6">
            <MarketDataTab onInsightsCaptured={(data) => setInsights(prev => [...prev, ...data])} />
          </TabsContent>

          <TabsContent value="knowledge-structurer" className="space-y-6">
            <KnowledgeStructurerTab insights={insights} />
          </TabsContent>

          <TabsContent value="conversational" className="space-y-6">
            <ConversationalAgentTab />
          </TabsContent>

          <TabsContent value="ingredients" className="space-y-6">
            <IngredientTrendsTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <WeeklyReportsTab />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <KnowledgeBaseTab />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagementTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;