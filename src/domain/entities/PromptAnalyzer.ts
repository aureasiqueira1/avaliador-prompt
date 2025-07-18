import {
  PromptAnalysis,
  PromptComparison,
  PromptTemplate,
} from "../../types/prompt";

export class PromptAnalyzer {
  private readonly criteria = {
    length: { min: 20, ideal: 80, max: 300 },
    specificity: [
      "o que",
      "como",
      "quando",
      "onde",
      "por que",
      "qual",
      "quem",
      "quantos",
      "quanto",
    ],
    context: [
      "para",
      "em",
      "com",
      "sobre",
      "durante",
      "usando",
      "no contexto",
      "considerando",
      "levando em conta",
    ],
    clarity: [
      "vago",
      "genérico",
      "tudo",
      "qualquer",
      "algo",
      "meio que",
      "tipo",
      "sei lá",
      "talvez",
      "acho",
    ],
    actionWords: [
      "criar",
      "explicar",
      "analisar",
      "comparar",
      "resolver",
      "implementar",
      "desenvolver",
      "gerar",
      "construir",
      "projetar",
    ],
    technicalTerms: [
      "api",
      "framework",
      "biblioteca",
      "função",
      "método",
      "classe",
      "algoritmo",
      "database",
      "servidor",
      "client",
    ],
    urgencyWords: [
      "urgente",
      "rápido",
      "agora",
      "imediatamente",
      "asap",
      "hoje",
      "já",
    ],
    fillerWords: [
      "né",
      "então",
      "tipo assim",
      "sabe",
      "entendeu",
      "bem",
      "meio",
      "mais ou menos",
    ],
    questionWords: [
      "como",
      "qual",
      "quando",
      "onde",
      "por que",
      "quem",
      "quantos",
      "quanto",
      "onde",
    ],
    detailWords: [
      "específico",
      "detalhado",
      "completo",
      "exemplo",
      "passo a passo",
      "tutorial",
      "guia",
    ],
  };

  private readonly templates = {
    programming: {
      template:
        "Preciso {action} em {technology} para {purpose}. Contexto: {context}. Requisitos específicos: {requirements}. Nível de experiência: {level}. Pode incluir exemplos práticos e explicações detalhadas?",
      placeholders: [
        "action",
        "technology",
        "purpose",
        "context",
        "requirements",
        "level",
      ],
    },
    learning: {
      template:
        "Quero aprender {topic} focando em {aspect}. Meu nível atual: {level}. Objetivo: {goal}. Prefiro explicações {style} com exemplos práticos. Tempo disponível: {time}.",
      placeholders: ["topic", "aspect", "level", "goal", "style", "time"],
    },
    problem_solving: {
      template:
        "Tenho um problema: {issue}. Contexto: {context}. Já tentei: {attempts}. Restrições: {constraints}. Preciso de uma solução que {requirements}. Prazo: {deadline}.",
      placeholders: [
        "issue",
        "context",
        "attempts",
        "constraints",
        "requirements",
        "deadline",
      ],
    },
    creative: {
      template:
        "Preciso criar {deliverable} para {audience}. Objetivo: {goal}. Tom: {tone}. Restrições: {constraints}. Deve incluir: {elements}. Inspiração: {inspiration}.",
      placeholders: [
        "deliverable",
        "audience",
        "goal",
        "tone",
        "constraints",
        "elements",
        "inspiration",
      ],
    },
  };

