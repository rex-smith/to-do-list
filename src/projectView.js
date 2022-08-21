import { format } from 'date-fns';
import { showNewItemForm, showItemDetail } from './itemView.js'

let currentProject = document.getElementById('current-project');

function buildItem(item) {
  let itemContainer = document.createElement('div');
  // Title
  let itemTitle = document.createElement('div');
  itemTitle.innerText = `${item.getTitle()}`

  // When clicked, show detail in right side of page
  itemTitle.addEventListener('click', () => {
    showItemDetail(item);
  });
  itemContainer.appendChild(itemTitle);

  // Create side content for each item
  let itemExtras = document.createElement('div');
  itemExtras.classList.add('item-extras');

  // Due date aligned for viewer
  let itemDueDate = document.createElement('div');
  itemDueDate.classList.add('due-date');
  itemExtras.appendChild(itemDueDate);
  itemDueDate.innerText = `${format(item.getDueDate(), 'MM-dd-yy')}`

  // Handle different box shadow based on priority and add flags
  let itemPriority = document.createElement('div');
  itemPriority.classList.add('priority-flag');
  if (item.getPriority() === 1) {
    itemContainer.classList.add('high-priority');
    itemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
    itemPriority.classList.add('red-flag');
  } else if (item.getPriority() === 2) {
    itemContainer.classList.add('medium-priority');
    itemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
    itemPriority.classList.add('orange-flag');
  } else {
    itemContainer.classList.add('low-priority');
    itemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
    itemPriority.classList.add('transparent-flag');
  }
  itemExtras.appendChild(itemPriority);

  // Checkbox and coloring based on completeness
  let itemComplete = document.createElement('div');
  itemComplete.classList.add('complete-box');
  if (item.getComplete() === true) {
    itemContainer.classList.add('complete');
    itemComplete.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  } else {
    itemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
  }
  itemComplete.addEventListener('click', () => {
    item.setComplete(!item.getComplete());
    itemContainer.classList.toggle('complete');
    if (item.getComplete() === true) {
      itemContainer.classList.add('complete');
      itemComplete.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    } else {
      itemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
    }
  });
  itemExtras.appendChild(itemComplete);
  itemContainer.classList.add('to-do-container');
  itemContainer.appendChild(itemExtras);
  return itemContainer;
}

function buildProject(project) {
  let newProject = document.createElement('div');
  let newProjectTitle = document.createElement('h2');
  newProject.appendChild(newProjectTitle);
  newProjectTitle.innerText = `${project.getTitle()}`;
  newProjectTitle.classList.add('project-title');
  let newProjectList = document.createElement('div');
  let itemArray = project.getItems();
  for (let i = 0; i < itemArray.length; i++) {
    let itemContainer = buildItem(itemArray[i]);
    newProjectList.appendChild(itemContainer);
  }
  // Add new item button
  let addItemButton = document.createElement('div');
  addItemButton.innerText = '+ Add New Item';
  addItemButton.classList.add('add-item-button');
  addItemButton.addEventListener('click', () => {
    showNewItemForm();
  });
  newProjectList.appendChild(addItemButton);
  newProject.appendChild(newProjectList);
  return newProject;
}

export function showProject(project) {
  // Add project to list container after clearing
  while (currentProject.firstChild) {
    currentProject.removeChild(currentProject.firstChild);
  }
  currentProject.appendChild(buildProject(project));
  if(project.getItems().length > 0) {
    showItemDetail(project.getItems()[0]);
  }
}
