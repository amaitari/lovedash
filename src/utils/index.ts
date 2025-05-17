export function getInitials(str: string) {
  return (
    str
      ?.match(/(?<=\s|^)\p{L}\p{Mn}*/gu)
      ?.filter((_, i, array) => i === 0 || i === array.length - 1)
      .join("") ?? ""
  );
}
