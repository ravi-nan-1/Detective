'use server';
/**
 * @fileOverview An AI-powered grammar checking tool.
 *
 * - grammarCheck - A function that analyzes text for grammar and spelling errors.
 */

import {ai} from '@/ai/genkit';
import {
  GrammarCheckInputSchema,
  GrammarCheckOutputSchema,
  type GrammarCheckInput,
  type GrammarCheckOutput
} from './grammar-check-types';


export async function grammarCheck(input: GrammarCheckInput): Promise<GrammarCheckOutput> {
  return grammarCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarCheckPrompt',
  input: {schema: GrammarCheckInputSchema},
  output: {schema: GrammarCheckOutputSchema},
  prompt: `You are an expert grammar and spelling checker. Your task is to analyze the given text, identify all errors, and provide a corrected version along with a detailed report.

Analyze the following text:
{{{text}}}

You must provide the following:
1.  **Corrected Text**: The full text with all grammar, spelling, and punctuation errors fixed.
2.  **Corrections List**: An array of objects, where each object details a specific correction made. Include the original incorrect snippet, the corrected version, and a clear explanation of the error (e.g., "Subject-verb agreement," "Incorrect tense," "Spelling mistake").
3.  **Final Report**: A summary object that includes:
    -   The total number of corrections made.
    -   The readability score before the corrections (e.g., "High School Level").
    -   The readability score after the corrections.
    -   A brief summary of the most common types of errors found in the text.

Please ensure your response is in the correct JSON format and adheres strictly to the output schema.`,
});

const grammarCheckFlow = ai.defineFlow(
  {
    name: 'grammarCheckFlow',
    inputSchema: GrammarCheckInputSchema,
    outputSchema: GrammarCheckOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
