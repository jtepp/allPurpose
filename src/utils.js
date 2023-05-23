export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function constrain(value, max, min) {
  return Math.max(Math.min(value, max), min);
}

export function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[item.replace('./', '').replace(/\.(png|jpe?g|svg|gif)$/, '')] = r(item); });
  return images
 }


export const projectScrollWidth = () => {
  return (window.innerWidth > 655 ? 240 + 100 : 120 + 50)
}

export const scrollToIndex = (index) => {
  const projectsContainer = document.getElementById("projects-container")
  projectsContainer.scrollTo({'left': index * projectScrollWidth(), 'behavior': 'smooth'})
}