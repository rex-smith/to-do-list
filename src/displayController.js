import { format, compareAsc } from 'date-fns';
import toDoFactory from './itemBuilder.js';

// Probably need to put these into each function
let currentProject = document.getElementById('current-project');
let currentItem = document.getElementById('current-item');
let sidebar = document.querySelector('.sidebar');

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
  itemContainer.appendChild(itemExtras);
  return itemContainer;
}

function showItemDetail(item) {
  // Deactivate any 'active' to-do-item
  while (currentItem.firstChild) {
    currentItem.removeChild(currentItem.firstChild);
  }
  // Build Detail View
  let detailedItemView = document.createElement('div');
  let detailedItemTitle = document.createElement('h2');
  detailedItemTitle.innerText = `${item.getTitle()}`;
  let detailedItemDueDate = document.createElement('div');
  detailedItemDueDate.innerText = `Due: ${format(item.getDueDate(), 'h:MMa, MM-dd-yyyy')}`;
  let detailedItemPriority = document.createElement('div');
  detailedItemPriority.innerText = `Priority: ${item.getPriority()}`;
  let detailedItemComplete = document.createElement('div');
  if (item.getComplete() === true) {
    detailedItemComplete.innerHTML = 'Completed: <i class="fa-regular fa-square-check"></i>';
  } else {
    detailedItemComplete.innerHTML = 'Completed: <i class="fa-regular fa-square"></i>';
  }
  let detailedItemNotes = document.createElement('div');
  detailedItemNotes.innerText = `Notes: ${item.getNotes()}`;
  let detailedItemEdit = document.createElement('button');
  detailedItemEdit.innerText = 'Edit';
  let detailedItemDelete = document.createElement('button');
  detailedItemDelete.innerText = 'Delete';
  detailedItemDelete.classList.add('button-delete');

  // Append Children
  detailedItemView.appendChild(detailedItemTitle);
  detailedItemView.appendChild(detailedItemDueDate);
  detailedItemView.appendChild(detailedItemPriority);
  detailedItemView.appendChild(detailedItemComplete);
  detailedItemView.appendChild(detailedItemNotes);
  detailedItemView.appendChild(detailedItemEdit);
  detailedItemView.appendChild(detailedItemDelete);
  // *** ADD EVENT LISTENERS TO TRIGGER EDIT AND DELETE FUNCTIONS
  // Append detail view to current item
  currentItem.appendChild(detailedItemView);
}

function showItemEditForm(item) {
  // Turn everything from item detail into form
  let editItemForm = document.createElement('form');
  // Title Input (Placeholder instead of label)
  // Due Date (Label included?)
  // Priority (high, medium, low, with low default)


  currentItem.removeChild(currentItem.firstChild);
  currentItem.appendChild(editItemForm);
}

