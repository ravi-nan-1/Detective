import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read our privacy practices to understand how we safely handle text and user data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-sm">Last updated: 2025</p>
            <p>
              Your privacy is important to us. This Privacy Policy explains how ALL2ools.com collects, uses, stores, and protects your information.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Information We Collect</h3>
            <p>We may collect:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Uploaded text or documents for plagiarism analysis</li>
                <li>Basic usage analytics</li>
                <li>Email (if provided voluntarily)</li>
            </ul>
            <p className="font-semibold text-foreground">We do not sell, share, or misuse your data.</p>

            <h3 className="text-xl font-semibold text-foreground">How We Use Your Information</h3>
            <p>We use the collected data to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Run plagiarism checks</li>
                <li>Improve tool accuracy</li>
                <li>Enhance user experience</li>
                <li>Prevent abuse or misuse</li>
            </ul>
            <p className="font-semibold text-foreground">We do not store or index your text permanently. All submissions are processed securely and deleted automatically.</p>

            <h3 className="text-xl font-semibold text-foreground">Cookies</h3>
            <p>We may use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Improve performance</li>
                <li>Track essential website functionality</li>
                <li>Analyze traffic</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Third-Party Tools</h3>
            <p>We may use:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Google Analytics</li>
                <li>Firebase hosting</li>
                <li>Payment or subscription processors</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Your Rights</h3>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Request data deletion</li>
                <li>Request information about stored data</li>
                <li>Disable cookies anytime</li>
            </ul>
            <p>If you have questions, contact us at <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a>.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