  public analyzePrompt(prompt: string): PromptAnalysis {
    const analysis: PromptAnalysis = {
      score: 0,
      feedback: [],
      suggestions: [],
      rewrittenPrompt: "",
      criteria: {
        length: 0,
        specificity: 0,
        clarity: 0,
        context: 0,
        actionWords: 0,
        complexity: 0,
      },
      category: "poor",
      estimatedResponseQuality: 0,
      tags: [],
      warnings: [],
      improvements: [],
      detailedAnalysis: {
        wordCount: 0,
        sentenceCount: 0,
        avgWordsPerSentence: 0,
        readabilityScore: 0,
        technicalTerms: 0,
        questionWords: 0,
        vagueWords: 0,
      },
    };

    // Análise detalhada
    this.performDetailedAnalysis(prompt, analysis);

    // Análise rigorosa dos critérios
    analysis.criteria.length = this.analyzeLengthCriteria(prompt, analysis);
    analysis.criteria.specificity = this.analyzeSpecificity(prompt, analysis);
    analysis.criteria.clarity = this.analyzeClarity(prompt, analysis);
    analysis.criteria.context = this.analyzeContext(prompt, analysis);
    analysis.criteria.actionWords = this.analyzeActionWords(prompt, analysis);
    analysis.criteria.complexity = this.analyzeComplexity(prompt, analysis);

    // Análises adicionais rigorosas
    this.analyzeFillerWords(prompt, analysis);
    this.analyzeStructure(prompt, analysis);
    this.analyzeCompleteness(prompt, analysis);

    // Cálculo da pontuação com pesos diferentes
    const weightedScore = this.calculateWeightedScore(analysis.criteria);
    analysis.score = Math.max(1, Math.min(5, weightedScore));

    // Cálculo rigoroso da qualidade estimada
    analysis.estimatedResponseQuality = this.calculateRigorousQuality(analysis);
    analysis.category = this.determineCategory(analysis.score);

    // Geração do prompt melhorado
    analysis.rewrittenPrompt = this.generateImprovedPrompt(prompt, analysis);
    analysis.tags = this.extractTags(prompt);

    return analysis;
  }

  private performDetailedAnalysis(
    prompt: string,
    analysis: PromptAnalysis
  ): void {
    const words = prompt.trim().split(/\s+/);
    const sentences = prompt.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    analysis.detailedAnalysis.wordCount = words.length;
    analysis.detailedAnalysis.sentenceCount = sentences.length;
    analysis.detailedAnalysis.avgWordsPerSentence =
      words.length / Math.max(1, sentences.length);

    // Análise de legibilidade simplificada
    analysis.detailedAnalysis.readabilityScore =
      this.calculateReadabilityScore(prompt);

    // Contagem de termos técnicos
    const lowerPrompt = prompt.toLowerCase();
    analysis.detailedAnalysis.technicalTerms =
      this.criteria.technicalTerms.filter((term) =>
        lowerPrompt.includes(term)
      ).length;

    // Contagem de palavras interrogativas
    analysis.detailedAnalysis.questionWords =
      this.criteria.questionWords.filter((word) =>
        lowerPrompt.includes(word)
      ).length;

    // Contagem de palavras vagas
    analysis.detailedAnalysis.vagueWords = this.criteria.clarity.filter(
      (word) => lowerPrompt.includes(word)
    ).length;
  }

  private calculateReadabilityScore(prompt: string): number {
    const words = prompt.split(/\s+/).length;
    const sentences = prompt
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const avgWordsPerSentence = words / Math.max(1, sentences);

    // Pontuação baseada na complexidade das frases
    if (avgWordsPerSentence < 10) return 90;
    if (avgWordsPerSentence < 15) return 70;
    if (avgWordsPerSentence < 20) return 50;
    return 30;
  }

  private analyzeLengthCriteria(
    prompt: string,
    analysis: PromptAnalysis
  ): number {
    const wordCount = prompt.split(/\s+/).length;

    // Critérios mais rigorosos
    if (wordCount < 5) {
      analysis.feedback.push(
        "❌ Prompt extremamente curto - impossível fornecer resposta útil"
      );
      analysis.warnings.push("Prompt muito curto para análise eficaz");
      return 1;
    } else if (wordCount < 10) {
      analysis.feedback.push(
        "⚠️ Prompt muito curto - falta informação essencial"
      );
      analysis.suggestions.push(
        "Adicione pelo menos 15-20 palavras com contexto específico"
      );
      return 2;
    } else if (wordCount < 15) {
      analysis.feedback.push("📏 Prompt curto - poderia ser mais detalhado");
      analysis.suggestions.push("Expanda com mais contexto e especificações");
      return 3;
    } else if (wordCount <= 50) {
      analysis.feedback.push("✅ Comprimento adequado para um prompt eficaz");
      return 4;
    } else if (wordCount <= 100) {
      analysis.feedback.push(
        "📚 Prompt detalhado - bom para respostas complexas"
      );
      return 5;
    } else {
      analysis.feedback.push(
        "⚠️ Prompt muito longo - considere dividir em partes"
      );
      analysis.suggestions.push(
        "Divida em múltiplas perguntas ou use tópicos numerados"
      );
      return 3;
    }
  }

