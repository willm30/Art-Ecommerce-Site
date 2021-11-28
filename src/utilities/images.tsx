function randomNumber(upperBound) {
  const randomNumber = Math.floor(Math.random() * upperBound);
  return randomNumber;
}

export function getRandomImages(edges, quantity) {
  const randomNumbers = new Set();
  const randomImages = [];
  if (edges.length > quantity) {
    while (randomNumbers.size < quantity) {
      randomNumbers.add(randomNumber(edges.length));
    }

    [...randomNumbers].forEach((n) => randomImages.push(edges[n]));
    return randomImages;
  } else {
    return edges;
  }
}

export function placeOddOrientationInMiddle(edges) {
  if (edges.length == 3) {
    const images = [...edges];
    const orientation: any[] = edges.map((n) =>
      n.node.image.file.details.image.height >
      n.node.image.file.details.image.width
        ? "Portrait"
        : "Landscape"
    );
    const portrait = orientation.filter((s) => s == "Portrait");
    if (portrait.length == 3 || portrait.length == 0) return edges;
    else if (portrait.length == 1) {
      const portraitImg = images[orientation.indexOf(portrait[0])];
      const landscapeImgs = images.filter((i) => i != portraitImg);
      return [landscapeImgs[0], portraitImg, landscapeImgs[1]];
    } else {
      const landscape = orientation.filter((s) => s == "Landscape");
      const landscapeImg = images[orientation.indexOf(landscape[0])];
      const portraitImgs = images.filter((i) => i != landscapeImg);
      return [portraitImgs[0], landscapeImg, portraitImgs[1]];
    }
  } else {
    return edges;
  }
}
