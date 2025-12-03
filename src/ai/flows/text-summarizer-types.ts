import {z} from 'genkit';

/**
 * @fileOverview Types for the Text Summarizer AI tool.
 *
 * - TextSummarizerInput - The input type for the textSummarizer function.
 * - TextSummarizerOutput - The return type for the textSummarizer function.
 */

export const TextSummarizerInputSchema = z.object({
  text: z.string().describe('The text to be summarized.'),
  summaryLength: z.number().min(10).max(90).describe('The desired length of the summary as a percentage of the original text (e.g., 25 for 25%).'),
});
export type TextSummarizerInput = z.infer<typeof TextSummarizerInputSchema>;

export const TextSummarizerOutputSchema = z.object({
    summary: z.string().describe('The generated summary of the original text.'),
    originalWordCount: z.number().describe('The word count of the original text.'),
    summaryWordCount: z.number().describe('The word count of the summarized text.'),
});
export type TextSummarizerOutput = z.infer<typeof TextSummarizerOutputSchema>;
