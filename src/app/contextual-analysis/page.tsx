"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { analyzeContextAndCompare } from "@/ai/flows/ai-powered-contextual-analysis";
import type { ContextualAnalysisResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  inputText: z.string().min(100, {
    message: "Text must be at least 100 characters for contextual analysis.",
  }),
});

// A simulated database of reference texts
const referenceDatabase = [
  "The quick brown fox jumps over the lazy dog. This is a classic sentence used for typography samples.",
  "In the field of computer science, algorithms are the cornerstone of efficient problem-solving. Key examples include sorting algorithms like quicksort and mergesort.",
  "William Shakespeare's play 'Hamlet' explores themes of revenge, madness, and moral corruption. The protagonist, Prince Hamlet, is one of the most complex characters in literature.",
  "The theory of relativity, developed by Albert Einstein, revolutionized our understanding of space, time, gravity, and the universe. It consists of two major theories: special relativity and general relativity.",
  "Climate change is a long-term change in the average weather patterns that have come to define Earth's local, regional and global climates. These changes have a broad range of observed effects that are synonymous with the term.",
];

export default function ContextualAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ContextualAnalysisResult | null>(null);
  const { toast } = useToast();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeContextAndCompare({
        ...values,
        referenceDatabase,
      });
      setResult(analysisResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'contextual',
        title: 'Contextual Analysis',
        input: values,
        result: analysisResult,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with the contextual analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          AI Contextual Analysis
        </h1>
      </div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Check Against a Reference Database</CardTitle>
            <CardDescription>
                Our AI will analyze your text for conceptual similarities—not just word-for-word matches—by comparing it against a simulated database of documents. This mimics how modern plagiarism detectors check against web pages and academic papers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="inputText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the text to analyze here..."
                          className="min-h-[250px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Analyzing..." : "Run Contextual Analysis"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Reference Source</TableHead>
                    <TableHead className="text-center">Similarity</TableHead>
                    <TableHead className="text-right">Verdict</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.similarityResults.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-muted-foreground text-xs italic">"{item.referenceText.substring(0, 100)}..."</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center gap-2 justify-center">
                            <Progress value={item.similarityScore * 100} className="w-[100px]" />
                            <span>{(item.similarityScore * 100).toFixed(0)}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={item.isPlagiarized ? "destructive" : "secondary"}>
                          {item.isPlagiarized ? "Potential Match" : "Unique"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
