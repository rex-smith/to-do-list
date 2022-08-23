import itemFactory from './itemBuilder.js';
import { getProjectArray } from './index.js';
import { format } from 'date-fns';

let currentProject = document.getElementById('current-project');
let sidebar = document.querySelector('.sidebar');
let itemForm = document.getElementById('new-item-form');
let itemDetail = document.getElementById('item-detail-wrapper');
let newProjectLink = document.getElementById('side-add-new');
let newProjectForm = document.getElementById('new-project-form');
let sideMainTitle = document.getElementById('side-main-title');

// Right side of page is either: item detail, edit item form, new item form

function showProject(project) {
  currentProject.appendChild(buildProject(project));
}

export function showAllProjects() {
  clearCurrentProjectContainer();
  clearCurrentItemContainer();
  clearActiveSidebarTitle();
  sideMainTitle.classList.add('active-sidebar-title');
  for (let i = 0; i < getProjectArray().length; i++) {
    showProject(getProjectArray()[i]);
  }
}

export function showOnlyProject(project) {
  // Add project to list container after clearing
  clearCurrentProjectContainer();
  clearCurrentItemContainer();
  showProject(project);
  highlightProjectSidebar(project);
}

function clearCurrentItemContainer() {
  if (!itemForm.classList.contains('hidden')) {
    hideItemForm();
  }
  if (!itemDetail.classList.contains('hidden')) {
    hideItemDetail();
  }
}

