export function calculateSimilarity(str1: string, str2: string): number {
  const removeParentheses = (s: string) => s.replace(/\([^)]*\)/g, "").trim();
  const withParentheses = calculateSimilarityCore(str1, str2);
  const withoutParentheses = calculateSimilarityCore(
    removeParentheses(str1),
    removeParentheses(str2)
  );

  // Return the higher of the two scores
  return Math.max(withParentheses, withoutParentheses);
}

function calculateSimilarityCore(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "");
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (s1 === s2) return 100;
  if (s1.length < 2 || s2.length < 2) return 0;

  const bigrams1 = new Set(getBigrams(s1));
  const bigrams2 = new Set(getBigrams(s2));

  const union = new Set([...bigrams1, ...bigrams2]);
  const intersection = new Set([...bigrams1].filter((x) => bigrams2.has(x)));

  return Math.floor((intersection.size / union.size) * 100);
}

function getBigrams(str: string): string[] {
  const bigrams = [];
  for (let i = 0; i < str.length - 1; i++) {
    bigrams.push(str.slice(i, i + 2));
  }
  return bigrams;
}

// Helper function to count set bits in a byte
const countSetBits = (byte: number): number => {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    if ((byte & (1 << i)) !== 0) {
      count++;
    }
  }
  return count;
};

export const calculateBinaryCosine = (
  embedding1: number[],
  embedding2: number[]
): number => {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  // Process each byte (8 bits at a time)
  for (let i = 0; i < embedding1.length; i++) {
    // Count set bits in AND of bytes for dot product
    const andBits = embedding1[i] & embedding2[i];
    dotProduct += countSetBits(andBits);

    // Count set bits in each byte for norms
    norm1 += countSetBits(embedding1[i]);
    norm2 += countSetBits(embedding2[i]);
  }

  // Calculate cosine similarity
  return (dotProduct / Math.sqrt(norm1 * norm2)) * 100;
};
