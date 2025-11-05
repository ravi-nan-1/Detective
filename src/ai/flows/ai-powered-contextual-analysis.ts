'use server';
/**
 * @fileOverview An AI tool that enhances comparison with a reference database by analyzing context using an LLM to improve accuracy.
 *
 * - analyzeContextAndCompare - A function that analyzes context and compares text with a reference database.
 * - AnalyzeContextAndCompareInput - The input type for the analyzeContextAndCompare function.
 * - AnalyzeContextAndCompareOutput - The return type for the analyzeContextAndCompare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeContextAndCompareInputSchema = z.object({
  inputText: z.string().describe('The text input to analyze for plagiarism.'),
  referenceDatabase: z.array(z.string()).describe('A list of reference texts to compare against.'),
});
export type AnalyzeContextAndCompareInput = z.infer<typeof AnalyzeContextAndCompareInputSchema>;

const AnalyzeContextAndCompareOutputSchema = z.object({
  similarityResults: z.array(
    z.object({
      referenceText: z.string().describe('The reference text that was compared against.'),
      similarityScore: z.number().describe('The similarity score between the input text and the reference text (0-1).'),
      isPlagiarized: z.boolean().describe('Whether the input text is considered plagiarized from the reference text.'),
    })
  ).describe('Results of the similarity analysis against the reference database.'),
});
export type AnalyzeContextAndCompareOutput = z.infer<typeof AnalyzeContextAndCompareOutputSchema>;

export async function analyzeContextAndCompare(input: AnalyzeContextAndCompareInput): Promise<AnalyzeContextAndCompareOutput> {
  return analyzeContextAndCompareFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContextAndComparePrompt',
  input: {schema: AnalyzeContextAndCompareInputSchema},
  output: {schema: AnalyzeContextAndCompareOutputSchema},
  prompt: `You are a plagiarism detection expert. Analyze the given input text and compare it to a reference database to determine the similarity and identify potential plagiarism. Provide a similarity score between 0 and 1 and a boolean indicating whether plagiarism is detected.\n\nInput Text: {{{inputText}}}\n\nReference Database:\n{{#each referenceDatabase}}\n- {{{this}}}\n{{/each}}\n\nOutput in the following JSON format:\n{
  "similarityResults": [
    {
      "referenceText": "<reference text>",
      "similarityScore": <similarity score between 0 and 1>,
      "isPlagiarized": <true or false>
    }
  ]
}`,  
});

const analyzeContextAndCompareFlow = ai.defineFlow(
  {
    name: 'analyzeContextAndCompareFlow',
    inputSchema: AnalyzeContextAndCompareInputSchema,
    outputSchema: AnalyzeContextAndCompareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
