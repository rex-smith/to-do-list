import { format } from "date-fns";
import itemFactory from "./itemBuilder";
import { getProjectArray } from "./index";
import { saveList } from "./storageHandler";

const currentProject = document.getElementById("current-project");
const sidebar = document.querySelector(".sidebar");
const itemForm = document.getElementById("new-item-form");
const itemDetail = document.getElementById("item-detail-wrapper");
const newProjectLink = document.getElementById("side-add-new");
const newProjectForm = document.getElementById("new-project-form");
const sideMainTitle = document.getElementById("side-main-title");

// Right side of page is either: item detail, edit item form, new item form
// localStorage.clear();

function showProject(project) {
  currentProject.appendChild(buildProject(project));
}

export function showAllProjects() {
  clearCurrentProjectContainer();
  clearCurrentItemContainer();
  clearActiveSidebarTitle();
  sideMainTitle.classList.add("active-sidebar-title");
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
  if (!itemForm.classList.contains("hidden")) {
    hideItemForm();
  }
  if (!itemDetail.classList.contains("hidden")) {
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
  itemDetail.classList.add("hidden");
}

function unhideItemDetail() {
  itemDetail.classList.remove("hidden");
}

export function hideItemForm() {
  itemForm.classList.add("hidden");
}

function unhideItemForm() {
  itemForm.classList.remove("hidden");
}

export function clearItemForm() {
  itemForm.reset();
}

function populateItemDetail(item) {
  // Set itemId property to item's id
  itemDetail.dataset.itemId = item.getId();

  // Populate Detail View
  const detailedItemTitle = document.getElementById("item-detail-title");
  detailedItemTitle.innerText = `${item.getTitle()}`;

  const detailedItemDueDate = document.getElementById("item-detail-due-date");
  detailedItemDueDate.innerText = `${format(item.getDueDate(), "M-dd-yyyy")}`;

  const detailedItemPriority = document.getElementById("item-detail-priority");
  detailedItemPriority.innerText = `${item.getPriority()}`;

  const detailedItemComplete = document.getElementById("item-detail-complete");
  if (item.getComplete() === true) {
    detailedItemComplete.innerHTML =
      '<i class="fa-regular fa-square-check"></i>';
  } else {
    detailedItemComplete.innerHTML = '<i class="fa-regular fa-square"></i>';
  }

  const detailedItemNotes = document.getElementById("item-detail-notes");
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
  const titleInput = document.getElementById("title-input");
  titleInput.value = item.getTitle();

  // Due Date (Label included)
  const dueDateInput = document.getElementById("due-date-input");
  dueDateInput.value = `${format(item.getDueDate(), "yyyy-MM-dd")}`;

  // Priority (high, medium, low, with low default)
  const priorityInput = document.getElementById("priority-input");
  priorityInput.value = item.getPriority();

  // Complete (checkbox, with not checked default)
  const completeInput = document.getElementById("complete-input");
  completeInput.checked = item.getComplete();

  // Notes (textArea with placeholder)
  const notesInput = document.getElementById("notes-input");
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
  const sideProjectTitle = document.createElement("div");
  sideProjectTitle.innerText = `${project.getTitle()}`;
  sideProjectTitle.id = `sidebar-title-${project.getId()}`;
  sideProjectTitle.classList.add("side-project-title");
  sidebar.appendChild(sideProjectTitle);
}

function clearSidebar() {
  removeChildren(sidebar);
}

export function refreshSidebar() {
  clearSidebar();
  displaySidebar(getProjectArray());
}

function clearActiveSidebarTitle() {
  const activeSidebar = document.querySelector(".active-sidebar-title");
  if (activeSidebar) {
    activeSidebar.classList.remove("active-sidebar-title");
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
  const sidebarTitle = document.getElementById(
    `sidebar-title-${project.getId()}`
  );
  return sidebarTitle;
}

function activateSidebarTitle(element) {
  element.classList.add("active-sidebar-title");
}

export function showNewProjectLink() {
  newProjectLink.classList.remove("hidden");
  newProjectForm.classList.add("hidden");
}

export function showNewProjectForm() {
  newProjectLink.classList.add("hidden");
  newProjectForm.classList.remove("hidden");
}

function buildItem(item) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  itemContainer.id = `item-${item.getId()}`;
  // Title
  const itemTitle = document.createElement("div");
  itemTitle.classList.add("item-title");
  itemTitle.innerText = `${item.getTitle()}`;

  itemContainer.appendChild(itemTitle);

  // Create side content for each item
  const itemExtras = document.createElement("div");
  itemExtras.classList.add("item-extras");

  // Due date
  const itemDueDate = document.createElement("div");
  itemDueDate.classList.add("due-date");
  itemExtras.appendChild(itemDueDate);
  itemDueDate.innerText = `${format(item.getDueDate(), "MM-dd-yyyy")}`;

  // Handle different box shadow based on priority and add flags
  const itemPriority = document.createElement("div");
  itemPriority.classList.add("priority-flag");
  itemPriority.innerHTML = '<i class="fa-solid fa-flag"></i>';
  if (item.getPriority() === "1") {
    itemContainer.classList.add("high-priority");
    itemPriority.classList.add("red-flag");
  } else if (item.getPriority() === "2") {
    itemContainer.classList.add("medium-priority");
    itemPriority.classList.add("orange-flag");
  } else {
    itemContainer.classList.add("low-priority");
    itemPriority.classList.add("transparent-flag");
  }
  itemExtras.appendChild(itemPriority);

  // Checkbox and coloring based on completeness
  const itemComplete = document.createElement("div");
  itemComplete.classList.add("item-complete");
  const checkedBox = document.createElement("i");
  checkedBox.classList.add("fa-regular", "fa-square-check");
  const uncheckedBox = document.createElement("i");
  uncheckedBox.classList.add("fa-regular", "fa-square");
  itemComplete.appendChild(checkedBox);
  itemComplete.appendChild(uncheckedBox);
  itemExtras.appendChild(itemComplete);
  itemContainer.classList.add("to-do-container");
  itemContainer.appendChild(itemExtras);
  displayCompleteStatus(item, itemContainer);
  return itemContainer;
}

function displayCompleteStatus(item, itemContainer) {
  if (!itemContainer) {
    itemContainer = document.getElementById(`item-${item.getId()}`);
  }
  const checkedBox = itemContainer.querySelector(".fa-square-check");
  const uncheckedBox = itemContainer.querySelector(".fa-square");
  if (item.getComplete() === true) {
    itemContainer.classList.add("complete");
    uncheckedBox.classList.add("hidden");
    checkedBox.classList.remove("hidden");
  } else {
    itemContainer.classList.remove("complete");
    checkedBox.classList.add("hidden");
    uncheckedBox.classList.remove("hidden");
  }
}

export function toggleItemComplete(item) {
  item.setComplete(!item.getComplete());
  saveList(getProjectArray());
  displayCompleteStatus(item);
}

function getSortOrder() {
  const sortOrderOptions = document.getElementsByName("sort-order");
  for (let i = 0; i < sortOrderOptions.length; i++) {
    if (sortOrderOptions[i].checked) {
      return sortOrderOptions[i].value;
    }
  }
}

function sortItemArray(itemArray) {
  // Sort based on case
  switch (getSortOrder()) {
    case "due-date":
      itemArray.sort((a, b) => a.getDueDate() - b.getDueDate());
      break;
    case "priority":
      itemArray.sort((a, b) => a.getPriority() - b.getPriority());
      break;
    case "complete":
      itemArray.sort((a, b) => a.getComplete() - b.getComplete());
      break;
    default:
      itemArray.sort((a, b) => a.getId() - b.getId());
  }
  return itemArray;
}

function buildProject(project) {
  const newProject = document.createElement("div");
  const newProjectTitleContainer = document.createElement("div");
  newProjectTitleContainer.classList.add("project-title-container");
  const newProjectTitle = document.createElement("h2");
  newProjectTitleContainer.appendChild(newProjectTitle);
  const newProjectDeleteButton = document.createElement("button");
  newProjectDeleteButton.classList.add("project-delete");
  newProjectDeleteButton.innerText = "Delete";
  newProjectDeleteButton.id = `delete-project-${project.getId()}`;
  newProjectTitleContainer.appendChild(newProjectDeleteButton);
  newProject.appendChild(newProjectTitleContainer);
  newProjectTitle.innerText = `${project.getTitle()}`;
  newProjectTitle.classList.add("project-title");
  const newProjectList = document.createElement("div");
  const sortedItemArray = sortItemArray(project.getItems());

  for (let i = 0; i < sortedItemArray.length; i++) {
    const itemContainer = buildItem(sortedItemArray[i]);
    newProjectList.appendChild(itemContainer);
  }
  // Add new item button
  const addItemButton = document.createElement("div");
  addItemButton.innerText = "+ Add New Item";
  addItemButton.classList.add("add-item-button");
  // Set project id on button
  addItemButton.dataset.projectId = project.getId();
  newProjectList.appendChild(addItemButton);
  newProject.appendChild(newProjectList);
  return newProject;
}
