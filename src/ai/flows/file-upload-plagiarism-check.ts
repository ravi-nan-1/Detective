'use server';
/**
 * @fileOverview Implements the Genkit flow for file upload plagiarism check.
 *
 * - fileUploadPlagiarismCheck - A function that handles the file upload plagiarism check process.
 * - FileUploadPlagiarismCheckInput - The input type for the fileUploadPlagiarismCheck function.
 * - FileUploadPlagiarismCheckOutput - The return type for the fileUploadPlagiarismCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FileUploadPlagiarismCheckInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The uploaded file's data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  textToCompare: z.string().describe('The text to compare against the uploaded file.'),
});
export type FileUploadPlagiarismCheckInput = z.infer<typeof FileUploadPlagiarismCheckInputSchema>;

const FileUploadPlagiarismCheckOutputSchema = z.object({
  similarityPercentage: z
    .number()
    .describe('The percentage of similarity between the file content and the text to compare.'),
  matchedPhrases: z.array(z.string()).describe('The phrases that match between the file and the text.'),
});
export type FileUploadPlagiarismCheckOutput = z.infer<typeof FileUploadPlagiarismCheckOutputSchema>;

export async function fileUploadPlagiarismCheck(
  input: FileUploadPlagiarismCheckInput
): Promise<FileUploadPlagiarismCheckOutput> {
  return fileUploadPlagiarismCheckFlow(input);
}

const fileUploadPlagiarismCheckPrompt = ai.definePrompt({
  name: 'fileUploadPlagiarismCheckPrompt',
  input: {schema: FileUploadPlagiarismCheckInputSchema},
  output: {schema: FileUploadPlagiarismCheckOutputSchema},
  prompt: `You are a plagiarism checker. You will compare the content of a file with a given text and determine the similarity percentage and matched phrases.

File Content: {{media url=fileDataUri}}
Text to Compare: {{{textToCompare}}}

Analyze the file content and the text to compare, and provide the similarity percentage and matched phrases.
`,
});

const fileUploadPlagiarismCheckFlow = ai.defineFlow(
  {
    name: 'fileUploadPlagiarismCheckFlow',
    inputSchema: FileUploadPlagiarismCheckInputSchema,
    outputSchema: FileUploadPlagiarismCheckOutputSchema,
  },
  async input => {
    const {output} = await fileUploadPlagiarismCheckPrompt(input);
    return output!;
  }
);
