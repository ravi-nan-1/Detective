"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Minimize2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";
import { textSummarizer } from "@/ai/flows/text-summarizer";
import type { TextSummarizerOutput } from "@/ai/flows/text-summarizer-types";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  text: z.string().min(50, {
    message: "Text must be at least 50 characters to be summarized.",
  }),
  summaryLength: z.number().min(10).max(90),
});

export default function TextSummarizerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TextSummarizerOutput | null>(null);
  const { toast } = useToast();
  const { addHistoryItem } = useHistory();
  const [summaryLength, setSummaryLength] = useState(30);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      summaryLength: 30,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const summaryResult = await textSummarizer(values);
      setResult(summaryResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'summarizer',
        title: 'Text Summarization',
        input: values,
        result: summaryResult,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Summarization failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with the summarization. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Minimize2 className="w-8 h-8 text-accent" />
            Text Summarizer
        </h1>
      </div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Summarize Your Text</CardTitle>
            <CardDescription>
              Paste your text below and choose the desired summary length. The AI will generate a concise summary for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the text you want to summarize here..."
                          className="min-h-[250px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="summaryLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary Length: {field.value}%</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4">
                           <span className="text-xs text-muted-foreground">Shorter</span>
                           <Slider
                            defaultValue={[field.value]}
                            min={10}
                            max={90}
                            step={5}
                            onValueChange={(value) => field.onChange(value[0])}
                            />
                            <span className="text-xs text-muted-foreground">Longer</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Summarizing..." : "Summarize Text"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {result && (
          <Card>
              <CardHeader>
                  <CardTitle>Summary Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                    <div className="flex justify-around text-center p-4 rounded-lg bg-secondary/50">
                        <div>
                            <p className="text-2xl font-bold font-headline">{result.originalWordCount}</p>
                            <p className="text-xs text-muted-foreground">Original Words</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-headline">{result.summaryWordCount}</p>
                            <p className="text-xs text-muted-foreground">Summary Words</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-headline text-primary">
                                -{Math.round(100 - (result.summaryWordCount / result.originalWordCount) * 100)}%
                            </p>
                            <p className="text-xs text-muted-foreground">Reduction</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="p-4 border rounded-md bg-background min-h-[150px] whitespace-pre-wrap leading-relaxed">
                        {result.summary}
                    </div>
                </div>
              </CardContent>
            </Card>
        )}

      </div>
    </div>
  );
}
