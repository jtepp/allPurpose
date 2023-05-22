export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function constrain(value, max, min) {
  return Math.max(Math.min(value, max), min);
}

export function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[item.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '')] = r(item); });
  return images
 }


export let projectScrollWidth = (window.innerWidth > 655 ? 240 : 120) + 100