function showNewItemForm(project) {
  // Turn everything from item detail info form
  const newItemForm = document.createElement('form');
  newItemForm.classList.add('new-item-form')
  // Title Input (Placeholder instead of label)
  const titleInput = document.createElement('input');
  newItemForm.appendChild(titleInput);
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'item-title');
  titleInput.setAttribute('placeholder', 'Title');
  titleInput.id = 'title-input';

  // Due Date (Label included)
  const dueDateField = document.createElement('div');
  dueDateField.classList.add('field');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.innerText = 'Due Date: ';
  dueDateLabel.setAttribute('for', 'item-due-date');
  dueDateField.appendChild(dueDateLabel);
  const dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('name', 'item-due-date');
  dueDateInput.id = 'due-date-input';
  dueDateField.appendChild(dueDateInput);
  newItemForm.appendChild(dueDateField);

  // Priority (high, medium, low, with low default)
  const priorityField = document.createElement('div');
  priorityField.classList.add('field')
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'item-priority');
  priorityLabel.innerText = 'Priority Level: '
  priorityField.appendChild(priorityLabel);
  const priorityInput = document.createElement('select');
  priorityInput.setAttribute('name', 'item-priority');
  priorityInput.id = 'priority-input';
  const priorityArray = ['High', 'Medium', 'Low'];
  for (let i = 0; i< priorityArray.length; i++) {
    const option = document.createElement('option');
    option.value = (i + 1) ;
    option.text = priorityArray[i];
    priorityInput.appendChild(option);
  }
  priorityInput.selectedIndex = 2; // Low should be default
  priorityField.appendChild(priorityInput);
  newItemForm.appendChild(priorityField);
  
  // Complete (checkbox, with not checked default)
  const completeField = document.createElement('div');
  completeField.classList.add('field');
  const completeLabel = document.createElement('label');
  completeLabel.innerText = 'Complete: '
  completeLabel.setAttribute('for', 'item-complete');
  completeField.appendChild(completeLabel)
  const completeInput = document.createElement('input');
  completeInput.setAttribute('type', 'checkbox');
  completeInput.setAttribute('name', 'item-complete');
  completeInput.id = 'complete-input';
  completeField.appendChild(completeInput);
  newItemForm.appendChild(completeField);

  // Notes (textArea with placeholder)
  const notesLabel = document.createElement('label');
  notesLabel.innerText = 'Notes';
  notesLabel.setAttribute('for', 'item-notes');
  newItemForm.appendChild(notesLabel);
  const notesInput = document.createElement('textarea');
  notesInput.setAttribute('name', 'item-notes');
  notesInput.setAttribute('placeholder', 'Notes');
  notesInput.setAttribute('rows', '5')
  notesInput.setAttribute('cols', '30');
  notesInput.id = 'notes-input';
  newItemForm.appendChild(notesInput);

  // Submit Button
  const newItemFormButton = document.createElement('input');
  newItemFormButton.setAttribute('type', 'submit');
  newItemFormButton.innerText = 'Add Item';
  newItemFormButton.classList.add('button-primary');
  newItemFormButton.id = 'new-item-form-button';
  newItemForm.appendChild(newItemFormButton);

  // Add Item (On Submit)
  newItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Accept values for all fields 
    const newItemTitle = newItemForm.elements['item-title'].value;
    const newItemDueDate = new Date(newItemForm.elements['item-due-date'].value);
    const newItemPriority = newItemForm.elements['item-priority'].value;
    const newItemComplete = newItemForm.elements['item-complete'].value;
    const newItemNotes = newItemForm.elements['item-notes'].value;

    // Build item from fields
    let newItem = toDoFactory(newItemTitle, newItemDueDate, newItemPriority, newItemComplete, newItemNotes);
    
    // Add item to the project
    project.addItem(newItem);

    // Show the full project, which will have the new one included
    showProject(project);
    
    // Make it the active item to show detail
    currentItem.removeChild(currentItem.firstChild);
    newItemForm.reset();
    showItemDetail(newItem);
  })

  currentItem.removeChild(currentItem.firstChild);
  currentItem.appendChild(newItemForm);
}

function showNewProjectForm() {
  // Create input element for name, on submit, create new project and show
}

function showEditProjectForm(project) {
  // Normal project view but name is editable 
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
    itemContainer.classList.add('to-do-container');
    newProjectList.appendChild(itemContainer);
  }
  // Add new item button
  let addItemButton = document.createElement('div');
  addItemButton.innerText = '+ Add New Item';
  addItemButton.classList.add('add-item-button');
  addItemButton.addEventListener('click', () => {
    showNewItemForm(project);
  });
  newProjectList.appendChild(addItemButton);
  newProject.appendChild(newProjectList);
  return newProject;
}

export function addProjectToSidebar(project) {
  // Add name to sidebar
  let sideProjectTitle = document.createElement('div');
  sideProjectTitle.innerText = `${project.getTitle()}`
  sideProjectTitle.classList.add('side-project-title');
  sidebar.appendChild(sideProjectTitle);

  // Add event listener to activate project when sidelink clicked on
  sideProjectTitle.addEventListener('click', () => {
    // Deactive current active project
    let activeSidebar = document.querySelector('.active-sidebar-title');
    if (activeSidebar) {
      activeSidebar.classList.remove('active-sidebar-title');
    }
    // Set this one as active
    sideProjectTitle.classList.add('active-sidebar-title');
    // Deactivate any 'active' to-do-item
    while (currentItem.firstChild) {
      currentItem.removeChild(currentItem.firstChild);
    }
    // Show project in main container
    showProject(project);
  });
}

export function addNewProjectLink() {
  let sideProjectNew = document.createElement('div');
  sideProjectNew.innerText = '+ New Project'
  sideProjectNew.classList.add('side-add-new');
  sideProjectNew.addEventListener('click', () => {
    // Add in placeholder sidebar title

    // Once form completed, activate new project, submit name for project 
  });
  sidebar.appendChild(sideProjectNew);
}

export function showProject(project) {
  // Add project to list container after clearing
  while (currentProject.firstChild) {
    currentProject.removeChild(currentProject.firstChild);
  }
  currentProject.appendChild(buildProject(project));
  showItemDetail(project.getItems()[0]);
}

export function initializeView(projectArray) {
  showProject(projectArray[0]);
  addNewProjectLink();
}