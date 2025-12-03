export default function formatCamelCase(string: string): string {
  const spacedString: string = string.replaceAll(/([A-Z])/g, ' $1');
  return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
}
