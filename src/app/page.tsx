"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, ArrowRight } from "lucide-react";
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
import { compareTwoTexts } from "@/ai/flows/compare-two-texts";
import type { AnalysisResult } from "@/lib/types";
import { ResultsDisplay } from "@/components/results-display";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

  const featureItems = [
    "AI-powered plagiarism detection",
    "Direct & paraphrasing similarity check",
    "Sentence-by-sentence originality",
    "Highlight copied parts",
    "Rewrite suggestions",
    "Readability score",
    "Structural similarity detection",
    "Academic writing check",
    "SEO duplicate content check",
    "AI-content detection",
    "Safe & secure processing",
    "Fast and user-friendly",
    "Supports all writing formats"
    ];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">
          AI Plagiarism Checker
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Check originality instantly with our advanced AI plagiarism checker. Detect copied text, paraphrasing, and AI-generated content. Get highlighted plagiarism, sentence analysis, and rewrite suggestions — all in one click.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compare Two Texts</CardTitle>
          <CardDescription>Enter two pieces of text below to check for similarities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
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
              <Button type="submit" disabled={isLoading} size="lg">
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
        <ResultsDisplay result={result} />
      )}
        
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>How Our AI Plagiarism Checker Works</CardTitle>
                <CardDescription>Our plagiarism checker uses advanced AI and language models to scan your text for originality. Here’s a simple breakdown of how the system works:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold">Step 1: Paste or Upload Your Text</h3>
                    <p className="text-muted-foreground">Enter any text — paragraphs, essays, articles, assignments, reports, blog posts, or documents. We support plain text, web content, academic writing, AI-generated content, and business documents.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Step 2: AI Scans for Similarities</h3>
                    <p className="text-muted-foreground">Our engine analyzes direct copy-paste matches, paraphrased content, rewritten patterns, sentence structure similarity, AI-patterns vs human style, unnatural repetitions, public/common knowledge detection, and citation and reference issues. It does not search the live web but detects plagiarism by comparing linguistic patterns and writing structure.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Step 3: Sentence-by-Sentence Plagiarism Breakdown</h3>
                    <p className="text-muted-foreground">The system marks each sentence as Original, Possibly plagiarized, or Likely plagiarized, providing a reason, similarity type, and patterns found.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Step 4: Highlighted Plagiarized Sections</h3>
                    <p className="text-muted-foreground">Your text is returned with plagiarized sections marked with <code>[PLAGIARIZED]...[/PLAGIARIZED]</code> so you can instantly locate copied or similar parts.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Step 5: AI Rewrite Suggestions</h3>
                    <p className="text-muted-foreground">For every plagiarized section, you get a human-style rewrite, a simplified rewrite, and a professional rewrite to help you make your content 100% original.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Step 6: Final Plagiarism Report</h3>
                    <p className="text-muted-foreground">The tool generates a full originality report including overall plagiarism percentage, unique content score, paraphrasing intensity, structural similarity, sentence-by-sentence originality, readability score, and recommendations for improvement.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Features Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {featureItems.map((feature, index) => (
                        <Badge key={index} variant="secondary">{feature}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Tools</CardTitle>
            <CardDescription>To improve productivity, try our other free tools:</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold">PDF Splitter</h3>
              <p className="text-sm text-muted-foreground mt-1">Split your PDF files into multiple documents.</p>
              <Link href="https://pdf2word.all2ools.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-flex items-center">
                Visit Tool <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold">Image Compressor</h3>
              <p className="text-sm text-muted-foreground mt-1">Reduce image file sizes for free.</p>
               <Link href="https://imagecompressor-beta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-flex items-center">
                Visit Tool <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold">More PDF Tools</h3>
              <p className="text-sm text-muted-foreground mt-1">Explore our full suite of online tools.</p>
              <Link href="https://all2ools.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-flex items-center">
                Visit Tool <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions (General)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is a plagiarism checker?</AccordionTrigger>
                            <AccordionContent>A plagiarism checker is a tool that analyzes text to detect copied, paraphrased, or unoriginal content.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Does this tool detect paraphrased plagiarism?</AccordionTrigger>
                            <AccordionContent>Yes! Our AI detects paraphrasing, rewording, and structural similarity — not just exact matches.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can it detect AI-generated content?</AccordionTrigger>
                            <AccordionContent>Yes. Our engine identifies writing patterns commonly produced by AI models.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Do you store user text?</AccordionTrigger>
                            <AccordionContent>No. All text is processed securely and automatically deleted.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Is this tool free to use?</AccordionTrigger>
                            <AccordionContent>We offer a free version for basic checks, with paid options for advanced features and API access.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Can I check academic papers and assignments?</AccordionTrigger>
                            <AccordionContent>Yes, students and researchers widely use this tool.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Who Can Use This Tool?</CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Students</AccordionTrigger>
                            <AccordionContent>To check essays, assignments, projects, lab reports, and thesis content.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Teachers & Educators</AccordionTrigger>
                            <AccordionContent>To ensure academic integrity and evaluate student submissions.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Bloggers & Content Writers</AccordionTrigger>
                            <AccordionContent>To check articles before publishing to avoid duplicate content penalties.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>SEO Professionals</AccordionTrigger>
                            <AccordionContent>To ensure content originality for Google ranking.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Businesses & Agencies</AccordionTrigger>
                            <AccordionContent>To validate marketing content, reports, documentation, and presentations.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Researchers & Academics</AccordionTrigger>
                            <AccordionContent>To scan research papers, literature reviews, and publications.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
