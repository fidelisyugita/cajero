export function generateObjectArray(length: number) {
  return Array.from({length}, (_, index) => ({id: String(index)}));
}
