import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us – We’re Here to Help",
    description: "Contact ALL2ools.com for support, business inquiries, or feedback. We are here to help with our AI plagiarism checker tool.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Contact Us – We’re Here to Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              If you have any questions, support needs, or business inquiries, feel free to reach out.
              We respond within 24–48 hours.
            </p>
            <div className="space-y-2">
                <p>📧 Email: <a href="mailto:support@all2ools.com" className="text-primary hover:underline">support@all2ools.com</a></p>
                <p>🌐 Website: <a href="https://all2ools.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://all2ools.com</a></p>
                <p>📍 Location: India (Online Service Worldwide)</p>
            </div>
            <p>
              You can contact us for:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Technical issues</li>
              <li>API integration</li>
              <li>Feedback & suggestions</li>
              <li>Partnership or business collaboration</li>
            </ul>
            <p>
              We value your trust and look forward to assisting you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
