export interface PromptAnalysis {
  score: number;
  feedback: string[];
  suggestions: string[];
  rewrittenPrompt: string;
  criteria: {
    length: number;
    specificity: number;
    clarity: number;
    context: number;
    actionWords: number;
    complexity: number;
  };
  category: "poor" | "fair" | "good" | "excellent";
  estimatedResponseQuality: number;
  tags: string[];
  warnings: string[];
  improvements: string[];
  detailedAnalysis: {
    wordCount: number;
    sentenceCount: number;
    avgWordsPerSentence: number;
    readabilityScore: number;
    technicalTerms: number;
    questionWords: number;
    vagueWords: number;
  };
}

export interface PromptHistory {
  id: string;
  prompt: string;
  analysis: PromptAnalysis;
  timestamp: Date;
  improved: boolean;
  rating?: number;
}

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  description: string;
  tags: string[];
  useCount: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface PromptComparison {
  original: PromptAnalysis;
  improved: PromptAnalysis;
  improvementScore: number;
  keyDifferences: string[];
}

export interface PromptStatistics {
  totalPrompts: number;
  totalImproved: number;
  totalPoor: number;
  totalFair: number;
  totalGood: number;
  totalExcellent: number;
}