function clearCurrentProjectContainer() {
  removeChildren(currentProject);
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function showItemDetail(item) {
  // Deactivate any 'active' to-do-item
  clearCurrentItemContainer();
  populateItemDetail(item);
  unhideItemDetail();
}

function hideItemDetail() {
  itemDetail.classList.add('hidden');
}

function unhideItemDetail() {
  itemDetail.classList.remove('hidden');
}

function hideItemForm() {
  itemForm.classList.add('hidden');
}

function unhideItemForm() {
  itemForm.classList.remove('hidden');
}

function populateItemDetail(item) {
  // Set itemId property to item's id
  itemDetail.dataset.itemId = item.getId();

  // Populate Detail View
  let detailedItemTitle = document.getElementById('item-detail-title');
  detailedItemTitle.innerText = `${item.getTitle()}`;

  let detailedItemDueDate = document.getElementById('item-detail-due-date');
  detailedItemDueDate.innerText = `${format(item.getDueDate(), 'h:MMa, MM-dd-yyyy')}`;
  
  let detailedItemPriority = document.getElementById('item-detail-priority');
  detailedItemPriority.innerText = `${item.getPriority()}`;
  
  let detailedItemComplete = document.getElementById('item-detail-complete');
  if (item.getComplete() === true) {
    detailedItemComplete.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  } else {
    detailedItemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
  }
  
  let detailedItemNotes = document.getElementById('item-detail-notes');
  detailedItemNotes.innerText = `${item.getNotes()}`;
}

export function showEditItemForm(item) {
  showItemForm(item);
}

export function showNewItemForm(project) {
  const newItem = itemFactory();
  newItem.setProjectId(project.getId());
  project.addItem(newItem);
  showItemForm(newItem);
}

function showItemForm(item) {
  // Set itemId property to item's id
  itemForm.dataset.itemId = item.getId(); 

  // Title Input (Placeholder instead of label)
  const titleInput = document.getElementById('title-input');
  titleInput.value = item.getTitle();

  // Due Date (Label included)
  const dueDateInput = document.getElementById('due-date-input');
  dueDateInput.value = `${format(item.getDueDate(), 'yyyy-MM-dd')}`;

  // Priority (high, medium, low, with low default)
  const priorityInput = document.getElementById('priority-input');
  priorityInput.value = item.getPriority();
  
  // Complete (checkbox, with not checked default)
  const completeInput = document.getElementById('complete-input');
  completeInput.value = item.getComplete();

  // Notes (textArea with placeholder)
  const notesInput = document.getElementById('notes-input');
  notesInput.value = item.getNotes();

  clearCurrentItemContainer();
  unhideItemForm();
}

export function displaySidebar(projectArray) {
  for (let i = 0; i < projectArray.length; i++) {
    addProjectToSidebar(projectArray[i]);
  }
  showNewProjectLink();
}

export function addProjectToSidebar(project) {
  // Add name to sidebar
  let sideProjectTitle = document.createElement('div');
  sideProjectTitle.innerText = `${project.getTitle()}`
  sideProjectTitle.id = `sidebar-title-${project.getId()}`;
  sideProjectTitle.classList.add('side-project-title');
  sidebar.appendChild(sideProjectTitle);
}

function clearActiveSidebarTitle() {
  let activeSidebar = document.querySelector('.active-sidebar-title');
  if (activeSidebar) {
    activeSidebar.classList.remove('active-sidebar-title');
  }
}

function highlightProjectSidebar(project) {
  // Get Sidebar item from project
  const sidebarTitleElement = sidebarTitleFromProject(project);
  // Set active class on sidebar item
  clearActiveSidebarTitle();
  activateSidebarTitle(sidebarTitleElement);
}

function sidebarTitleFromProject(project) {
  let sidebarTitle = document.getElementById(`sidebar-title-${project.getId()}`);
  return sidebarTitle;
}

function activateSidebarTitle(element) {
  element.classList.add('active-sidebar-title');
}

export function showNewProjectLink() {
  newProjectLink.classList.remove('hidden');
  newProjectForm.classList.add('hidden');
}

export function showNewProjectForm() {
  newProjectLink.classList.add('hidden');
  newProjectForm.classList.remove('hidden');
}

function buildItem(item) {
  let itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');
  itemContainer.id = `item-${item.getId()}`;
  // Title
  let itemTitle = document.createElement('div');
  itemTitle.classList.add('item-title');
  itemTitle.innerText = `${item.getTitle()}`

  itemContainer.appendChild(itemTitle);

  // Create side content for each item
  let itemExtras = document.createElement('div');
  itemExtras.classList.add('item-extras');

  // Due date
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

  itemExtras.appendChild(itemComplete);
  itemContainer.classList.add('to-do-container');
  itemContainer.appendChild(itemExtras);
  return itemContainer;
}

export function toggleItemComplete(item) {
  item.setComplete(!item.getComplete());
  let itemContainer = document.getElementById(`item-container-${item.getId()}`);
    itemContainer.classList.toggle('complete');
    if (item.getComplete() === true) {
      itemContainer.classList.add('complete');
      itemComplete.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    } else {
      itemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
    }
}

function getSortOrder() {
  let sortOrderOptions = document.getElementsByName('sort-order');
  for (let i = 0; i < sortOrderOptions.length; i++) {
    if (sortOrderOptions[i].checked) {
      return sortOrderOptions[i].value;
    }
  }
}

function sortItemArray(itemArray) {
  // Sort based on case
  switch (getSortOrder()) {
    case 'due-date':
      itemArray.sort((a, b) => a.getDueDate() - b.getDueDate());
      break;
    case 'priority':
      itemArray.sort((a, b) => a.getPriority() - b.getPriority());
      break;
    case 'complete':
      itemArray.sort((a, b) => a.getComplete() - b.getComplete()).reverse();
      break;
    default:
      itemArray.sort((a, b) => a.getId() - b.getId());
    }
    return itemArray;
}

function buildProject(project) {
  let newProject = document.createElement('div');
  let newProjectTitle = document.createElement('h2');
  newProject.appendChild(newProjectTitle);
  newProjectTitle.innerText = `${project.getTitle()}`;
  newProjectTitle.classList.add('project-title');
  let newProjectList = document.createElement('div');
  let sortedItemArray = sortItemArray(project.getItems());

  for (let i = 0; i < sortedItemArray.length; i++) {
    let itemContainer = buildItem(sortedItemArray[i]);
    newProjectList.appendChild(itemContainer);
  }
  // Add new item button
  let addItemButton = document.createElement('div');
  addItemButton.innerText = '+ Add New Item';
  addItemButton.classList.add('add-item-button');
  // Set project id on button
  addItemButton.dataset.projectId = project.getId();
  newProjectList.appendChild(addItemButton);
  newProject.appendChild(newProjectList);
  return newProject;
}