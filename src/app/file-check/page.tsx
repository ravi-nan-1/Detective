"use client";

import { useState, ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUp, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fileUploadPlagiarismCheck } from "@/ai/flows/file-upload-plagiarism-check";
import type { AnalysisResult } from "@/lib/types";
import { ResultsDisplay } from "@/components/results-display";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "@/hooks/use-history";

const formSchema = z.object({
  textToCompare: z.string().min(50, {
    message: "Text must be at least 50 characters.",
  }),
});

export default function FileCheckPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const { toast } = useToast();
  const { addHistoryItem } = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textToCompare: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a file to compare.",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const fileDataUri = await fileToDataUri(file);
      const { similarityPercentage, matchedPhrases } = await fileUploadPlagiarismCheck({
        fileDataUri,
        textToCompare: values.textToCompare,
      });

      const analysisResult = {
        similarityScore: similarityPercentage / 100,
        matchedPhrases,
      };

      setResult(analysisResult);
      addHistoryItem({
        id: new Date().toISOString(),
        type: 'file',
        title: `File Check: ${file.name}`,
        input: { fileName: file.name, textToCompare: values.textToCompare },
        result: analysisResult,
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the file analysis. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          File Content vs. Text
        </h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Compare File Against Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormItem>
                    <FormLabel>Upload Document</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                        />
                        <label
                          htmlFor="file-upload"
                          className="flex items-center justify-center w-full h-full min-h-[200px] px-4 py-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
                        >
                          <div className="text-center">
                            <FileUp className="w-12 h-12 mx-auto text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                              {fileName ? fileName : "Click to upload or drag and drop"}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              PDF, DOCX, TXT (up to 10MB)
                            </p>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="textToCompare"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comparison Text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the text to compare against the file content here..."
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
