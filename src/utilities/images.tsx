function randomNumber(upperBound) {
  const randomNumber = Math.floor(Math.random() * upperBound);
  return randomNumber;
}

export function getRandomImages(edges, quantity) {
  const randomNumbers = new Set();
  const randomImages = [];

  while (randomNumbers.size < quantity) {
    randomNumbers.add(randomNumber(edges.length));
  }

  [...randomNumbers].forEach((n) => randomImages.push(edges[n]));

  return randomImages;
}
