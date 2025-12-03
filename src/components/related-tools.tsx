
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const relatedToolsList = [
    {
      title: "Image Compressor",
      description: "Reduce image size instantly while maintaining high quality. Perfect for websites, e-commerce, and social media. Fast, lossless, and works with all major formats.",
      link: "https://www.all2ools.com/tools/image-compressor",
    },
    {
      title: "PDF to Word Converter",
      description: "Convert any PDF into an editable Word file with accurate formatting, preserved layout, and clean text extraction. Fast, reliable, and completely free.",
      link: "https://www.all2ools.com/tools/image-compressor",
    },
    {
      title: "1-Click Article Outline Generator",
      description: "Generate SEO-optimized article outlines in seconds. Creates headings, subtopics, talking points, and FAQs — perfect for bloggers, marketers, and content creators.",
      link: "https://www.all2ools.com/tools/1-click-article-outline-generator",
    },
    {
      title: "API Latency Checker",
      description: "Test API response time from multiple global regions. Diagnose slow endpoints, compare server performance, and measure real-world latency instantly.",
      link: "https://www.all2ools.com/tools/api-latency-checker",
    },
    {
      title: "AI Regex Generator",
      description: "Turn plain English instructions into working Regular Expressions. Includes pattern explanation, validation, and testing — ideal for developers and QA teams.",
      link: "https://www.all2ools.com/tools/api-latency-checker",
    },
    {
      title: "JSON Hero: Converter & Formatter",
      description: "Convert JSON to Excel or CSV, format complex structures, and clean nested data with one click. Great for developers, analysts, and API debugging.",
      link: "https://www.all2ools.com/tools/api-latency-checker",
    },
];

export function RelatedTools() {
    return (
        <div className="p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Related Tools</CardTitle>
                    <CardDescription>To improve productivity, try our other free tools:</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedToolsList.map((tool) => (
                    <div key={tool.title} className="flex flex-col p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h3 className="font-semibold">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 flex-1">{tool.description}</p>
                        <Link href={tool.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-2 inline-flex items-center">
                            Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
