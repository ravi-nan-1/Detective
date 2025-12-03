"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, CheckCircle, BookText } from "lucide-react";
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
import { grammarCheck } from "@/ai/flows/grammar-check";
import type { GrammarCheckOutput } from "@/ai/flows/grammar-check-types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  text: z.string().min(10, {
    message: "Text must be at least 10 characters for a grammar check.",
  }),
});

export default function GrammarCheckPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GrammarCheckOutput | null>(null);
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
      const grammarResult = await grammarCheck(values);
      setResult(grammarResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'grammar',
        title: 'Grammar Check',
        input: values,
        result: grammarResult,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Grammar check failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with the grammar check. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-accent" />
            Grammar Checker
        </h1>
      </div>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Check Text Grammar</CardTitle>
            <CardDescription>
              Analyze your text for grammar, spelling, and punctuation errors. Our AI will provide corrections and a detailed report.
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
                      <FormLabel>Text to Check</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your text here to check for grammar and spelling errors..."
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
                  {isLoading ? "Checking..." : "Check Grammar"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {result && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Grammar Report</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-secondary/50">
                  <h3 className="text-lg font-semibold text-center">Total Corrections</h3>
                  <p className="text-5xl font-bold font-headline text-primary">{result.report.totalCorrections}</p>
                </div>
                <div className="md:col-span-2 space-y-4 p-6 rounded-lg bg-secondary/50">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Readability (Before)</span>
                        <Badge variant="secondary">{result.report.readabilityScoreBefore}</Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Readability (After)</span>
                        <Badge variant="default">{result.report.readabilityScoreAfter}</Badge>
                    </div>
                    <Separator />
                    <div>
                         <span className="font-medium">Summary</span>
                         <p className="text-sm text-muted-foreground mt-1">{result.report.summary}</p>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Corrected Text</CardTitle>
                  <CardDescription>Here is the revised version of your text with all corrections applied.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="p-4 border rounded-md bg-background min-h-[150px] whitespace-pre-wrap leading-relaxed">
                      {result.correctedText}
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Corrections</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Original</TableHead>
                      <TableHead>Corrected</TableHead>
                      <TableHead>Explanation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.corrections.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm text-destructive line-through">"{item.original}"</TableCell>
                        <TableCell className="text-sm text-primary font-semibold">"{item.corrected}"</TableCell>
                        <TableCell className="text-sm">{item.explanation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
}