  private analyzeSpecificity(prompt: string, analysis: PromptAnalysis): number {
    const lowerPrompt = prompt.toLowerCase();
    const specificWords = this.criteria.specificity.filter((word) =>
      lowerPrompt.includes(word)
    );
    const questionWords = this.criteria.questionWords.filter((word) =>
      lowerPrompt.includes(word)
    );

    const totalSpecificWords = [
      ...new Set([...specificWords, ...questionWords]),
    ].length;

    if (totalSpecificWords === 0) {
      analysis.feedback.push(
        "❌ Sem palavras interrogativas - prompt muito genérico"
      );
      analysis.warnings.push("Ausência total de especificidade");
      analysis.suggestions.push(
        "Use palavras como: como, qual, quando, onde, por que"
      );
      return 1;
    } else if (totalSpecificWords === 1) {
      analysis.feedback.push(
        "⚠️ Baixa especificidade - apenas uma palavra interrogativa"
      );
      analysis.suggestions.push(
        "Adicione mais detalhes específicos sobre o que você quer"
      );
      return 2;
    } else if (totalSpecificWords === 2) {
      analysis.feedback.push("📝 Especificidade razoável - pode melhorar");
      return 3;
    } else if (totalSpecificWords === 3) {
      analysis.feedback.push(
        "✅ Boa especificidade com múltiplas palavras-chave"
      );
      return 4;
    } else {
      analysis.feedback.push(
        "🎯 Excelente especificidade - muito bem definido"
      );
      return 5;
    }
  }

  private analyzeClarity(prompt: string, analysis: PromptAnalysis): number {
    const lowerPrompt = prompt.toLowerCase();
    const vagueWords = this.criteria.clarity.filter((word) =>
      lowerPrompt.includes(word)
    );
    const fillerWords = this.criteria.fillerWords.filter((word) =>
      lowerPrompt.includes(word)
    );

    const totalVagueWords = [...new Set([...vagueWords, ...fillerWords])]
      .length;

    if (totalVagueWords >= 3) {
      analysis.feedback.push("❌ Muitas palavras vagas - prompt confuso");
      analysis.warnings.push("Excesso de palavras que prejudicam a clareza");
      analysis.suggestions.push(
        `Remova palavras vagas: ${[...vagueWords, ...fillerWords].join(", ")}`
      );
      return 1;
    } else if (totalVagueWords === 2) {
      analysis.feedback.push("⚠️ Algumas palavras vagas - pode ser mais claro");
      analysis.suggestions.push("Seja mais específico, evite termos genéricos");
      return 2;
    } else if (totalVagueWords === 1) {
      analysis.feedback.push("📝 Mostly clear with minor vague terms");
      return 3;
    } else {
      analysis.feedback.push("✨ Prompt claro e bem definido");
      return 5;
    }
  }

