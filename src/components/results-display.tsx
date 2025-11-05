"use client";

import type { AnalysisResult } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { CircularProgress } from "./circular-progress";

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {

  const handleDownloadTxt = () => {
    const reportTitle = "Plagiarism Detective - Similarity Report";
    const reportDate = `Generated on: ${new Date().toLocaleString()}`;
    const similarity = `Similarity Score: ${(result.similarityScore * 100).toFixed(2)}%`;
    const matchedPhrasesHeader = "\n--- Matched Phrases ---";
    const matchedPhrasesText = result.matchedPhrases && result.matchedPhrases.length > 0 
      ? result.matchedPhrases.join("\n- ") 
      : "No specific matched phrases found.";

    const content = `${reportTitle}\n${reportDate}\n\n${similarity}\n${matchedPhrasesHeader}\n- ${matchedPhrasesText}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plagiarism_report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Report</CardTitle>
        <CardDescription>
          Here's the breakdown of the similarity check.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-secondary/50">
          <h3 className="text-lg font-semibold text-center">Similarity Score</h3>
          <CircularProgress value={result.similarityScore * 100} />
        </div>
        <div className="md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Matched Phrases</h3>
            <Separator />
            {result.matchedPhrases && result.matchedPhrases.length > 0 ? (
                <div className="mt-4 max-h-48 overflow-y-auto pr-4">
                    <ul className="space-y-2">
                        {result.matchedPhrases.map((phrase, index) => (
                            <li key={index} className="p-2 text-sm italic border-l-4 rounded-r-md bg-muted border-accent">
                                "{phrase}"
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mt-4 text-sm text-muted-foreground">No specific matched phrases were identified by the AI.</p>
            )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownloadTxt}>
            <Download className="mr-2 h-4 w-4" />
            Download Report (.txt)
        </Button>
      </CardFooter>
    </Card>
  );
}
