'use server';

/**
 * @fileOverview This file defines a Genkit flow for computing similarity scores between texts.
 *
 * - compareTexts - A function that handles the text comparison process.
 * - CompareTextsInput - The input type for the compareTexts function.
 * - CompareTextsOutput - The return type for the compareTexts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import cosineSimilarity from 'compute-cosine-similarity';

const CompareTextsInputSchema = z.object({
  text1: z.string().describe('The first text to compare.'),
  text2: z.string().describe('The second text to compare.'),
});
export type CompareTextsInput = z.infer<typeof CompareTextsInputSchema>;

const CompareTextsOutputSchema = z.object({
  similarityScore: z
    .number()
    .describe('The cosine similarity score between the two texts.'),
});
export type CompareTextsOutput = z.infer<typeof CompareTextsOutputSchema>;

/**
 * Calculates the cosine similarity between two texts.
 * @param input - The input containing the two texts to compare.
 * @returns The similarity score between the two texts.
 */
export async function compareTexts(input: CompareTextsInput): Promise<CompareTextsOutput> {
  return compareTextsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareTextsPrompt',
  input: {schema: CompareTextsInputSchema},
  output: {schema: CompareTextsOutputSchema},
  prompt: `Calculate the cosine similarity between the following two texts:

Text 1: {{{text1}}}

Text 2: {{{text2}}}

Return the similarity score as a number between -1 and 1.

Ensure that the similarityScore is a valid number.`, // Ensure output is valid
});

const compareTextsFlow = ai.defineFlow(
  {
    name: 'compareTextsFlow',
    inputSchema: CompareTextsInputSchema,
    outputSchema: CompareTextsOutputSchema,
  },
  async input => {
    // Tokenize the texts and create frequency vectors.
    const tokens1 = input.text1.toLowerCase().split(/\s+/);
    const tokens2 = input.text2.toLowerCase().split(/\s+/);

    const frequencyMap1: {[key: string]: number} = {};
    const frequencyMap2: {[key: string]: number} = {};

    tokens1.forEach(token => {
      frequencyMap1[token] = (frequencyMap1[token] || 0) + 1;
    });
    tokens2.forEach(token => {
      frequencyMap2[token] = (frequencyMap2[token] || 0) + 1;
    });

    const vector1 = Object.values(frequencyMap1);
    const vector2 = Object.values(frequencyMap2);
    // Calculate the cosine similarity.
    const similarityScore = cosineSimilarity(vector1, vector2) || 0; // Default to 0 if NaN

    return {similarityScore};
  }
);
