import itemFactory from './itemBuilder.js';
import projectFactory from './projectBuilder.js';
import { format } from 'date-fns';

let currentProject = document.getElementById('current-project');
let sidebar = document.querySelector('.sidebar');
let currentItem = document.getElementById('current-item');
let itemForm = document.getElementById('new-item-form');
let itemDetail = document.getElementById('item-detail-wrapper');
let activeProject = null;

// Right side of page is either: item detail, edit item form, new item form

export function activateProject(project) {
  setActiveProject(project);
  activateProjectView(project);
}

function setActiveProject(project) {
  activeProject = project;
  showProject(activeProject);
}

function getActiveProject() {
  return activeProject;
}

function activateProjectView(project) {
  clearCurrentItem();
  showProject(project);
  highlightProjectSidebar(project);
}

function clearCurrentItem() {
  if (!itemForm.classList.contains('hidden')) {
    hideItemForm();
  }
  if (!itemDetail.classList.contains('hidden')) {
    hideItemDetail();
  }
}

function clearCurrentProject() {
  removeChildren(currentProject);
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function showItemDetail(item) {
  // Deactivate any 'active' to-do-item
  clearCurrentItem();
  populateItemDetail(item);

  let detailedItemEdit = document.getElementById('item-detail-edit');
  detailedItemEdit.addEventListener('click', showItemEditForm(item));

  let detailedItemDelete = document.getElementById('item-detail-delete');
  // *** ADD EVENT LISTENER TO DELETE ITEM ***

  // Unhide item detail view

  unhideItemDetail();
}
function hideItemDetail() {
  console.log('HIDING item detail');
  itemDetail.classList.add('hidden');
}

function unhideItemDetail() {
  console.log('Unhiding item detail');
  itemDetail.classList.remove('hidden');
}

function hideItemForm() {
  console.log('HIDING item form');
  itemForm.classList.add('hidden');
}

function unhideItemForm() {
  console.log('Unhiding item form');
  itemForm.classList.remove('hidden');
}

function populateItemDetail(item) {
  // Populate Detail View

  let detailedItemTitle = document.getElementById('item-detail-title');
  detailedItemTitle.innerText = `${item.getTitle()}`;

  let detailedItemDueDate = document.getElementById('item-detail-due-date');
  detailedItemDueDate.innerText = `Due: ${format(item.getDueDate(), 'h:MMa, MM-dd-yyyy')}`;
  
  let detailedItemPriority = document.getElementById('item-details-priority');
  detailedItemPriority.innerText = `Priority: ${item.getPriority()}`;
  
  let detailedItemComplete = document.getElementById('item-detail-complete');
  if (item.getComplete() === true) {
    detailedItemComplete.innerHTML = 'Completed: <i class="fa-regular fa-square-check"></i>';
  } else {
    detailedItemComplete.innerHTML = 'Completed: <i class="fa-regular fa-square"></i>';
  }
  
  let detailedItemNotes = document.getElementById('item-detail-notes');
  detailedItemNotes.innerText = `${item.getNotes()}`;
}

function disableItemForm() {
  itemForm.disabled = true;
}

function showItemEditForm(item) {
  showItemForm(item);
}

function showNewItemForm() {
  const newItem = itemFactory();
  showItemForm(newItem);
}

function showItemForm(item) {

  // Title Input (Placeholder instead of label)
  const titleInput = document.getElementById('title-input');
  titleInput.value = item.getTitle();

  // Due Date (Label included)
  const dueDateInput = document.getElementById('due-date-input');
  dueDateInput.value = `${format(item.getDueDate(), 'MM-dd-YYY')}`;

  // Priority (high, medium, low, with low default)
  priorityField.appendChild(priorityLabel);
  const priorityInput = document.getElementById('priority-input');
  priorityInput.value = item.getPriority();
  
  // Complete (checkbox, with not checked default)
  const completeInput = document.getElementById('complete-input');
  completeInput.value = item.getComplete();

  // Notes (textArea with placeholder)
  const notesInput = document.getElementById('notes-input');
  notesInput.value = item.getNotes();

  // Submit / Save Button
  const itemSaveButton = document.getElementById('item-save');

  // Add Item (On Submit)
  itemSaveButton.addEventListener('click', () => {
    // Accept values for all fields 
    const newItemTitle = itemForm.elements['item-title'].value;
    const newItemDueDate = new Date(itemForm.elements['item-due-date'].value);
    const newItemPriority = itemForm.elements['item-priority'].value;
    const newItemComplete = itemForm.elements['item-complete'].value;
    const newItemNotes = itemForm.elements['item-notes'].value;

    // Build item from fields
    let newItem = itemFactory(newItemTitle, newItemDueDate, newItemPriority, newItemComplete, newItemNotes, activeProject.getId());
    console.log(activeProject);
    // Add item to the project
    project.addItem(newItem);

    // Show the full project, which will have the new one included
    showProject(project);
    
    // Make it the active item to show detail
    itemForm.reset();
    showItemDetail(newItem);
  });

  // Cancel Button
  const itemCancelButton = document.getElementById('item-cancel');

  itemCancelButton.addEventListener('click', () => { 
    itemForm.reset();
    hideItemForm
  }); 

  clearCurrentItem();
  unhideItemForm();
}

export function displaySidebar(projectArray) {
  for (let i = 0; i < projectArray.length; i++) {
    addProjectToSidebar(projectArray[i]);
  }
  addNewProjectLink();
}

function addProjectToSidebar(project) {
  // Add name to sidebar
  let sideProjectTitle = document.createElement('div');
  sideProjectTitle.innerText = `${project.getTitle()}`
  sideProjectTitle.id = `sidebar-title-${project.getId()}`;
  sideProjectTitle.classList.add('side-project-title');
  sidebar.appendChild(sideProjectTitle);

  // Add event listener to activate project when sidelink clicked on
  sideProjectTitle.addEventListener('click', () => {
    activateProject(project);
  });
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

function addNewProjectLink() {
  let sideProjectNew = document.createElement('div');
  sideProjectNew.innerText = '+ New Project'
  sideProjectNew.id = 'side-add-new';
  sideProjectNew.addEventListener('click', () => {
    showNewProjectForm();
  });
  sidebar.appendChild(sideProjectNew);
}

function showNewProjectForm() {
  // Create input element for name, on submit, create new project and show
  let newProject = projectFactory('', []);
  showProjectForm(newProject);
}

function showProjectForm(project) {
  // Create input element for name, on submit, create new project and show
  if (document.getElementById('new-project-form')) {
    sidebar.removeChild(document.getElementById('new-project-form'));
  }
  if (document.getElementById('side-add-new')) {
    sidebar.removeChild(document.getElementById('side-add-new'));
  }

  let newProjectForm = document.createElement('form');
  let newProjectName = document.createElement('input');
  newProjectName.value = project.getTitle();
  newProjectForm.id = 'new-project-form';
  newProjectName.setAttribute('type', 'text');
  newProjectName.setAttribute('placeholder', 'Project Name');
  newProjectForm.appendChild(newProjectName);
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    project.setTitle(newProjectName.value);
    sidebar.removeChild(sidebar.lastChild);
    addProjectToSidebar(project);
    activateProjectView(project);
    addNewProjectLink();
    // Activate sidebar title
    // Remove any active todos
  });
  sidebar.appendChild(newProjectForm);
}

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

function showProject(project) {
  // Add project to list container after clearing
  clearCurrentProject();
  clearCurrentItem();
  currentProject.appendChild(buildProject(project));
  if(project.getItems().length > 0) {
    showItemDetail(project.getItems()[0]);
  }
}

// Event Listeners
// *** Click Project on Sidebar ***
// *** Click ToDo Item for Item Detail ***
// *** Click Add New Project ***
// *** Click Add New ToDo Item ***
// *** Click Edit Item ***
// *** Click Delete Item ***
// *** Click Cancel Item Edit *** 