export function getDirectories(edges) {
  const directories: Set<string> = new Set();
  edges.forEach((node) => {
    const relDir: string = node.node.relativeDirectory;
    const dynamic: boolean = relDir.includes("{");
    if (relDir && !dynamic) {
      directories.add(relDir);
    }
  });
  return [...directories].sort();
}

export function getResizedImgUrl(
  url: string,
  width: number,
  aspectRatio: number
) {
  return url + `?w=${width}&h=${width / aspectRatio}&q=50`;
}
