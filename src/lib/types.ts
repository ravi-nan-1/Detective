export interface AnalysisResult {
  similarityScore: number;
  matchedPhrases?: string[];
}

export interface ContextualAnalysisResult {
  similarityResults: {
    referenceText: string;
    similarityScore: number;
    isPlagiarized: boolean;
  }[];
}

export type HistoryItem = {
  id: string;
  type: "text" | "file" | "contextual" | "advanced" | "grammar" | "summarizer";
  date: string;
  input: any;
  result: any; // AnalysisResult | ContextualAnalysisResult - Relaxing for simplicity in local storage
  title: string;
};