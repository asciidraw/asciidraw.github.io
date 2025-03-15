
export function splitBySelected<T extends { id: string }>(elements: T[], selectedIds: Set<string>): [T[], T[]] {
  const selected: T[] = [];
  const other: T[] = [];
  for (const element of elements) {
    if (selectedIds.has(element.id))
      selected.push(element)
    else
      other.push(element);
  }
  return [selected, other];
}