  private analyzeContext(prompt: string, analysis: PromptAnalysis): number {
    const lowerPrompt = prompt.toLowerCase();
    const contextWords = this.criteria.context.filter((word) =>
      lowerPrompt.includes(word)
    );
    const detailWords = this.criteria.detailWords.filter((word) =>
      lowerPrompt.includes(word)
    );

    const totalContextWords = [...new Set([...contextWords, ...detailWords])]
      .length;

    // Verificar se há contexto implícito
    const hasImplicitContext =
      /\b(projeto|trabalho|estudo|empresa|cliente|usuário)\b/i.test(prompt);
    const hasTechnicalContext = analysis.detailedAnalysis.technicalTerms > 0;

    let score = 0;
    if (
      totalContextWords === 0 &&
      !hasImplicitContext &&
      !hasTechnicalContext
    ) {
      analysis.feedback.push("❌ Sem contexto - resposta será genérica");
      analysis.warnings.push("Ausência total de contexto");
      analysis.suggestions.push(
        "Adicione: finalidade, tecnologia, público-alvo, restrições"
      );
      score = 1;
    } else if (totalContextWords === 1 || hasImplicitContext) {
      analysis.feedback.push("⚠️ Contexto mínimo - pode ser mais rico");
      analysis.suggestions.push(
        "Expanda o contexto com mais detalhes específicos"
      );
      score = 2;
    } else if (
      totalContextWords === 2 ||
      (hasImplicitContext && hasTechnicalContext)
    ) {
      analysis.feedback.push("📝 Contexto razoável - bom ponto de partida");
      score = 3;
    } else if (totalContextWords >= 3) {
      analysis.feedback.push("✅ Contexto rico e detalhado");
      score = 4;
    }

    // Bonus por contexto técnico
    if (hasTechnicalContext && score >= 3) {
      score = Math.min(5, score + 1);
      analysis.feedback.push("🔧 Contexto técnico identificado - excelente!");
    }

    return score;
  }

  private analyzeActionWords(prompt: string, analysis: PromptAnalysis): number {
    const lowerPrompt = prompt.toLowerCase();
    const actionWords = this.criteria.actionWords.filter((word) =>
      lowerPrompt.includes(word)
    );

    if (actionWords.length === 0) {
      analysis.feedback.push("❌ Sem verbos de ação - objetivo não claro");
      analysis.warnings.push("Ação desejada não especificada");
      analysis.suggestions.push(
        "Use verbos claros: criar, explicar, analisar, implementar"
      );
      return 1;
    } else if (actionWords.length === 1) {
      analysis.feedback.push("✅ Ação clara especificada");
      return 4;
    } else if (actionWords.length === 2) {
      analysis.feedback.push("⚡ Múltiplas ações bem definidas");
      return 5;
    } else {
      analysis.feedback.push("⚠️ Muitas ações - pode ser confuso");
      analysis.suggestions.push("Foque em 1-2 ações principais");
      return 3;
    }
  }

  private analyzeComplexity(prompt: string, analysis: PromptAnalysis): number {
    const avgWordsPerSentence = analysis.detailedAnalysis.avgWordsPerSentence;
    const technicalTerms = analysis.detailedAnalysis.technicalTerms;
    const questionWords = analysis.detailedAnalysis.questionWords;

    let complexityScore = 0;

    // Complexidade baseada na estrutura
    if (avgWordsPerSentence < 8) {
      complexityScore += 2; // Muito simples
    } else if (avgWordsPerSentence < 15) {
      complexityScore += 4; // Complexidade ideal
    } else if (avgWordsPerSentence < 25) {
      complexityScore += 3; // Um pouco complexo
    } else {
      complexityScore += 1; // Muito complexo
    }

    // Bonus por termos técnicos
    if (technicalTerms > 0) complexityScore += 1;
    if (technicalTerms > 2) complexityScore += 1;

    // Bonus por múltiplas perguntas
    if (questionWords > 1) complexityScore += 1;

    return Math.min(5, complexityScore);
  }

  private analyzeFillerWords(prompt: string, analysis: PromptAnalysis): void {
    const lowerPrompt = prompt.toLowerCase();
    const fillerWords = this.criteria.fillerWords.filter((word) =>
      lowerPrompt.includes(word)
    );

    if (fillerWords.length > 0) {
      analysis.warnings.push(
        `Palavras desnecessárias detectadas: ${fillerWords.join(", ")}`
      );
      analysis.improvements.push(
        "Remova palavras de preenchimento para maior clareza"
      );
    }
  }

  private analyzeStructure(prompt: string, analysis: PromptAnalysis): void {
    const sentences = prompt.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    if (sentences.length === 1 && prompt.length > 100) {
      analysis.warnings.push("Prompt muito longo em uma única frase");
      analysis.improvements.push(
        "Divida em frases menores para melhor legibilidade"
      );
    }

    const hasQuestionMark = prompt.includes("?");
    if (!hasQuestionMark && analysis.detailedAnalysis.questionWords > 0) {
      analysis.improvements.push(
        "Considere usar pontos de interrogação para perguntas"
      );
    }
  }

