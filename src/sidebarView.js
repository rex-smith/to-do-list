import projectFactory from './projectBuilder.js';
import { showProject } from './projectView.js';

let sidebar = document.querySelector('.sidebar');
let currentItem = document.getElementById('current-item');

export function displaySidebar(projectArray) {
  for (let i = 0; i < projectArray.length; i++) {
    addProjectToSidebar(projectArray[i]);
  }
  addNewProjectLink();
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
    clearActiveSidebarTitle();
    // Set this one as active
    activateSidebarTitle(sideProjectTitle);
    // Deactivate any 'active' to-do-item
    while (currentItem.firstChild) {
      currentItem.removeChild(currentItem.firstChild);
    }
    // Show project in main container
    showProject(project);
  });
}

function clearActiveSidebarTitle() {
  let activeSidebar = document.querySelector('.active-sidebar-title');
  if (activeSidebar) {
    activeSidebar.classList.remove('active-sidebar-title');
  }
}

function activateSidebarTitle(element) {
  element.classList.add('active-sidebar-title');
}

export function addNewProjectLink() {
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

function showEditProjectForm(project) {
  // Normal project view but name is editable
  showProjectForm(project);
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
    showProject(project);
    sidebar.removeChild(sidebar.lastChild);
    addProjectToSidebar(project);
    addNewProjectLink();
    // Activate sidebar title
    // Remove any active todos
  });
  sidebar.appendChild(newProjectForm);
}
