"use client";

import { useEffect, useState } from "react";
import { usePromptAnalysis } from "../hooks/usePromptAnalysis";
import { PromptAnalysis, PromptTemplate } from "../types/prompt";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Progress } from "./ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";

export function PromptAnalysisApp() {
  const [prompt, setPrompt] = useState("");
  const [currentAnalysis, setCurrentAnalysis] = useState<PromptAnalysis | null>(
    null
  );
  const [selectedTemplate, setSelectedTemplate] =
    useState<PromptTemplate | null>(null);
  const [activeTab, setActiveTab] = useState("analyzer");

  const {
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
  } = usePromptAnalysis();

  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    setTemplates(getTemplates());
  }, [getTemplates]);

  useEffect(() => {
    setStatistics(getStatistics());
  }, [history, getStatistics]);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;

    const analysis = await analyzePrompt(prompt);
    setCurrentAnalysis(analysis);
  };

  const handleCompare = () => {
    if (!currentAnalysis || !currentAnalysis.rewrittenPrompt) return;

    const comp = comparePrompts(prompt, currentAnalysis.rewrittenPrompt);
    setActiveTab("comparison");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "poor":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600";
    if (score >= 3) return "text-blue-600";
    if (score >= 2) return "text-yellow-600";
    return "text-red-600";
  };

  const examples = [
    {
      title: "Exemplo Ruim",
      prompt: "me ajuda com python",
      category: "poor",
      expectedScore: "1-2",
    },
    {
      title: "Exemplo Médio",
      prompt: "Como criar uma função em Python para calcular média?",
      category: "fair",
      expectedScore: "2-3",
    },
    {
      title: "Exemplo Bom",
      prompt:
        "Preciso criar uma função Python que calcule a média aritmética de uma lista de números float, incluindo tratamento de erro para listas vazias e valores não numéricos. O contexto é um sistema de notas escolares onde preciso validar as entradas e retornar mensagens de erro apropriadas. Pode incluir exemplos de uso e testes unitários?",
      category: "excellent",
      expectedScore: "4-5",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎯 Analisador Avançado de Prompts IA
          </h1>
          <p className="text-xl text-gray-600">
            Sistema rigoroso para otimização de prompts - Análise precisa e
            feedback construtivo
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-5">
              <TabsTrigger
                value="analyzer"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                🔍 Analisador
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                📋 Templates
              </TabsTrigger>
              <TabsTrigger
                value="history"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                📜 Histórico
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                🔄 Comparação
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              >
                📊 Estatísticas
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Analyzer Tab */}
          <TabsContent value="analyzer" activeTab={activeTab}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Análise de Prompt
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Digite seu prompt para análise rigorosa:
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Digite um prompt detalhado aqui..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{prompt.length} caracteres</span>
                        <span>
                          {
                            prompt.split(/\s+/).filter((w) => w.length > 0)
                              .length
                          }{" "}
                          palavras
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !prompt.trim()}
                        className="flex-1"
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Analisando...</span>
                          </div>
                        ) : (
                          "🔍 Analisar Prompt"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPrompt("");
                          setCurrentAnalysis(null);
                        }}
                      >
                        Limpar
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Analysis Results */}
                {currentAnalysis && (
                  <Card className="p-6">
                    <div className="space-y-6">
                      {/* Score Header */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div>
                          <h3 className="text-2xl font-bold">
                            Resultado da Análise
                          </h3>
                          <Badge
                            className={getCategoryColor(
                              currentAnalysis.category
                            )}
                          >
                            {currentAnalysis.category.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-4xl font-bold ${getScoreColor(
                              currentAnalysis.score
                            )}`}
                          >
                            {currentAnalysis.score}/5
                          </div>
                          <div className="text-sm text-gray-600">
                            {currentAnalysis.estimatedResponseQuality}%
                            qualidade
                          </div>
                        </div>
                      </div>

                      {/* Detailed Analysis */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">
                            📊 Análise Detalhada
                          </h4>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Palavras:</span>
                              <span>
                                {currentAnalysis.detailedAnalysis.wordCount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Frases:</span>
                              <span>
                                {currentAnalysis.detailedAnalysis.sentenceCount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Palavras/Frase:</span>
                              <span>
                                {currentAnalysis.detailedAnalysis.avgWordsPerSentence.toFixed(
                                  1
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Termos Técnicos:</span>
                              <span>
                                {
                                  currentAnalysis.detailedAnalysis
                                    .technicalTerms
                                }
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Palavras Vagas:</span>
                              <span className="text-red-600">
                                {currentAnalysis.detailedAnalysis.vagueWords}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">
                            🎯 Critérios de Avaliação
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(currentAnalysis.criteria).map(
                              ([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="capitalize">
                                      {key.replace(/([A-Z])/g, " $1")}
                                    </span>
                                    <span className={getScoreColor(value)}>
                                      {value}/5
                                    </span>
                                  </div>
                                  <Progress value={value} max={5} />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Warnings */}
                      {currentAnalysis.warnings.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-semibold text-red-800 mb-2">
                            ⚠️ Avisos
                          </h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            {currentAnalysis.warnings.map((warning, idx) => (
                              <li key={idx}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Feedback */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">
                            💬 Feedback
                          </h4>
                          <ul className="text-sm space-y-1">
                            {currentAnalysis.feedback.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-xs mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700">
                            💡 Sugestões
                          </h4>
                          <ul className="text-sm space-y-1">
                            {currentAnalysis.suggestions.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-xs mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Improvements */}
                      {currentAnalysis.improvements.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            🔧 Melhorias Sugeridas
                          </h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            {currentAnalysis.improvements.map(
                              (improvement, idx) => (
                                <li key={idx}>• {improvement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Improved Prompt */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-green-800">
                            ✨ Prompt Melhorado
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCompare}
                            className="text-green-700 border-green-300 hover:bg-green-100"
                          >
                            Comparar
                          </Button>
                        </div>
                        <div className="text-sm text-green-700 bg-white p-3 rounded border">
                          <pre className="whitespace-pre-wrap font-mono text-xs">
                            {currentAnalysis.rewrittenPrompt}
                          </pre>
                        </div>
                      </div>

                      {/* Tags */}
                      {currentAnalysis.tags.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2">
                            🏷️ Tags Identificadas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentAnalysis.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Examples */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    📚 Exemplos de Teste
                  </h3>
                  <div className="space-y-3">
                    {examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setPrompt(example.prompt)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">
                            {example.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getCategoryColor(example.category)}
                            >
                              {example.expectedScore}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-3">
                          {example.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Tips */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    💡 Dicas para Prompts Eficazes
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <strong>🎯 Seja específico:</strong> Use palavras
                      interrogativas precisas
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <strong>🔍 Contexto é rei:</strong> Explique o cenário e
                      limitações
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <strong>⚡ Ação clara:</strong> Especifique exatamente o
                      que quer
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <strong>📝 Detalhes importam:</strong> Inclua exemplos e
                      formato desejado
                    </div>
                    <div className="border-l-4 border-red-500 pl-3">
                      <strong>🚫 Evite:</strong> Palavras vagas como "tudo",
                      "qualquer", "algo"
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" activeTab={activeTab}>
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  📋 Templates de Prompts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setPrompt(template.template);
                        setActiveTab("analyzer");
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <Badge variant="outline">{template.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                        {template.template.substring(0, 100)}...
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" activeTab={activeTab}>
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">
                    📜 Histórico de Análises
                  </h2>
                  <Button variant="outline" onClick={clearHistory}>
                    Limpar Histórico
                  </Button>
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Nenhuma análise realizada ainda
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span
                              className={`text-lg font-bold ${getScoreColor(
                                item.analysis.score
                              )}`}
                            >
                              {item.analysis.score}/5
                            </span>
                            <Badge
                              className={getCategoryColor(
                                item.analysis.category
                              )}
                            >
                              {item.analysis.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {item.timestamp.toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setPrompt(item.prompt);
                                setActiveTab("analyzer");
                              }}
                            >
                              Usar
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {item.prompt}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            {item.analysis.estimatedResponseQuality}% qualidade
                            estimada
                          </div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => ratePrompt(item.id, star)}
                                className={`text-sm ${
                                  (item.rating || 0) >= star
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" activeTab={activeTab}>
            <div className="max-w-7xl mx-auto">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    🔄 Comparação de Prompts
                  </h2>
                  <p className="text-gray-600">
                    Compare seu prompt original com a versão melhorada para
                    entender as diferenças e melhorias.
                  </p>
                </div>

                {!comparison ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nenhuma comparação disponível
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Analise um prompt primeiro e clique em "Comparar" para ver
                      a comparação lado a lado.
                    </p>
                    <Button onClick={() => setActiveTab("analyzer")}>
                      Ir para Analisador
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Textos dos Prompts */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Prompt Original */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-red-600">
                            📝 Prompt Original
                          </h3>
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            {comparison.original.detailedAnalysis.wordCount}{" "}
                            palavras
                          </Badge>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="text-sm text-red-900 whitespace-pre-wrap bg-white p-3 rounded border">
                            {prompt}
                          </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-red-600">
                              {comparison.original.score}/5
                            </span>
                            <Badge
                              className={getCategoryColor(
                                comparison.original.category
                              )}
                            >
                              {comparison.original.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-red-700">
                            {comparison.original.estimatedResponseQuality}%
                            qualidade estimada
                          </div>
                        </div>
                      </div>

                      {/* Prompt Melhorado */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-green-600">
                            ✨ Prompt Melhorado
                          </h3>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {comparison.improved.detailedAnalysis.wordCount}{" "}
                            palavras
                          </Badge>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="text-sm text-green-900 whitespace-pre-wrap bg-white p-3 rounded border font-mono">
                            {comparison.improved.rewrittenPrompt ||
                              currentAnalysis?.rewrittenPrompt}
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-green-600">
                              {comparison.improved.score}/5
                            </span>
                            <Badge
                              className={getCategoryColor(
                                comparison.improved.category
                              )}
                            >
                              {comparison.improved.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-green-700">
                            {comparison.improved.estimatedResponseQuality}%
                            qualidade estimada
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comparação de Métricas */}
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold mb-4">
                        📊 Comparação de Critérios
                      </h4>
                      <div className="space-y-4">
                        {Object.entries(comparison.original.criteria).map(
                          ([key, originalValue]) => {
                            const improvedValue =
                              comparison.improved.criteria[
                                key as keyof typeof comparison.improved.criteria
                              ];
                            const improvement = improvedValue - originalValue;

                            return (
                              <div key={key} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-red-600">
                                      {originalValue}
                                    </span>
                                    <span className="text-gray-400">→</span>
                                    <span className="text-sm text-green-600">
                                      {improvedValue}
                                    </span>
                                    <span
                                      className={`text-sm font-bold ${
                                        improvement > 0
                                          ? "text-green-600"
                                          : improvement < 0
                                          ? "text-red-600"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {improvement > 0 ? "+" : ""}
                                      {improvement}
                                    </span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-red-500 h-2 rounded-full"
                                      style={{
                                        width: `${(originalValue / 5) * 100}%`,
                                      }}
                                    />
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-green-500 h-2 rounded-full"
                                      style={{
                                        width: `${(improvedValue / 5) * 100}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </Card>

                    {/* Resumo da Melhoria */}
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-4">
                        📈 Resumo da Melhoria
                      </h4>
                      <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {comparison.improvementScore > 0 ? "+" : ""}
                            {comparison.improvementScore.toFixed(1)}
                          </div>
                          <div className="text-blue-700">Melhoria de Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            +
                            {comparison.improved.estimatedResponseQuality -
                              comparison.original.estimatedResponseQuality}
                            %
                          </div>
                          <div className="text-green-700">
                            Melhoria de Qualidade
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {comparison.improved.detailedAnalysis.wordCount -
                              comparison.original.detailedAnalysis.wordCount}
                          </div>
                          <div className="text-purple-700">
                            Diferença de Palavras
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {comparison.keyDifferences.length}
                          </div>
                          <div className="text-orange-700">
                            Melhorias Principais
                          </div>
                        </div>
                      </div>

                      {comparison.keyDifferences.length > 0 && (
                        <div className="mt-4">
                          <h5 className="font-medium text-blue-800 mb-2">
                            🎯 Principais Melhorias Identificadas:
                          </h5>
                          <div className="grid md:grid-cols-2 gap-3">
                            {comparison.keyDifferences.map((diff, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-green-600 mt-1">✓</span>
                                <span className="text-sm text-blue-700">
                                  {diff}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Análise Detalhada */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h5 className="font-semibold text-red-700 mb-3">
                          ❌ Problemas Identificados
                        </h5>
                        <div className="space-y-2">
                          {comparison.original.warnings.map((warning, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <span className="text-red-500 mt-1">•</span>
                              <span className="text-sm text-red-700">
                                {warning}
                              </span>
                            </div>
                          ))}
                          {comparison.original.warnings.length === 0 && (
                            <span className="text-sm text-gray-500">
                              Nenhum problema crítico identificado
                            </span>
                          )}
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h5 className="font-semibold text-green-700 mb-3">
                          ✅ Melhorias Aplicadas
                        </h5>
                        <div className="space-y-2">
                          {comparison.improved.improvements.map(
                            (improvement, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <span className="text-green-500 mt-1">•</span>
                                <span className="text-sm text-green-700">
                                  {improvement}
                                </span>
                              </div>
                            )
                          )}
                          {comparison.improved.improvements.length === 0 && (
                            <span className="text-sm text-gray-500">
                              Nenhuma melhoria adicional sugerida
                            </span>
                          )}
                        </div>
                      </Card>
                    </div>

                    {/* Ações */}
                    <div className="flex justify-center space-x-4 pt-4">
                      <Button
                        onClick={() => {
                          setPrompt(
                            comparison.improved.rewrittenPrompt ||
                              currentAnalysis?.rewrittenPrompt ||
                              ""
                          );
                          setActiveTab("analyzer");
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        📝 Usar Prompt Melhorado
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("analyzer")}
                      >
                        🔄 Analisar Outro Prompt
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" activeTab={activeTab}>
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  📊 Estatísticas e Insights
                </h2>

                {!statistics ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Nenhuma estatística disponível
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Realize algumas análises para ver estatísticas e insights
                      personalizados.
                    </p>
                    <Button onClick={() => setActiveTab("analyzer")}>
                      Começar Análise
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Overview Cards */}
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {statistics.totalPrompts}
                        </div>
                        <div className="text-sm text-blue-700">
                          Prompts Analisados
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {statistics.averageScore}
                        </div>
                        <div className="text-sm text-green-700">
                          Score Médio
                        </div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {statistics.improvementRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-purple-700">
                          Taxa de Melhoria
                        </div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600 capitalize">
                          {statistics.mostCommonCategory}
                        </div>
                        <div className="text-sm text-orange-700">
                          Categoria Mais Comum
                        </div>
                      </div>
                    </div>

                    {/* Distribution Chart */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        📈 Distribuição por Categoria
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(statistics.distribution).map(
                          ([category, count]) => (
                            <div
                              key={category}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-20 text-sm capitalize">
                                {category}
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-4">
                                <div
                                  className={`h-4 rounded-full ${
                                    category === "excellent"
                                      ? "bg-green-500"
                                      : category === "good"
                                      ? "bg-blue-500"
                                      : category === "fair"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{
                                    width: `${
                                      ((count as number) /
                                        statistics.totalPrompts) *
                                      100
                                    }%`,
                                  }}
                                />
                              </div>
                              <div className="w-8 text-sm text-right">
                                {count as number}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Card>

                    {/* Insights */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        💡 Insights Personalizados
                      </h3>
                      <div className="space-y-3 text-sm">
                        {statistics.averageScore < 2.5 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <strong className="text-red-800">
                              ⚠️ Área de Melhoria:
                            </strong>
                            <p className="text-red-700">
                              Seus prompts precisam de mais especificidade e
                              contexto. Foque em ser mais detalhado.
                            </p>
                          </div>
                        )}

                        {statistics.averageScore >= 2.5 &&
                          statistics.averageScore < 3.5 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <strong className="text-yellow-800">
                                📈 Progresso:
                              </strong>
                              <p className="text-yellow-700">
                                Você está no caminho certo! Trabalhe em
                                adicionar mais contexto e evitar palavras vagas.
                              </p>
                            </div>
                          )}

                        {statistics.averageScore >= 3.5 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <strong className="text-green-800">
                              🎉 Excelente!
                            </strong>
                            <p className="text-green-700">
                              Seus prompts estão bem estruturados. Continue
                              refinando para alcançar a perfeição.
                            </p>
                          </div>
                        )}

                        {statistics.improvementRate < 50 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <strong className="text-blue-800">💪 Dica:</strong>
                            <p className="text-blue-700">
                              Experimente usar mais os templates sugeridos para
                              melhorar seus prompts.
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Recommendations */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        🎯 Recomendações Personalizadas
                      </h3>
                      <div className="space-y-3">
                        {statistics.distribution.poor >
                          statistics.distribution.excellent && (
                          <div className="border-l-4 border-red-500 pl-4">
                            <strong>Foque na Clareza:</strong> Evite palavras
                            vagas e seja mais específico sobre o que você quer.
                          </div>
                        )}

                        {statistics.distribution.fair >
                          statistics.distribution.good && (
                          <div className="border-l-4 border-yellow-500 pl-4">
                            <strong>Adicione Contexto:</strong> Inclua mais
                            informações sobre o cenário e limitações.
                          </div>
                        )}

                        {statistics.mostCommonCategory === "poor" && (
                          <div className="border-l-4 border-purple-500 pl-4">
                            <strong>Use Templates:</strong> Comece com nossos
                            templates para estruturar melhor seus prompts.
                          </div>
                        )}

                        <div className="border-l-4 border-green-500 pl-4">
                          <strong>Pratique Regularmente:</strong> Quanto mais
                          você usar o sistema, melhores ficarão seus prompts.
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
}
