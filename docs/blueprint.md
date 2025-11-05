# **App Name**: Plagiarism Detective

## Core Features:

- Text Input and Comparison: Allows users to enter two text snippets to compare for plagiarism using cosine similarity.
- File Upload Support: Enables users to upload files (PDF, DOCX, TXT) and compares their content with pasted text or a reference database to act as a plagiarism checker tool.
- Similarity Analysis API: Provides an API endpoint to compute similarity scores, possibly including n-gram analysis.
- Detailed Results Display: Presents similarity percentages and highlights matched phrases using highlighting or other visual cues.
- Exportable Reports: Allows users to export similarity reports in PDF or TXT format, enhancing utility.
- AI-Powered Contextual Analysis Tool: An AI tool enhances comparison with a reference database by analyzing context using an LLM to improve accuracy of detecting true instances of plagiarism or significant textual similarity.
- History Tracking: Tracks document checks for logged-in users.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) for a professional, trustworthy feel.
- Background color: Very light gray (#F0F2F5) for clean readability.
- Accent color: Vibrant purple (#9C27B0) for interactive elements and highlights, offering a visual call to action.
- Body font: 'Inter', sans-serif, for modern legibility.
- Headline font: 'Space Grotesk', sans-serif, a compliment to 'Inter', providing a clean and tech-forward feel, suiting titles and prominent text.
- Simple, outline-style icons from a set like Feather or Phosphor, aligning with the minimalist aesthetic.
- A clean, modern layout utilizing TailwindCSS grid or flexbox for responsiveness.
- Subtle loading animations and transitions to enhance user experience during text processing.