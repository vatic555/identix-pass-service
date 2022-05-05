export function upFirst(str: string): string {
  return str[0].toUpperCase() + str.toLowerCase().slice(1)
}

export function underscoreToCamelCase(str: string): string {
  const parts = str.split(/[-_]/g);
  return parts[0].toLowerCase() + parts.slice(1).map(upFirst)
}