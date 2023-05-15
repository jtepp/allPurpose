export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function constrain(value, max, min) {
  return Math.max(Math.min(value, max), min);
}