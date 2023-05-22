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


let projectScrollWidth = 0;
export function getProjectsScrollWidth() {
    if (projectScrollWidth === 0) {
      projectScrollWidth = 440 - 100 
      // console.log(Number(style.getPropertyValue('--project-width')), Number(style.getPropertyValue('--project-gap')))
    }
    return projectScrollWidth;
}