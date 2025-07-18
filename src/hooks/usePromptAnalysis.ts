import { useCallback, useState } from "react";
import { PromptAnalyzer } from "../domain/entities/PromptAnalyzer";
import {
  PromptAnalysis,
  PromptComparison,
  PromptHistory,
} from "../types/prompt";

export function usePromptAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [analyzer] = useState(() => new PromptAnalyzer());
  const [comparison, setComparison] = useState<PromptComparison | null>(null);

  const analyzePrompt = useCallback(
    async (prompt: string): Promise<PromptAnalysis> => {
      setIsAnalyzing(true);

      // Simular processamento mais realista
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const analysis = analyzer.analyzePrompt(prompt);

      // Adicionar ao histórico
      const historyItem: PromptHistory = {
        id: Date.now().toString(),
        prompt,
        analysis,
        timestamp: new Date(),
        improved: false,
      };

      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]); // Manter 20 itens
      setIsAnalyzing(false);

      return analysis;
    },
    [analyzer]
  );

  const comparePrompts = useCallback(
    (original: string, improved: string): PromptComparison => {
      const comp = analyzer.comparePrompts(original, improved);
      setComparison(comp);
      return comp;
    },
    [analyzer]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    setComparison(null);
  }, []);

  const markAsImproved = useCallback((id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, improved: true } : item))
    );
  }, []);

  const ratePrompt = useCallback((id: string, rating: number) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating } : item))
    );
  }, []);

  const getTemplates = useCallback(() => {
    return analyzer.getPromptTemplates();
  }, [analyzer]);

  const getStatistics = useCallback(() => {
    if (history.length === 0) return null;

    const scores = history.map((h) => h.analysis.score);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const categories = history.map((h) => h.analysis.category);
    const mostCommonCategory = categories.reduce((a, b) =>
      categories.filter((c) => c === a).length >=
      categories.filter((c) => c === b).length
        ? a
        : b
    );

    return {
      totalPrompts: history.length,
      averageScore: Math.round(avgScore * 10) / 10,
      mostCommonCategory,
      improvementRate:
        (history.filter((h) => h.improved).length / history.length) * 100,
      distribution: {
        poor: categories.filter((c) => c === "poor").length,
        fair: categories.filter((c) => c === "fair").length,
        good: categories.filter((c) => c === "good").length,
        excellent: categories.filter((c) => c === "excellent").length,
      },
    };
  }, [history]);

  return {
    analyzePrompt,
    comparePrompts,
    isAnalyzing,
    history,
    comparison,
    clearHistory,
    markAsImproved,
    ratePrompt,
    getTemplates,
    getStatistics,
  };
}
