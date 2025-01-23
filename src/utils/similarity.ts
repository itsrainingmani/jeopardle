export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, "")
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, "")

  if (s1 === s2) return 100
  if (s1.length < 2 || s2.length < 2) return 0

  const bigrams1 = new Set(getBigrams(s1))
  const bigrams2 = new Set(getBigrams(s2))

  const union = new Set([...bigrams1, ...bigrams2])
  const intersection = new Set([...bigrams1].filter((x) => bigrams2.has(x)))

  return Math.floor((intersection.size / union.size) * 100)
}

function getBigrams(str: string): string[] {
  const bigrams = []
  for (let i = 0; i < str.length - 1; i++) {
    bigrams.push(str.slice(i, i + 2))
  }
  return bigrams
}

