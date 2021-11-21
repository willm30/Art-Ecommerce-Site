export function getDirectories(edges) {
  const directories: Set<string> = new Set();
  edges.forEach((node) => {
    const relDir: string = node.node.relativeDirectory;
    const dynamic: boolean = relDir.includes("{");
    const cart: boolean = relDir.includes("collection");
    if (relDir && !dynamic && !cart) {
      directories.add(relDir);
    }
  });
  return [...directories, "art", "series"].sort();
}

export function getUnique(edges, param: string) {
  const uniqueEntries: Set<string> = new Set();
  edges.forEach((node) => {
    const data: string = node.node[param];
    if (data) uniqueEntries.add(data.trim());
  });
  return [...uniqueEntries].sort();
}

export function getResizedImgUrl(
  url: string,
  width: number,
  aspectRatio: number
) {
  return url + `?w=${width}&h=${width / aspectRatio}&q=50`;
}
