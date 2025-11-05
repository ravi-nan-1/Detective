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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compareTwoTexts } from "@/ai/flows/compare-two-texts";
import type { AnalysisResult } from "@/lib/types";
import { ResultsDisplay } from "@/components/results-display";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";

const formSchema = z.object({
  text1: z.string().min(50, {
    message: "Text must be at least 50 characters.",
  }),
  text2: z.string().min(50, {
    message: "Text must be at least 50 characters.",
  }),
});

export default function TextComparisonPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text1: "",
      text2: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await compareTwoTexts(values);
      setResult(analysisResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'text',
        title: 'Text vs Text Comparison',
        input: values,
        result: analysisResult,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Text vs. Text Comparison
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Compare Two Texts</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="text1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the source text here..."
                            className="min-h-[200px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="text2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comparison Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the text to compare here..."
                            className="min-h-[200px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Analyzing..." : "Check for Plagiarism"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
           <div className="col-span-2">
            <ResultsDisplay result={result} />
           </div>
        )}
      </div>
    </div>
  );
}
