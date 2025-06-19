
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FileSearch, CheckCircle, AlertCircle, TrendingUp, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const validateFigmaUrl = (url) => {
    const normalizedUrl = url.toLowerCase().trim();
    
    if (!normalizedUrl.includes('figma.com')) {
      return false;
    }
    
    try {
      new URL(url);
      return true;
    } catch {
      return normalizedUrl.includes('figma.com') && (
        normalizedUrl.includes('/file/') || 
        normalizedUrl.includes('/proto/') || 
        normalizedUrl.includes('/design/')
      );
    }
  };

  const extractFigmaFileId = (url) => {
    const match = url.match(/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const analyzeFigmaFile = async () => {
    if (!figmaUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a Figma file URL to analyze",
        variant: "destructive"
      });
      return;
    }

    if (!validateFigmaUrl(figmaUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Figma file URL",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const fileId = extractFigmaFileId(figmaUrl);
    const figmaPreviewUrl = `https://www.figma.com/file/${fileId}`;
    
    // Brutally honest UX specialist analysis
    const mockAnalysis = {
      fileName: "E-commerce Dashboard Redesign",
      previewImage: figmaPreviewUrl,
      overallScore: 6.2,
      categories: {
        visualHierarchy: 4.5,
        colorScheme: 7.8,
        typography: 5.2,
        spacing: 6.1,
        components: 7.0,
        accessibility: 3.8
      },
      strengths: [
        "Color palette shows decent contrast ratios and maintains brand consistency",
        "Component library structure demonstrates systematic thinking",
        "Grid system implementation is mathematically sound",
        "Visual density management prevents overwhelming the user"
      ],
      improvements: [
        "Visual hierarchy is fundamentally broken - users won't know where to look first. Primary actions are buried among secondary elements",
        "Typography scale lacks mathematical precision. Line heights are inconsistent and text hierarchy confuses rather than guides",
        "Accessibility is severely compromised - color contrast fails WCAG AA standards in multiple areas. Screen reader users will struggle",
        "Information architecture is cluttered and illogical. Related functions are scattered across different sections",
        "White space usage is amateur - cramped sections alternate with wasteful empty areas",
        "Interactive elements lack clear affordances. Users won't understand what's clickable",
        "Mobile responsiveness appears to be an afterthought rather than mobile-first design",
        "Loading states and error handling are completely absent from the design system"
      ],
      insights: {
        designTrends: "Following outdated design patterns from 2019. Lacks modern micro-interactions and progressive disclosure techniques",
        userExperience: "UX flow has critical gaps. Task completion rates will suffer due to unclear navigation paths and cognitive overload",
        brandConsistency: "Brand application is superficial - colors and logos are present but brand personality is completely absent from interaction design"
      }
    };

    setAnalysisResult(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your Figma file has been analyzed with brutal honesty!",
    });
  };

  const ScoreCard = ({ title, score, delay = 0 }) => (
    <Card 
      className={`p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-700 hover:bg-gray-900/70 hover:border-gray-700 ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
          {score.toFixed(1)}
        </Badge>
      </div>
      <Progress value={score * 10} className="h-2" />
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>Score</span>
        <span>{score}/10</span>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 transform transition-transform duration-1000" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-6 animate-fade-in-once">
            <FileSearch className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Design Analysis</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-once font-impact" style={{ animationDelay: '200ms' }}>
            UX PROTOTYPE ANALYZER
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-in-once" style={{ animationDelay: '400ms' }}>
            Upload your Figma design files and get comprehensive AI-powered analysis with actionable insights to improve your designs.
          </p>

          {/* URL Input Section */}
          <div className="max-w-2xl mx-auto mb-16 animate-fade-in-once" style={{ animationDelay: '600ms' }}>
            <div className="flex gap-4 p-2 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
              <Input
                type="url"
                placeholder="Enter your Figma file URL here..."
                value={figmaUrl}
                onChange={(e) => setFigmaUrl(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
              />
              <Button 
                onClick={analyzeFigmaFile}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FileSearch className="w-4 h-4" />
                    Analyze Design
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-12">
            {/* File Preview and Overall Score */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* File Preview */}
              <Card className={`p-6 bg-gray-900/50 border-gray-800 backdrop-blur-sm ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '800ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Image className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">File Preview</h3>
                </div>
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                  <iframe 
                    src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
                <p className="text-gray-300 text-sm">Preview of: {analysisResult.fileName}</p>
              </Card>

              {/* Overall Score */}
              <Card className={`p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-gray-700 backdrop-blur-sm ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '900ms' }}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">{analysisResult.fileName}</h2>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {analysisResult.overallScore}
                    </div>
                    <div className="text-left">
                      <div className="text-gray-300">Overall Score</div>
                      <div className="text-sm text-gray-400">Needs significant improvement</div>
                    </div>
                  </div>
                  <Progress value={analysisResult.overallScore * 10} className="h-3" />
                </div>
              </Card>
            </div>

            {/* Category Scores */}
            <div>
              <h3 className={`text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-impact ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '1000ms' }}>
                DETAILED ANALYSIS
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ScoreCard title="Visual Hierarchy" score={analysisResult.categories.visualHierarchy} delay={1200} />
                <ScoreCard title="Color Scheme" score={analysisResult.categories.colorScheme} delay={1300} />
                <ScoreCard title="Typography" score={analysisResult.categories.typography} delay={1400} />
                <ScoreCard title="Spacing" score={analysisResult.categories.spacing} delay={1500} />
                <ScoreCard title="Components" score={analysisResult.categories.components} delay={1600} />
                <ScoreCard title="Accessibility" score={analysisResult.categories.accessibility} delay={1700} />
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className={`p-6 bg-green-900/20 border-green-800/50 backdrop-blur-sm ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '1800ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-green-300">What's Done Well</h3>
                </div>
                <ul className="space-y-3">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className={`p-6 bg-red-900/20 border-red-800/50 backdrop-blur-sm ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '1900ms' }}>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-semibold text-red-300">Critical Issues</h3>
                </div>
                <ul className="space-y-3">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Design Insights */}
            <Card className={`p-8 bg-purple-900/20 border-purple-800/50 backdrop-blur-sm ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '2000ms' }}>
              <h3 className="text-2xl font-semibold text-purple-300 mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                Brutal UX Assessment
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">Design Trends</h4>
                  <p className="text-gray-300 text-sm">{analysisResult.insights.designTrends}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">User Experience</h4>
                  <p className="text-gray-300 text-sm">{analysisResult.insights.userExperience}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Brand Consistency</h4>
                  <p className="text-gray-300 text-sm">{analysisResult.insights.brandConsistency}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-20 pt-12 border-t border-gray-800 ${hasScrolled ? 'animate-fade-in-once' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '2200ms' }}>
          <p className="text-gray-400">
            Powered by AI • Built with modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