  private analyzeCompleteness(prompt: string, analysis: PromptAnalysis): void {
    const lowerPrompt = prompt.toLowerCase();
    const hasWho = /\b(quem|usuário|cliente|público)\b/.test(lowerPrompt);
    const hasWhat = /\b(o que|qual|que tipo)\b/.test(lowerPrompt);
    const hasWhy = /\b(por que|porque|finalidade|objetivo)\b/.test(lowerPrompt);
    const hasHow = /\b(como|de que forma|qual método)\b/.test(lowerPrompt);
    const hasWhen = /\b(quando|prazo|tempo|deadline)\b/.test(lowerPrompt);
    const hasWhere = /\b(onde|contexto|ambiente)\b/.test(lowerPrompt);

    const completenessScore = [
      hasWho,
      hasWhat,
      hasWhy,
      hasHow,
      hasWhen,
      hasWhere,
    ].filter(Boolean).length;

    if (completenessScore < 2) {
      analysis.warnings.push(
        "Informações essenciais faltando (quem, o que, por que, como, quando, onde)"
      );
      analysis.improvements.push(
        "Responda: Para quem? O que exatamente? Por que? Como deve ser feito?"
      );
    } else if (completenessScore < 4) {
      analysis.improvements.push(
        "Considere adicionar mais detalhes sobre contexto e objetivos"
      );
    }
  }

  private calculateWeightedScore(criteria: any): number {
    const weights = {
      specificity: 0.25, // 25% - Muito importante
      clarity: 0.25, // 25% - Muito importante
      context: 0.2, // 20% - Importante
      actionWords: 0.15, // 15% - Moderadamente importante
      length: 0.1, // 10% - Menos importante
      complexity: 0.05, // 5% - Menos importante
    };

    let weightedSum = 0;
    for (const [criterion, weight] of Object.entries(weights)) {
      weightedSum += criteria[criterion] * weight;
    }

    return Math.round(weightedSum * 10) / 10; // Arredondar para 1 casa decimal
  }

  private calculateRigorousQuality(analysis: PromptAnalysis): number {
    const baseQuality = analysis.score * 15; // Base mais baixa

    // Penalidades
    let penalties = 0;
    if (analysis.warnings.length > 0) penalties += analysis.warnings.length * 5;
    if (analysis.detailedAnalysis.vagueWords > 0)
      penalties += analysis.detailedAnalysis.vagueWords * 10;
    if (analysis.detailedAnalysis.wordCount < 10) penalties += 20;

    // Bônus
    let bonus = 0;
    if (analysis.detailedAnalysis.technicalTerms > 0) bonus += 10;
    if (analysis.detailedAnalysis.questionWords > 1) bonus += 10;
    if (analysis.improvements.length === 0) bonus += 15;

    const quality = Math.max(5, Math.min(100, baseQuality + bonus - penalties));
    return Math.round(quality);
  }

  private determineCategory(
    score: number
  ): "poor" | "fair" | "good" | "excellent" {
    if (score >= 4.5) return "excellent";
    if (score >= 3.5) return "good";
    if (score >= 2.5) return "fair";
    return "poor";
  }

  private generateImprovedPrompt(
    originalPrompt: string,
    analysis: PromptAnalysis
  ): string {
    const lowerPrompt = originalPrompt.toLowerCase();

    // Detectar informações específicas do prompt original
    const detectedTech = this.extractTechnology(lowerPrompt);
    const detectedAction = this.extractAction(lowerPrompt);
    const detectedContext = this.extractContext(lowerPrompt);

    // Construir prompt melhorado baseado no original
    let improved = "";

    // Começar com uma pergunta específica se não houver
    if (analysis.detailedAnalysis.questionWords === 0) {
      improved = `Como posso ${detectedAction || "resolver"} `;
    } else {
      improved =
        originalPrompt.charAt(0).toUpperCase() + originalPrompt.slice(1);
    }

    // Adicionar contexto específico baseado no que foi detectado
    if (analysis.criteria.context < 3) {
      improved += this.buildContextualPrompt(
        originalPrompt,
        detectedTech,
        detectedAction,
        detectedContext
      );
    }

    // Adicionar especificações baseadas no prompt original
    if (analysis.criteria.specificity < 3) {
      improved += this.addSpecificDetails(originalPrompt, detectedTech);
    }

    // Adicionar formato de resposta apropriado
    improved += this.addResponseFormat(detectedTech, detectedAction);

    return improved.trim();
  }

