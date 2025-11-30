"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";
import { advancedPlagiarismCheck } from "@/ai/flows/advanced-plagiarism-check";
import type { AdvancedPlagiarismCheckOutput } from "@/ai/flows/advanced-plagiarism-check";
import { CircularProgress } from "@/components/circular-progress";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  text: z.string().min(100, {
    message: "Text must be at least 100 characters for advanced analysis.",
  }),
});

export default function AdvancedCheckPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdvancedPlagiarismCheckOutput | null>(null);
  const { toast } = useToast();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await advancedPlagiarismCheck(values);
      setResult(analysisResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'advanced',
        title: 'Advanced Plagiarism Check',
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
          "There was a problem with the advanced analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderHighlightedText = (text: string) => {
    const parts = text.split(/(\[PLAGIARIZED\].*?\[\/PLAGIARIZED\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[PLAGIARIZED]')) {
        return (
          <mark key={index} className="bg-destructive/20 text-destructive-foreground p-1 rounded-md">
            {part.replace('[PLAGIARIZED]', '').replace('[/PLAGIARIZED]', '')}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" />
            Advanced Plagiarism Engine
        </h1>
      </div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Text for Plagiarism</CardTitle>
            <CardDescription>
              Our most powerful AI engine will analyze your text for direct plagiarism, paraphrasing, structural similarity, and more.
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
                      <FormLabel>Text to Analyze</FormLabel>
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
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Analyzing..." : "Run Advanced Analysis"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        {result && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Final Plagiarism Report</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                 <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-secondary/50">
                    <h3 className="text-lg font-semibold text-center">Overall Plagiarism</h3>
                    <CircularProgress value={result.finalReport.plagiarism} />
                </div>
                 <div className="md:col-span-2 space-y-4 p-6 rounded-lg bg-secondary/50">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Unique Content Score</span>
                        <Badge variant="secondary">{(result.finalReport.originality).toFixed(0)}%</Badge>
                    </div>
                     <Separator />
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Paraphrasing Score</span>
                        <Badge variant="secondary">{result.finalReport.paraphrasing}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Readability Score</span>
                        <Badge variant="secondary">{result.finalReport.readabilityScore}</Badge>
                    </div>
                    <Separator />
                     <div className="space-y-2">
                         <span className="font-medium">Recommendations</span>
                         <p className="text-sm text-muted-foreground">{result.finalReport.fixRecommendations}</p>
                     </div>
                 </div>
              </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Highlighted Text</CardTitle>
                    <CardDescription>Potentially plagiarized sections are marked.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border rounded-md bg-background min-h-[150px] whitespace-pre-wrap leading-relaxed">
                        {renderHighlightedText(result.highlightedText)}
                    </div>
                     <div className="mt-4">
                        <p className="text-sm font-medium">Source-Type Guess:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                        {result.sourceTypeGuess.map((source, index) => (
                            <Badge key={index} variant="outline">{source}</Badge>
                        ))}
                        </div>
                    </div>
                </CardContent>
             </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentence-by-Sentence Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Sentence</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.sentenceAnalysis.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-muted-foreground text-sm">"{item.sentence}"</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'Original' ? 'secondary' : item.status === 'Possibly Plagiarized' ? 'default' : 'destructive'}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{item.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Rewrite Suggestions</CardTitle>
                    <CardDescription>AI-powered suggestions to make your text more original.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {result.rewriteSuggestions.map((suggestion, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>
                                    <p className="text-left text-sm italic text-muted-foreground pr-4">"{suggestion.plagiarizedText}"</p>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="font-semibold flex items-center gap-2"><Wand2 className="w-4 h-4 text-primary"/>Human-like Rewrite</h4>
                                        <p className="p-3 border rounded-md bg-background text-sm">{suggestion.humanRewrite}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-semibold flex items-center gap-2"><Wand2 className="w-4 h-4 text-primary"/>Simplified Rewrite</h4>
                                        <p className="p-3 border rounded-md bg-background text-sm">{suggestion.simplifiedRewrite}</p>
                                    </div>
                                     <div className="space-y-2">
                                        <h4 className="font-semibold flex items-center gap-2"><Wand2 className="w-4 h-4 text-primary"/>Professional Rewrite</h4>
                                        <p className="p-3 border rounded-md bg-background text-sm">{suggestion.professionalRewrite}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}
