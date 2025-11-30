import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: "Review the terms and conditions governing your use of our plagiarism detection tool.",
};

export default function TermsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Welcome to ALL2ools.com. By accessing our website, you agree to the following terms:
            </p>

            <h3 className="text-xl font-semibold text-foreground">Use of Service</h3>
            <p>Our plagiarism checker is designed for:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Educational use</li>
                <li>Personal content verification</li>
                <li>Professional proofreading</li>
                <li>AI content analysis</li>
            </ul>
            <p>You agree not to misuse the tool for illegal, harmful, or unethical activities.</p>

            <h3 className="text-xl font-semibold text-foreground">Accuracy Disclaimer</h3>
            <p>While our AI aims for high accuracy:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>No plagiarism tool is 100% perfect</li>
                <li>You are responsible for verifying final content</li>
                <li>We do not guarantee academic acceptance or legal compliance</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Intellectual Property</h3>
            <p>All website content, design, and features belong to ALL2ools.com.</p>

            <h3 className="text-xl font-semibold text-foreground">Limitation of Liability</h3>
            <p>We are not responsible for:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Misinterpretation of results</li>
                <li>Losses due to improper use</li>
                <li>Errors caused by third-party tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Changes to Terms</h3>
            <p>We may update terms anytime. Continued use of the site means you accept changes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
