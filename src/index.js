import projectFactory from './projectBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { seedProjectArrays } from './seed.js';
import { displaySidebar, activateProject } from './displayController.js';
import './style.css';
import './project.css';
import './sidebar.css';
import './itemDetail.css';

let projectArray = [];
let defaultProject = createDefaultProject();
projectArray.push(defaultProject);

let seedProjects = seedProjectArrays();
for (let i = 0; i < seedProjects.length; i++) {
  projectArray.push(seedProjects[i]);
}

// Save seed array to localStorage
saveList(projectArray);

// Retrieve the array from storage
projectArray = retrieveList();

projectArray = createRealProjects(projectArray);

function getProjectFromItem(item) {
  let project = projectArray.find(project => project.getId() === item.getProjectId());
  return project;
}

function deleteItem(item) { 
  let project = getProjectFromItem(item);
  project.removeItem(item);
  saveList(projectArray);
}

function createDefaultProject() {
  const defaultProject = projectFactory('Main List', []);
  return defaultProject;
}

function initializePage() {
  displaySidebar(projectArray);
  activateProject(projectArray[0]);
}

// Show all projects

initializePage();




