import { format } from 'date-fns';
import itemFactory from './itemBuilder.js';

let currentItem = document.getElementById('current-item');

// Right side of page is either: item detail, edit item form, new item form

export function showItemDetail(item) {
  // Deactivate any 'active' to-do-item
  clearCurrentItem();

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
  detailedItemEdit.addEventListener('click', showItemEditForm(item));

  let detailedItemDelete = document.createElement('button');
  detailedItemDelete.innerText = 'Delete';
  detailedItemDelete.classList.add('button-delete');
  detailedItemDelete.addEventListener('click', deleteItem(item));

  // Append Children
  detailedItemView.appendChild(detailedItemTitle);
  detailedItemView.appendChild(detailedItemDueDate);
  detailedItemView.appendChild(detailedItemPriority);
  detailedItemView.appendChild(detailedItemComplete);
  detailedItemView.appendChild(detailedItemNotes);
  detailedItemView.appendChild(detailedItemEdit);
  detailedItemView.appendChild(detailedItemDelete);

  // Append detail view to current item
  clearCurrentItem();
  currentItem.appendChild(detailedItemView);
}

export function showItemEditForm(item) {
  showItemForm(item);
}

export function showNewItemForm() {
  const newItem = itemFactory();
  showItemForm(newItem);
}

export function showItemForm(item) {
  // Turn everything from item detail info form

  const itemForm = document.getElementById('new-item-form');
  const itemDetail = document.getElementById('item-detail-wrapper');

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
    itemForm.classList.add('hidden');
  }); 

  // Toggle Active on Form (make sure it's visible)
  if (!itemForm.classList.include('hidden')) {
    itemDetail.classList.remove('hidden');
  }
  // Toggle Active on Item Detail (make sure not visible)
  if (!itemDetail.classList.include('hidden')) {
    itemDetail.classList.add('hidden');
  }
}



function clearCurrentItem() {
  while (currentItem.firstChild) {
    currentItem.removeChild(currentItem.firstChild);
  }
}