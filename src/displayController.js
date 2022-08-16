import toDoBuilder from './toDoBuilder.js'
import projectBuilder from './projectBuilder.js'
import { format, compareAsc } from 'date-fns';


export default function displayController() {
  let currentProject = document.getElementById('current-project');
  let currentItem = document.getElementById('current-item');
  let sidebar = document.querySelector('.sidebar');

  function buildItem(item) {
    let newItem = document.createElement('div');
    newItem.classList.add('to-do-container');
    let newItemTitle = document.createElement('div');
    newItemTitle.innerText = `${item.getTitle()}`
    newItem.appendChild(newItemTitle);
    let newItemDueDate = document.createElement('div');
    newItem.appendChild(newItemDueDate);
    newItemDueDate.innerText = `${format(item.getDueDate(), 'yyyy-MM-dd')}`
    // Handle different borders and colors based on priority
    if (item.getPriority() === 1) {
      newItem.classList.add('high-priority');
    } else if (item.getPriority() === 2) {
      newItem.classList.add('medium-priority');
    } else {
      newItem.classList.add('low-priority');
    }
    // Form or button to select box for new item complete
    // This should just change whether there is an x and strikeout with gray font or [] 
    let newItemComplete = document.createElement('div');
    if (newItem.getComplete() === true) {
      newItem.classList.add('complete');
    } else {
      newItem.classList.add('incomplete');
    }
    return newItem;
  }
  
  function showItem(item) {
    // Display Todo
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
    newProjectTitle.innerText = `${project.getTitle}`;
    let newProjectList = document.createElement('div');
    for (item in project.getToDos) {
      let newItem = buildItem(item);
      newProjectList.appendChild(newItem);
    }
    newProject.appendChild(newProjectList);
    return newProject;
  }

  function addProjectToSidebar(project) {
    // Add name to sidebar
    let sideProjectTitle = document.createElement('div');
    sideProjectTitle.innerText = `${project.getTitle()}`
    sidebar.appendChild(sideProjectTitle);
    // Need to add event listener to showProject when sidelink clicked on
  }

  function showProject(project) {
    // Add project to list container after clearing
    while (currentProject.firstChild) {
      currentProject.removeChild(currentProject.firstChild);
    }
    currentProject.appendChild(buildProject(project));
  }

}