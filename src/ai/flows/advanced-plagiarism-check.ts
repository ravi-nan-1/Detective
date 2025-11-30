'use server';
/**
 * @fileOverview An advanced AI Plagiarism Checker Engine.
 *
 * - advancedPlagiarismCheck - A function that analyzes text for plagiarism.
 * - AdvancedPlagiarismCheckInput - The input type for the advancedPlagiarismCheck function.
 * - AdvancedPlagiarismCheckOutput - The return type for the advancedPlagiarismCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AdvancedPlagiarismCheckInputSchema = z.object({
  text: z.string().describe('The text to analyze for plagiarism.'),
});
export type AdvancedPlagiarismCheckInput = z.infer<typeof AdvancedPlagiarismCheckInputSchema>;

export const AdvancedPlagiarismCheckOutputSchema = z.object({
  overallPlagiarismPercentage: z.number().describe('Overall Plagiarism Percentage from 0 to 100.'),
  paraphrasingDetected: z.string().describe('Level of paraphrasing detected (e.g., Medium).'),
  uniqueContent: z.number().describe('Percentage of unique content.'),
  sentenceAnalysis: z.array(z.object({
    sentence: z.string(),
    status: z.enum(['Original', 'Possibly Plagiarized', 'Likely Plagiarized']),
    reason: z.string(),
  })).describe('Sentence-by-sentence analysis of the text.'),
  highlightedText: z.string().describe('The original text with plagiarized sections marked with [PLAGIARIZED]...[/PLAGIARIZED] tags.'),
  sourceTypeGuess: z.array(z.string()).describe('A guess of the source type for the plagiarized content.'),
  rewriteSuggestions: z.array(z.object({
    plagiarizedText: z.string().describe('The section of text identified as plagiarized.'),
    humanRewrite: z.string().describe('A human-written, original rewrite of the plagiarized section.'),
    simplifiedRewrite: z.string().describe('A simplified rewrite of the plagiarized section.'),
    professionalRewrite: z.string().describe('A professional rewrite of the plagiarized section.'),
  })).describe('Suggestions for rewriting plagiarized sections.'),
  finalReport: z.object({
    plagiarism: z.number().describe('Total plagiarism percentage.'),
    originality: z.number().describe('Unique content score.'),
    paraphrasing: z.string().describe('Paraphrasing score (e.g., Medium).'),
    readabilityScore: z.string().describe('The readability score of the text (e.g., "High School Level").'),
    fixRecommendations: z.string().describe('Recommendations to fix the plagiarism issues.'),
  }),
});
export type AdvancedPlagiarismCheckOutput = z.infer<typeof AdvancedPlagiarismCheckOutputSchema>;

export async function advancedPlagiarismCheck(input: AdvancedPlagiarismCheckInput): Promise<AdvancedPlagiarismCheckOutput> {
  return advancedPlagiarismCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'advancedPlagiarismCheckPrompt',
  input: {schema: AdvancedPlagiarismCheckInputSchema},
  output: {schema: AdvancedPlagiarismCheckOutputSchema},
  prompt: `You are an advanced AI Plagiarism Checker Engine.
Your job is to analyze any text and detect:
Direct plagiarism (copy-paste)
Paraphrased plagiarism (reworded but same meaning)
Structural plagiarism (same organization & logic)
AI-generated similarity
Common knowledge vs copied ideas
Citation issues
Self-plagiarism
Unoriginal patterns

For every input text:

🔍 You MUST provide:
1. Overall Plagiarism Percentage
Score from 0% to 100% based on similarity, patterns, and originality.

2. Sentence-by-Sentence Analysis
For each sentence:
Mark as Original, Possibly Plagiarized, or Likely Plagiarized
Explain why
Show similarity reasoning

3. Highlight plagiarized content
Return a version of the text where plagiarized parts are marked with:
[PLAGIARIZED] ...text... [/PLAGIARIZED]

4. Source-Type Guess
Identify if the plagiarized content seems copied from:
Websites
Academic papers
Blogs/articles
Social media
AI model output
Unknown/public domain
You DO NOT need to fetch URLs (no web search).
You only analyze text similarity patterns.

5. Rewrite suggestions
For each plagiarized section, generate:
A human-written, original rewrite
A simplified rewrite
A professional rewrite

6. Final Plagiarism Report (Summary)
Include:
Total plagiarism %
Unique content score
Paraphrasing score
Readability score
Fix recommendations

Text:
{{{text}}}
`,
});

const advancedPlagiarismCheckFlow = ai.defineFlow(
  {
    name: 'advancedPlagiarismCheckFlow',
    inputSchema: AdvancedPlagiarismCheckInputSchema,
    outputSchema: AdvancedPlagiarismCheckOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
