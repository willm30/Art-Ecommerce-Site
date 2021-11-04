export function capitalizeFirstLetter(string: string) {
  return string.slice(0, 1).toUpperCase().concat(string.slice(1));
}

function getWords(string: string): string[] {
  return string.split(" ");
}

export function replaceDashesWithSpaces(string: string) {
  return string.replace(/-/g, " ");
}

export function pathNameToPageName(string: string) {
  const spaced = replaceDashesWithSpaces(string);
  const words = getWords(spaced);
  const capitalized = words.map((word) => capitalizeFirstLetter(word));

  return capitalized.join(" ");
}

export function getParentFromXLPath(path: string) {
  return path.replace("/xl", "");
}
