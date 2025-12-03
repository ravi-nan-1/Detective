import {z} from 'genkit';

/**
 * @fileOverview Types for the Grammar Checker AI tool.
 *
 * - GrammarCheckInput - The input type for the grammarCheck function.
 * - GrammarCheckOutput - The return type for the grammarCheck function.
 */

export const GrammarCheckInputSchema = z.object({
  text: z.string().describe('The text to be checked for grammar errors.'),
});
export type GrammarCheckInput = z.infer<typeof GrammarCheckInputSchema>;

export const GrammarCheckOutputSchema = z.object({
    correctedText: z.string().describe('The text with all grammar corrections applied.'),
    corrections: z.array(z.object({
        original: z.string().describe('The original incorrect phrase or word.'),
        corrected: z.string().describe('The corrected version of the phrase or word.'),
        explanation: z.string().describe('An explanation of the grammatical error.'),
    })).describe('A list of all corrections made.'),
    report: z.object({
        totalCorrections: z.number().describe('The total number of corrections made.'),
        readabilityScoreBefore: z.string().describe('The readability score of the original text.'),
        readabilityScoreAfter: z.string().describe('The readability score of the corrected text.'),
        summary: z.string().describe('A brief summary of the types of errors found.'),
    }).describe('A summary report of the grammar check.'),
});
export type GrammarCheckOutput = z.infer<typeof GrammarCheckOutputSchema>;
