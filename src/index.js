import projectFactory from './projectBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { showItemDetail, displaySidebar, toggleItemComplete, showNewProjectLink, showNewProjectForm, showAllProjects, addProjectToSidebar, showOnlyProject, showEditItemForm, showNewItemForm } from './displayController.js';
import './style.css';
import './project.css';
import './sidebar.css';
import './itemDetail.css';

// // Toggle to clear memory
// localStorage.clear();  

let projectArray = [];
projectArray = retrieveList();

if (projectArray.length === 0) {
  projectArray.push(createDefaultProject());
} else {
  projectArray = createRealProjects(projectArray);
}

function getProjectFromItem(item) {
  let project = projectArray.find(project => project.getItems().includes(item));
  return project;
}

function getProjectFromId(projectId) {
  let project = projectArray.find(project => project.getId() === projectId);
  return project;
}

function getItemFromId(itemId) {
  for (let i = 0; i < projectArray.length; i++) {
    let item = projectArray[i].getItems().find(item => item.getId() === itemId);
    if (item) {
      return item;
    }
  }
}

export function getProjectArray() {
  return projectArray;
}

export function addProjectToProjectArray(project) {
  projectArray.push(project);
  saveList(projectArray);
}

function createDefaultProject() {
  const defaultProject = projectFactory('Main List', []);
  return defaultProject;
}

function initializePage() {
  displaySidebar(projectArray);
  showAllProjects();
}

function idFromHTMLId(htmlId) {
  return parseInt(htmlId.split('-').pop());
}

// Event listeners
document.addEventListener('click', masterHandler, false);

function masterHandler(e) {
  // Show all projects
  if (e.target.id === 'side-main-title') {
    showAllProjects();
  }
  // Sidebar title click should activate project for view
  if (e.target.classList.contains('side-project-title')) {
    let projectId = idFromHTMLId(e.target.id);
    let project = getProjectFromId(projectId);
    showOnlyProject(project);
  }
  // Sidebar New Project Button should create title form for new proejct
  if (e.target.parentNode.id === 'side-add-new') {
    showNewProjectForm();
  }
  // Item Name should activate item for view
  if (e.target.classList.contains('item-title')) {
    let id = idFromHTMLId(e.target.parentNode.id);  // Item container is parent
    let item = getItemFromId(id);
    showItemDetail(item);
  }
  // Clicking complete box on item should toggle complete status
  if (e.target.classList.contains('item-complete')) {
    let id = idFromHTMLId(e.target.parentNode.parentNode.id); // Item container is parent of item extras which is parent
    let item = getItemFromId(id); 
    toggleItemComplete(item);
  }
  // Clicking New Item Button should show new item form for new item in project
  if (e.target.classList.contains('add-item-button')) {
    let projectId = parseInt(e.target.dataset.projectId)
    let project = getProjectFromId(projectId);
    showNewItemForm(project);
  }
  // Clicking Edit on Item Detail
  if (e.target.id === 'item-detail-edit') {
    let itemId = parseInt(e.target.parentNode.parentNode.dataset.itemId);
    let item = getItemFromId(itemId);
    showEditItemForm(item);
  }
  // Clicking Delete on Item Detail
  if (e.target.id === 'item-detail-delete') {
    let item = getItemFromId(parseInt(e.target.dataset.itemId));
    let project = getProjectFromItem(item);
    project.removeItem(item);
    saveList(projectArray);
    showOnlyProject(project);
  }
  // Clicking Save on New Item Form
  // if (e.target.id === 'item-save') {
  //   let item = getItemFromId(e.target.dataset.itemId);
  //   project.addItem(item);
  //   saveList(projectArray);
  // }

  // Clicking Cancel on New Item Form
  if (e.target.id === 'item-cancel') {
    itemForm.reset();
    hideItemForm();
  }
  // Changing the sort order will trigger the list to be sorted and shown
  if (e.target.parentNode.classList.contains('switch-toggle')) {
    if (document.querySelector('.active-sidebar-title').id === 'side-main-title') {
      showAllProjects();
    } else {
      let project = getProjectFromId(parseInt(document.querySelector('.active-sidebar-title').id));
      showOnlyProject(project);
    }
  }
};

// New Project Form Submit should create new project and activate it
let newProjectForm = document.getElementById('new-project-form');
newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newProject = projectFactory(newProjectForm.elements['title'].value, []);
  addProjectToProjectArray(newProject);
  addProjectToSidebar(newProject);
  showOnlyProject(newProject);
  newProjectForm.reset();
  showNewProjectLink();
});

// New Item Form Submit should create new item and add it to project and show project

let itemForm = document.getElementById('new-item-form');
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Accept values for all fields 
  const newTitle = itemForm.elements['item-title'].value;
  const newDueDate = new Date(itemForm.elements['item-due-date'].value);
  const newPriority = itemForm.elements['item-priority'].value;
  const newComplete = itemForm.elements['item-complete'].value;
  const newNotes = itemForm.elements['item-notes'].value;

  // Get item from dataset value
  let item = getItemFromId(parseInt(itemForm.dataset.itemId));

  // Build item from fields
  item.setTitle(newTitle);
  item.setDueDate(newDueDate);
  item.setPriority(newPriority);
  item.setComplete(newComplete);
  item.setNotes(newNotes);
  saveList(getProjectArray());

  // Show the full project, which will have the new one included
  showOnlyProject(getProjectFromItem(item));
  
  // Make it the active item to show detail
  itemForm.reset();
  showItemDetail(item);
});



// Show all projects

initializePage();




