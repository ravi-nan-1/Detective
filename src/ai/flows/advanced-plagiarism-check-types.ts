import {z} from 'genkit';

/**
 * @fileOverview Types for the advanced AI Plagiarism Checker Engine.
 *
 * - AdvancedPlagiarismCheckInput - The input type for the advancedPlagiarismCheck function.
 * - AdvancedPlagiarismCheckOutput - The return type for the advancedPlagiarismCheck function.
 */

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
    sentenceOriginality: z.object({
        original: z.number().describe('Count of original sentences.'),
        possiblyPlagiarized: z.number().describe('Count of possibly plagiarized sentences.'),
        likelyPlagiarized: z.number().describe('Count of likely plagiarized sentences.'),
    }).describe('Breakdown of sentence originality counts.'),
    readabilityScore: z.string().describe('The readability score of the text (e.g., "High School Level").'),
    fixRecommendations: z.string().describe('Recommendations to fix the plagiarism issues.'),
  }),
});
export type AdvancedPlagiarismCheckOutput = z.infer<typeof AdvancedPlagiarismCheckOutputSchema>;
