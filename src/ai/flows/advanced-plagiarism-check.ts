'use server';
/**
 * @fileOverview An advanced AI Plagiarism Checker Engine.
 *
 * - advancedPlagiarismCheck - A function that analyzes text for plagiarism.
 */

import {ai} from '@/ai/genkit';
import {
  AdvancedPlagiarismCheckInputSchema,
  AdvancedPlagiarismCheckOutputSchema,
  type AdvancedPlagiarismCheckInput,
  type AdvancedPlagiarismCheckOutput
} from './advanced-plagiarism-check-types';


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
