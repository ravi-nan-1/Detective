import cosineSimilarity from 'compute-cosine-similarity';

// Function to tokenize text and create frequency vectors
function getVector(text: string): number[] {
  const tokens = text.toLowerCase().split(/\s+/);
  const frequencyMap: {[key: string]: number} = {};
  tokens.forEach(token => {
    frequencyMap[token] = (frequencyMap[token] || 0) + 1;
  });

  // This is a simplified approach. For better accuracy, we should use a shared vocabulary
  // across both texts to ensure vectors have the same dimension.
  // However, for this implementation, we'll create vectors from their own maps.
  return Object.values(frequencyMap);
}

// A more robust way to create vectors of the same dimension
function getVectorsWithSharedVocab(text1: string, text2: string): { vec1: number[], vec2: number[] } {
    const tokens1 = text1.toLowerCase().split(/\s+/);
    const tokens2 = text2.toLowerCase().split(/\s+/);

    const vocab = new Set([...tokens1, ...tokens2]);
    
    const vec1 = Array.from(vocab).map(word => {
        return tokens1.filter(token => token === word).length;
    });

    const vec2 = Array.from(vocab).map(word => {
        return tokens2.filter(token => token === word).length;
    });

    return { vec1, vec2 };
}


export function cosineSimilarity as computeCosineSimilarity(text1: string, text2: string): number {
  if (!text1.trim() || !text2.trim()) {
    return 0;
  }

  const { vec1, vec2 } = getVectorsWithSharedVocab(text1, text2);
  
  const similarity = cosineSimilarity(vec1, vec2);
  
  // cosineSimilarity can return NaN if one of the vectors is all zeros (empty or non-alphanumeric string)
  return isNaN(similarity) ? 0 : similarity;
}

export { cosineSimilarity };