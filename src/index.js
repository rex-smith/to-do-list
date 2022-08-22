import projectFactory from './projectBuilder.js';
import itemFactory from './itemBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { seedProjectArrays } from './seed.js';
import { displaySidebar, activateProject } from './displayController.js';
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
  activateProject(projectArray[0]);
}

// Show all projects

initializePage();