  private extractTechnology(prompt: string): string {
    const techs = [
      "python",
      "java",
      "javascript",
      "react",
      "node",
      "css",
      "html",
      "sql",
      "c++",
      "c#",
      "php",
    ];
    for (const tech of techs) {
      if (prompt.includes(tech)) {
        return tech;
      }
    }
    return "";
  }

  private extractAction(prompt: string): string {
    const actions = [
      "criar",
      "fazer",
      "desenvolver",
      "implementar",
      "resolver",
      "construir",
      "programar",
      "codificar",
    ];
    for (const action of actions) {
      if (prompt.includes(action)) {
        return action;
      }
    }
    if (prompt.includes("ajuda")) return "resolver problemas";
    if (prompt.includes("como")) return "implementar";
    return "desenvolver";
  }

  private extractContext(prompt: string): string {
    if (prompt.includes("projeto")) return "projeto";
    if (prompt.includes("trabalho")) return "trabalho";
    if (prompt.includes("estudo")) return "estudo";
    if (prompt.includes("empresa")) return "empresa";
    if (prompt.includes("sistema")) return "sistema";
    return "desenvolvimento";
  }

  private buildContextualPrompt(
    original: string,
    tech: string,
    action: string,
    context: string
  ): string {
    let contextual = "";

    if (tech) {
      contextual += ` uma solução em ${
        tech.charAt(0).toUpperCase() + tech.slice(1)
      }`;
    }

    if (original.includes("função")) {
      contextual += ` que implemente uma função`;
    } else if (original.includes("sistema")) {
      contextual += ` para um sistema`;
    } else if (original.includes("aplicação")) {
      contextual += ` para uma aplicação`;
    }

    // Adicionar contexto específico baseado no prompt original
    if (original.includes("média") || original.includes("calcular")) {
      contextual += ` para cálculos matemáticos`;
    } else if (original.includes("lista") || original.includes("array")) {
      contextual += ` para manipulação de dados`;
    } else if (original.includes("banco") || original.includes("database")) {
      contextual += ` para gerenciamento de dados`;
    }

    contextual += `. Contexto: ${context} usando ${
      tech || "tecnologia apropriada"
    }.`;

    return contextual;
  }

  private addSpecificDetails(original: string, tech: string): string {
    let details = "";

    // Adicionar requisitos específicos baseados no prompt original
    if (original.includes("erro") || original.includes("problema")) {
      details += ` Preciso de uma solução que trate erros adequadamente`;
    }

    if (original.includes("lista") || original.includes("array")) {
      details += ` e funcione com diferentes tipos de dados`;
    }

    if (original.includes("função")) {
      details += ` incluindo validação de entrada`;
    }

    details += `. Requisitos: código limpo, bem documentado`;

    if (tech) {
      details += ` e seguindo boas práticas de ${
        tech.charAt(0).toUpperCase() + tech.slice(1)
      }`;
    }

    return details;
  }

  private addResponseFormat(tech: string, action: string): string {
    let format = `. Formato desejado: `;

    if (tech) {
      format += `código ${
        tech.charAt(0).toUpperCase() + tech.slice(1)
      } funcional`;
    } else {
      format += `explicação passo a passo`;
    }

    format += `, exemplos práticos de uso`;

    if (tech && (action.includes("criar") || action.includes("implementar"))) {
      format += `, e comentários explicativos no código`;
    }

    return format;
  }

