import projectFactory from './projectBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { displaySidebar } from './sidebarView.js';
import { showProject } from './projectView.js';
import { seedProjectArrays } from './seed.js';
import './style.css';
import './project.css';
import './sidebar.css';
import './itemDetail.css';

let projectArray = [];

let activeProject = createDefaultProject();
projectArray.push(activeProject);

let seedProjects = seedProjectArrays();
for (let i = 0; i < seedProjects.length; i++) {
  projectArray.push(seedProjects[i]);
}

// Save seed array to localStorage
saveList(projectArray);

// Retrieve the array from storage
projectArray = retrieveList();

projectArray = createRealProjects(projectArray);
setActiveProject(projectArray[0]);

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

function setActiveProject(project) {
  activeProject = project;
  showProject(activeProject);
}

function getActiveProject() {
  return activeProject;
}

function initializeView() {
  showProject(activeProject);
  displaySidebar(projectArray);
}

// Show all projects

initializeView();




