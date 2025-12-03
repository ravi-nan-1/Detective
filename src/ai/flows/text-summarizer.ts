'use server';
/**
 * @fileOverview An AI-powered text summarization tool.
 *
 * - textSummarizer - A function that summarizes text to a specified length.
 */

import {ai} from '@/ai/genkit';
import {
  TextSummarizerInputSchema,
  TextSummarizerOutputSchema,
  type TextSummarizerInput,
  type TextSummarizerOutput
} from './text-summarizer-types';

export async function textSummarizer(input: TextSummarizerInput): Promise<TextSummarizerOutput> {
  return textSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'textSummarizerPrompt',
  input: {schema: TextSummarizerInputSchema},
  output: {schema: TextSummarizerOutputSchema},
  prompt: `You are an expert text summarizer. Your task is to summarize the given text to approximately the specified percentage of its original length, while preserving the key information and main ideas.

Analyze the following text:
{{{text}}}

Summarize the text to be about {{{summaryLength}}}% of its original length.

You must provide the following:
1.  **Summary**: The summarized version of the text.
2.  **Original Word Count**: The word count of the original text.
3.  **Summary Word Count**: The word count of the generated summary.

Please ensure your response is in the correct JSON format and adheres strictly to the output schema.`,
});

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

const textSummarizerFlow = ai.defineFlow(
  {
    name: 'textSummarizerFlow',
    inputSchema: TextSummarizerInputSchema,
    outputSchema: TextSummarizerOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    
    if (!output) {
        const originalWordCount = countWords(input.text);
        // A simple fallback if AI fails to respond.
        const fallbackSummary = input.text.split('. ').slice(0, 2).join('. ') + '.';
        return {
            summary: fallbackSummary,
            originalWordCount: originalWordCount,
            summaryWordCount: countWords(fallbackSummary),
        }
    }
    
    // Recalculate word counts to ensure accuracy, in case the model's calculation is off.
    return {
      ...output,
      originalWordCount: countWords(input.text),
      summaryWordCount: countWords(output.summary),
    };
  }
);
