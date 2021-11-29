export function capitalizeFirstLetter(string: string) {
  return string.slice(0, 1).toUpperCase().concat(string.slice(1));
}

export function capitaliseFirstLetterOfEachWord(string: string) {
  const arr = string.split(" ");
  const capitalized = [];
  arr.forEach((word) => capitalized.push(capitalizeFirstLetter(word)));
  return capitalized.join(" ");
}

function getWords(string: string): string[] {
  return string.split(" ");
}

export function slugify(string: string) {
  return replaceSpacesWithDashes(string.toLowerCase());
}

function replaceSpacesWithDashes(string: string) {
  return string.replace(/ /g, "-");
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
