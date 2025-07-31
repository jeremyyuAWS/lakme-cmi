import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Calendar, Clock, CheckCircle, AlertTriangle, TrendingUp, Eye } from "lucide-react";

export function WeeklyReportsTab() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [viewingReport, setViewingReport] = useState<string | null>(null);

  const weeklyReports = [
    {
      id: "report-001",
      title: "CMI & R&D Intelligence Digest",
      week: "Week of January 8-14, 2024",
      status: "completed",
      generatedAt: "2024-01-15T09:00:00Z",
      sections: [
        { name: "Executive Summary", status: "completed" },
        { name: "Consumer Trends", status: "completed" },
        { name: "Competitor Intelligence", status: "completed" },
        { name: "Regulatory Alerts", status: "completed" },
        { name: "Sprint Updates (SF-24, PF-19)", status: "completed" },
        { name: "Action Items & Mitigations", status: "completed" }
      ],
      keyHighlights: [
        "Niacinamide trend continues to surge (+450% searches)",
        "Lakmé 9to5 Primer feedback requires attention (156 complaints)",
        "Maybelline launched refillable lipstick line",
        "New FSSAI guidelines on SPF claims published"
      ],
      actionItems: 5,
      recipients: ["R&D Team", "Product Innovation", "CMI Analysts", "Category Heads"]
    },
    {
      id: "report-002",
      title: "CMI & R&D Intelligence Digest",
      week: "Week of January 1-7, 2024",
      status: "completed",
      generatedAt: "2024-01-08T09:00:00Z",
      sections: [
        { name: "Executive Summary", status: "completed" },
        { name: "Consumer Trends", status: "completed" },
        { name: "Competitor Intelligence", status: "completed" },
        { name: "Regulatory Alerts", status: "completed" },
        { name: "Sprint Updates", status: "completed" },
        { name: "Action Items & Mitigations", status: "completed" }
      ],
      keyHighlights: [
        "Sustainable packaging mentions increased 45%",
        "Vitamin C serums showing strong momentum",
        "Price sensitivity increased in tier-2 cities",
        "TikTok beauty trends driving product discovery"
      ],
      actionItems: 7,
      recipients: ["R&D Team", "Product Innovation", "CMI Analysts"]
    },
    {
      id: "report-003",
      title: "CMI & R&D Intelligence Digest",
      week: "Week of December 25-31, 2023",
      status: "completed",
      generatedAt: "2024-01-01T09:00:00Z",
      sections: [
        { name: "Executive Summary", status: "completed" },
        { name: "Consumer Trends", status: "completed" },
        { name: "Competitor Intelligence", status: "completed" },
        { name: "Regulatory Alerts", status: "completed" },
        { name: "Sprint Updates", status: "completed" },
        { name: "Action Items & Mitigations", status: "completed" }
      ],
      keyHighlights: [
        "Holiday season beauty gifting trends analyzed",
        "Premium segment growth during festive period",
        "Competitor holiday campaign performance review",
        "Year-end regulatory compliance summary"
      ],
      actionItems: 3,
      recipients: ["R&D Team", "Product Innovation", "CMI Analysts", "Marketing Team"]
    }
  ];

  const generateNewReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 12.5;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "generating": return "bg-blue-100 text-blue-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const reportSections = [
    "Scanning market data sources...",
    "Analyzing consumer sentiment trends...",
    "Processing competitor intelligence...",
    "Reviewing regulatory updates...",
    "Compiling sprint progress...",
    "Generating action items...",
    "Creating executive summary...",
    "Finalizing report format..."
  ];

  const currentSection = Math.floor((generationProgress / 100) * reportSections.length);

  const getReportContent = (reportId: string) => {
    const reportContent = {
      "report-001": `
# Lakmé CMI & R&D Intelligence Digest
**Week of January 8-14, 2024**

## Executive Summary

This week's intelligence reveals significant consumer behavior shifts and competitive movements that require immediate attention from our R&D and product teams. Key findings include persistent issues with our 9to5 Primer formulation, emerging opportunities in sustainable packaging, and regulatory updates affecting SPF claims.

**Top Priority Actions:**
1. Address 9to5 Primer dryness complaints (156 mentions)
2. Evaluate refillable packaging opportunities
3. Review SPF claim compliance with new FSSAI guidelines

## Consumer Trends

### 🔥 Trending Ingredients
- **Niacinamide**: 450% increase in searches, driven by acne and pore concerns
- **Vitamin C**: Stable demand, focus on stability and packaging
- **Hyaluronic Acid**: Growing interest in lightweight serums

### 📊 Sentiment Analysis
- Overall Lakmé brand sentiment: 3.6/5 (down from 3.8)
- Skincare category performing better than makeup
- Price-value perception remains strong in tier-2/3 cities

### 🎯 Pain Points Detected
1. **Texture Issues**: 34% of serum complaints mention stickiness
2. **Packaging Problems**: Dropper mechanisms failing in 21% of cases
3. **Result Expectations**: Consumers expect visible changes within 2 weeks

## Competitor Intelligence

### New Launches
- **Maybelline**: Refillable lipstick line (₹850 base + ₹450 refills)
- **L'Oréal**: Testing refillable foundation compacts in metros
- **Plum**: Expanded niacinamide range with 3 new SKUs

### Market Positioning
- Premium segment growing 23% YoY
- Sustainable beauty market estimated at ₹2,400 crore by 2025
- Direct-to-consumer brands gaining market share in tier-1 cities

## Regulatory Alerts

### 🚨 FSSAI Updates
- New guidelines on SPF testing and claims validation
- Stricter requirements for "natural" and "organic" claims
- Updated list of permitted UV filters for Indian market

### Compliance Actions Required
1. Review all SPF product claims and testing documentation
2. Update ingredient disclosure for "natural" positioned products
3. Ensure UV filter compliance across sun protection range

## Sprint Updates

### SF-24 (Serum Formulation Project)
- **Status**: On track
- **Progress**: 75% complete
- **Key Milestone**: Texture optimization trials showing promising results
- **Next Phase**: Consumer testing planned for Week 3

### PF-19 (Primer Reformulation)
- **Status**: Accelerated due to market feedback
- **Progress**: 45% complete
- **Key Challenge**: Balancing oil control with hydration
- **Target**: First prototypes by end of January

## Action Items & Recommended Mitigations

### Immediate Actions (This Week)
1. **R&D Team**: Begin 9to5 Primer reformulation with hydrating agents
2. **Product Innovation**: Research refillable packaging suppliers
3. **Regulatory Affairs**: Conduct SPF claims audit across all products
4. **CMI Team**: Deep dive into texture preferences by skin type

### Medium-term Initiatives (Next Month)
1. Develop sustainable packaging roadmap for key products
2. Launch consumer research on serum texture preferences
3. Evaluate niacinamide integration opportunities
4. Competitive pricing analysis for premium segment

### Strategic Recommendations (Next Quarter)
1. Pilot refillable format for Absolute range in select metros
2. Launch lightweight serum variants addressing texture concerns  
3. Develop clear ingredient communication strategy
4. Strengthen presence in tier-1 direct-to-consumer channels

---

**Report auto-generated on January 15, 2024 at 09:00 AM**
**Next report scheduled: January 22, 2024**
`
    };

    return reportContent[reportId as keyof typeof reportContent] || reportContent["report-001"];
  };

  const sampleReportContent = getReportContent("report-001");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-orange-600" />
              <div>
                <h2 className="text-xl font-bold text-orange-900">Weekly Intelligence Reports</h2>
                <p className="text-orange-700">Automated CMI & R&D insights delivered every Monday</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={generateNewReport} 
            disabled={isGenerating}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Now
              </>
            )}
          </Button>
        </div>
        
        {isGenerating && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-orange-700">
                {reportSections[currentSection] || "Finalizing..."}
              </span>
              <span className="text-sm text-orange-700">{generationProgress}%</span>
            </div>
            <Progress value={generationProgress} className="h-2" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Generated Reports
              </CardTitle>
              <CardDescription>
                Weekly CMI & R&D intelligence reports with actionable insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{report.title}</h3>
                        <p className="text-gray-600">{report.week}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Report Sections</h4>
                        <ul className="space-y-1">
                          {report.sections.map((section, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{section.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Key Highlights</h4>
                        <ul className="space-y-1">
                          {report.keyHighlights.map((highlight, index) => (
                            <li key={index} className="text-sm text-gray-600">• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          {report.actionItems} action items
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{report.title} - {report.week}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <div className="bg-gray-50 rounded-lg p-6 max-h-[60vh] overflow-y-auto">
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                                  {getReportContent(report.id)}
                                </pre>
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
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
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Automated report settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Schedule</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium">Every Monday at 9:00 AM</div>
                    <div className="text-xs text-gray-600">Auto-generated and distributed</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Recipients</label>
                  <div className="mt-1 space-y-1">
                    {["R&D Scientists", "Product Innovation Managers", "CMI Analysts", "Category Heads", "Regulatory Affairs Team"].map((recipient, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{recipient}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Format Options</label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>PDF Export</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>HTML Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Notion Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Report Preview</CardTitle>
              <CardDescription>
                Latest report structure and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {sampleReportContent.substring(0, 800)}...
                </pre>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Download className="h-4 w-4 mr-2" />
                Download Full Sample
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}