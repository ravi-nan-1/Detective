import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us – AI Plagiarism Checker Tool",
    description: "Learn about our AI-powered plagiarism checker designed to provide accurate, fast, and user-friendly originality reports.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">About Us – AI Plagiarism Checker Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              Welcome to ALL2ools.com, a powerful AI-driven plagiarism detection tool built for students, writers, professionals, researchers, and content creators.
              Our mission is simple: to make originality easy, accurate, and accessible to everyone.
            </p>
            <p>
              We use advanced language models to detect:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Direct plagiarism</li>
              <li>Paraphrased plagiarism</li>
              <li>Structural similarity</li>
              <li>AI-generated patterns</li>
              <li>Citation issues</li>
              <li>Unoriginal content blocks</li>
            </ul>
            <p>
              Our platform delivers:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Sentence-by-sentence analysis</li>
              <li>Highlighted plagiarized sections</li>
              <li>Rewrite suggestions</li>
              <li>Accuracy-focused scoring</li>
              <li>Fast and user-friendly interface</li>
            </ul>
            <p>
              At ALL2ools.com, we believe content should be clear, authentic, and trustworthy.
              Whether you are checking academic writing, blog posts, business documents, or creative work — our AI ensures your content stays original.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
