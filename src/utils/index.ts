export function extractFileType(url: string) {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return url.split(".").pop()!;
}
