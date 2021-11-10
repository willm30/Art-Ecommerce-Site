export function toRem(tailwindString: string) {
  return `${Number(tailwindString.match(/[0-9]/)[0]) / 4}rem`;
}
