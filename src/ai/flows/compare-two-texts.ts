'use server';

/**
 * @fileOverview A plagiarism checker AI agent that compares two texts for similarity.
 *
 * - compareTwoTexts - A function that handles the text comparison process.
 * - CompareTwoTextsInput - The input type for the compareTwoTexts function.
 * - CompareTwoTextsOutput - The return type for the compareTwoTexts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {cosineSimilarity} from '@/lib/similarity';

const CompareTwoTextsInputSchema = z.object({
  text1: z.string().describe('The first text to compare.'),
  text2: z.string().describe('The second text to compare.'),
});
export type CompareTwoTextsInput = z.infer<typeof CompareTwoTextsInputSchema>;

const CompareTwoTextsOutputSchema = z.object({
  similarityScore: z
    .number()
    .describe('The cosine similarity score between the two texts.'),
  matchedPhrases: z.array(z.string()).describe('The matched phrases between the two texts.'),
});
export type CompareTwoTextsOutput = z.infer<typeof CompareTwoTextsOutputSchema>;

export async function compareTwoTexts(input: CompareTwoTextsInput): Promise<CompareTwoTextsOutput> {
  return compareTwoTextsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareTwoTextsPrompt',
  input: {schema: CompareTwoTextsInputSchema},
  output: {schema: CompareTwoTextsOutputSchema},
  prompt: `You are a plagiarism detection tool.

  Determine the similarity between the following two texts using cosine similarity.

  Text 1: {{{text1}}}
  Text 2: {{{text2}}}

  Return a similarity score between 0 and 1, and a list of matched phrases.

  Ensure the output is in the correct JSON format.`,
});

const compareTwoTextsFlow = ai.defineFlow(
  {
    name: 'compareTwoTextsFlow',
    inputSchema: CompareTwoTextsInputSchema,
    outputSchema: CompareTwoTextsOutputSchema,
  },
  async input => {
    const similarityScore = cosineSimilarity(input.text1, input.text2);
    
    // The prompt will identify matched phrases. Here we just call the prompt.
    const {output} = await prompt(input);

    if (!output) {
        return {
            similarityScore,
            matchedPhrases: [],
        }
    }

    // We use the JS-calculated score but return the AI's matched phrases.
    return {
      similarityScore: similarityScore,
      matchedPhrases: output.matchedPhrases,
    };
  }
);
