import { format, compareAsc } from 'date-fns';
import itemFactory from './itemBuilder.js';
import projectFactory from './projectBuilder.js';

// Probably need to put these into each function
let currentProject = document.getElementById('current-project');
let currentItem = document.getElementById('current-item');
let sidebar = document.querySelector('.sidebar');

function buildItem(item) {
  let newItem = document.createElement('div');
  newItem.classList.add('to-do-container');
  let newItemTitle = document.createElement('div');
  newItemTitle.innerText = `${item.getTitle()}`
  newItem.appendChild(newItemTitle);

  // Create side content for each item
  let newItemExtras = document.createElement('div');
  newItemExtras.classList.add('item-extras');

  // Due date aligned for viewer
  let newItemDueDate = document.createElement('div');
  newItemDueDate.classList.add('due-date');
  newItemExtras.appendChild(newItemDueDate);
  newItemDueDate.innerText = `${format(item.getDueDate(), 'yyyy-MM-dd')}`

  // Handle different box shadow based on priority and add flags
  let newItemPriority = document.createElement('div');
  newItemPriority.classList.add('priority-flag');
  if (item.getPriority() === 1) {
    newItem.classList.add('high-priority');
    newItemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
    newItemPriority.classList.add('red-flag');
  } else if (item.getPriority() === 2) {
    newItem.classList.add('medium-priority');
    newItemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
    newItemPriority.classList.add('orange-flag');
  } else {
    newItem.classList.add('low-priority');
  }
  newItemExtras.appendChild(newItemPriority);
  // Checkbox and coloring based on completeness
  let newItemComplete = document.createElement('div');
  newItemComplete.classList.add('complete-box');
  if (item.getComplete() === true) {
    newItem.classList.add('complete');
    newItemComplete.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  } else {
    newItemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
  }
  newItemExtras.appendChild(newItemComplete);
  newItem.appendChild(newItemExtras);
  return newItem;
}

function showItemDetail(item) {
  // Zoom in to item, show detailed information
}

function showItemEditForm(item) {

}

function showNewItemForm() {

}

function showNewProjectForm() {

}

function showEditProjectForm(project) {

}

function buildProject(project) {
  let newProject = document.createElement('div');
  let newProjectTitle = document.createElement('div');
  newProject.appendChild(newProjectTitle);
  newProjectTitle.innerText = `${project.getTitle()}`;
  newProjectTitle.classList.add('project-title');
  let newProjectList = document.createElement('div');
  // Get To Dos is returning something undefined -- Getters must be messed up

  console.log(project);
  let itemArray = project.getItems();
  console.log(itemArray);
  for (let i = 0; i < itemArray.length; i++) {
    let newItem = buildItem(itemArray[i]);
    newProjectList.appendChild(newItem);
  }
  newProject.appendChild(newProjectList);
  return newProject;
}

export function addProjectToSidebar(project) {
  // Add name to sidebar
  let sideProjectTitle = document.createElement('div');
  sideProjectTitle.innerText = `${project.getTitle()}`
  sideProjectTitle.classList.add('side-project-title');
  sidebar.appendChild(sideProjectTitle);
  // Need to add event listener to showProject when sidelink clicked on
}

export function addNewProjectLink() {
  let sideProjectNew = document.createElement('div');
  sideProjectNew.innerText = '+ New Project'
  sideProjectNew.classList.add('side-add-new');
  sidebar.appendChild(sideProjectNew);
}

export function showProject(project) {
  // Add project to list container after clearing
  while (currentProject.firstChild) {
    currentProject.removeChild(currentProject.firstChild);
  }
  currentProject.appendChild(buildProject(project));
}

export function activateProject(project) {
  // Switch all projects to not active
  //    Loop through all children of sidebar, removing active
  const sidebarTitles = sidebar.children;
  for (let i = 0; i < sidebarTitles.length; i++) {
    sidebarTitles[i].classList.remove('active');
  }
  // Add 'active' class to this project's side title



  // Deactivate any 'active' to-do-item
  while (currentItem.firstChild) {
    currentItem.removeChild(currentItem.firstChild);
  }
  // Show project in main container
  showProject(project);
}