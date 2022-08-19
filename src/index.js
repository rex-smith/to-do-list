import itemFactory from './itemBuilder.js';
import projectFactory from './projectBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { addProjectToSidebar, showProject } from './displayController.js';
import { format, compareAsc } from 'date-fns';
import './style.css';

console.log('Index.js file loaded.');

// Create initial seed 'database'
let item1 = itemFactory('Take out trash', new Date(2019, 10, 27, 16),
                        'The trash needs to be taken out by Friday', 1, false);
let item2 = itemFactory('Water the plants', new Date(2022, 10, 29, 14),
                        'The plants need water before they die', 1, false);
let item3 = itemFactory('Homework', new Date(2022, 11, 10, 10),
                        'All homework assignments are due by Monday', 2, false);
let item4 = itemFactory('Wash the dishes', new Date(2022, 12, 6, 16),
                        'Wash the dishes before mom and dad come home', 1, false);                        
let itemArray = [item1, item2, item3, item4];
let seedProject = projectFactory('Main List', itemArray);
let seedProjectArray = [seedProject];

// Save seed array to localStorage
saveList(seedProjectArray);

// Retrieve the array from storage
let projectArray = retrieveList();
projectArray = createRealProjects(projectArray);

// Show all projects

for (let i = 0; i < projectArray.length; i++) {
  addProjectToSidebar(projectArray[i]);
  showProject(projectArray[i]);
}