  private extractTags(prompt: string): string[] {
    const tags: string[] = [];
    const lowerPrompt = prompt.toLowerCase();

    // Tags técnicas
    const techKeywords = [
      "python",
      "javascript",
      "react",
      "node",
      "css",
      "html",
      "sql",
      "api",
      "database",
    ];
    techKeywords.forEach((keyword) => {
      if (lowerPrompt.includes(keyword)) {
        tags.push(keyword);
      }
    });

    // Tags de categoria
    if (lowerPrompt.includes("aprender") || lowerPrompt.includes("explicar"))
      tags.push("learning");
    if (lowerPrompt.includes("criar") || lowerPrompt.includes("construir"))
      tags.push("creative");
    if (lowerPrompt.includes("problema") || lowerPrompt.includes("erro"))
      tags.push("problem-solving");
    if (lowerPrompt.includes("analisar") || lowerPrompt.includes("comparar"))
      tags.push("analysis");
    if (lowerPrompt.includes("urgente") || lowerPrompt.includes("rápido"))
      tags.push("urgent");

    // Tags de complexidade
    if (prompt.split(/\s+/).length > 50) tags.push("complex");
    if (prompt.split(/\s+/).length < 10) tags.push("simple");

    return [...new Set(tags)];
  }

  public comparePrompts(original: string, improved: string): PromptComparison {
    const originalAnalysis = this.analyzePrompt(original);
    const improvedAnalysis = this.analyzePrompt(improved);

    const improvementScore = improvedAnalysis.score - originalAnalysis.score;
    const keyDifferences: string[] = [];

    if (
      improvedAnalysis.criteria.specificity >
      originalAnalysis.criteria.specificity
    ) {
      keyDifferences.push("Melhoria na especificidade");
    }
    if (improvedAnalysis.criteria.clarity > originalAnalysis.criteria.clarity) {
      keyDifferences.push("Melhoria na clareza");
    }
    if (improvedAnalysis.criteria.context > originalAnalysis.criteria.context) {
      keyDifferences.push("Melhoria no contexto");
    }

    return {
      original: originalAnalysis,
      improved: improvedAnalysis,
      improvementScore,
      keyDifferences,
    };
  }

  public getPromptTemplates(): PromptTemplate[] {
    return [
      {
        id: "1",
        name: "Desenvolvimento de Software",
        category: "programming",
        template:
          "Preciso {criar/implementar/desenvolver} {tipo de aplicação} usando {tecnologia}. O objetivo é {finalidade específica}. Requisitos: {listar requisitos}. Restrições: {limitações}. Público-alvo: {usuários}. Pode incluir exemplos de código e explicações detalhadas?",
        description:
          "Template para solicitações de programação e desenvolvimento",
        tags: ["programming", "development", "code"],
        useCount: 0,
        difficulty: "intermediate",
      },
      {
        id: "2",
        name: "Aprendizado e Educação",
        category: "learning",
        template:
          "Quero aprender {tópico específico} focando em {área de interesse}. Meu nível atual: {iniciante/intermediário/avançado}. Objetivo: {meta de aprendizado}. Prefiro {formato de explicação}. Tempo disponível: {duração}. Pode criar um plano de estudos estruturado?",
        description: "Template para solicitações de aprendizado",
        tags: ["learning", "education", "study"],
        useCount: 0,
        difficulty: "beginner",
      },
      {
        id: "3",
        name: "Resolução de Problemas",
        category: "problem_solving",
        template:
          "Estou enfrentando o seguinte problema: {descrição detalhada}. Contexto: {situação atual}. Já tentei: {tentativas anteriores}. Restrições: {limitações}. Objetivo: {resultado desejado}. Prazo: {tempo disponível}. Preciso de uma solução prática e viável.",
        description: "Template para resolução de problemas específicos",
        tags: ["problem-solving", "troubleshooting", "solution"],
        useCount: 0,
        difficulty: "intermediate",
      },
      {
        id: "4",
        name: "Criação de Conteúdo",
        category: "creative",
        template:
          "Preciso criar {tipo de conteúdo} para {público-alvo}. Objetivo: {finalidade}. Tom: {formal/informal/técnico}. Tamanho: {extensão desejada}. Deve incluir: {elementos obrigatórios}. Inspirações: {referências}. Formato: {estrutura desejada}.",
        description: "Template para criação de conteúdo criativo",
        tags: ["creative", "content", "writing"],
        useCount: 0,
        difficulty: "beginner",
      },
    ];
  }
}
