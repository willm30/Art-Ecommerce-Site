export function getDirectories(edges) {
  const directories: Set<string> = new Set();
  edges.forEach((node) => {
    const relDir: string = node.node.relativeDirectory;
    const dynamic: boolean = relDir.includes("{");
    if (relDir && !dynamic) {
      directories.add(relDir);
    }
  });
  console.log(directories);
  return [...directories];
}
