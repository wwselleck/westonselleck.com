'use strict';
let dragged = false;
let dragActive = false;
let currentX;
let currentY;


const getOriginalDragItem = () => {
  return document.querySelector('#dragItem')
}

const getClonedDragItem = () => {
  return document.querySelector('#dragItemClone')

}

const getActiveElement = () => {
  if(dragged) {
    return getClonedDragItem();
  }
  return getOriginalDragItem();
}


const createClonedDragItem = () => {
  const originalDragItem = getOriginalDragItem();
  const clone = originalDragItem.cloneNode(true);
  clone.style.fontSize = window.getComputedStyle(originalDragItem).fontSize;
  clone.style.position = 'absolute';
  clone.id = 'dragItemClone';

  originalDragItem.style.visibility = 'hidden';
  document.body.appendChild(clone);
  return clone;
}

const onDragStart = (e) => {
  const el = getActiveElement();
  if(e.target === el) {
    if(!dragged){
      dragged = true;
      const clone = createClonedDragItem();
      clone.style.top = e.clientY;
      clone.style.left = e.clientX;
    }
    dragActive = true;
  }
}

document.addEventListener('mousedown', onDragStart, false)

document.addEventListener('mousemove', (e) => {
  if(dragActive) {
    e.preventDefault();

    const el  = getActiveElement()
    el.style.top = e.clientY;
    el.style.left = e.clientX;
  }
}, false);

document.addEventListener('mouseup', () => {
  dragActive = false;
}, false)

const itemChoices = [
  ['lollipop', '🍭'],
  ['bread', '🥖'],
  ['candy', '🍬'],
  ['lemon', '🍋'],
  ['fries', '🍟'],
  ['popcorn', '🍿'],
  ['egg', '🥚'],
  ['spaghetti', '🍝'],
  ['sushi', '🍣'],
  ['ice cream', '🍦'],
  ['doughnut', '🍩'],
  ['juice box', '🧃'],
  ['coffee', '☕'],
  ['pie', '🥧']
]


const itemIndex = Math.floor(Math.random() * itemChoices.length);
const item = itemChoices[itemIndex];
document.querySelector('#dragItemName').textContent = item[0]
document.querySelector('#dragItem').textContent = item[1]




