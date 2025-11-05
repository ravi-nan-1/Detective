import cosineSimilarity from 'compute-cosine-similarity';

// A more robust way to create vectors of the same dimension
function getVectorsWithSharedVocab(text1: string, text2: string): { vec1: number[], vec2: number[] } {
    const tokens1 = text1.toLowerCase().split(/\s+/).filter(Boolean);
    const tokens2 = text2.toLowerCase().split(/\s+/).filter(Boolean);

    const vocab = new Set([...tokens1, ...tokens2]);
    
    const vec1 = Array.from(vocab).map(word => {
        return tokens1.filter(token => token === word).length;
    });

    const vec2 = Array.from(vocab).map(word => {
        return tokens2.filter(token => token === word).length;
    });

    return { vec1, vec2 };
}

export function computeCosineSimilarity(text1: string, text2: string): number {
  if (!text1.trim() || !text2.trim()) {
    return 0;
  }

  const { vec1, vec2 } = getVectorsWithSharedVocab(text1, text2);
  
  const similarity = cosineSimilarity(vec1, vec2);
  
  // cosineSimilarity can return NaN if one of the vectors is all zeros (empty or non-alphanumeric string)
  return isNaN(similarity) ? 0 : similarity;
}

export { cosineSimilarity };
