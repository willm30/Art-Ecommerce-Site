export function getDirectories(edges) {
  const directories: Set<string> = new Set();
  edges.forEach((node) => {
    const relDir: string = node.node.relativeDirectory;
    if (relDir) {
      directories.add(relDir);
    }
  });
  return [...directories];
}
