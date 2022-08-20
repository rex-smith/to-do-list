import itemFactory from './itemBuilder.js';
import projectFactory from './projectBuilder.js';
import { saveList, retrieveList, createRealProjects } from './storageHandler.js';
import { initializeView, addProjectToSidebar } from './displayController.js';
import './style.css';
import './project.css';
import './sidebar.css';
import './itemDetail.css';

// Create initial seed 'database'
let item1 = itemFactory('Take out trash', new Date(2019, 10, 27, 16),
                        'The trash needs to be taken out by Friday', 1, false);
let item2 = itemFactory('Water the plants', new Date(2022, 10, 29, 14),
                        'The plants need water before they die', 1, false);
let item3 = itemFactory('Homework', new Date(2022, 11, 10, 10),
                        'All homework assignments are due by Monday', 2, false);
let item4 = itemFactory('Wash the dishes', new Date(2022, 12, 6, 16),
                        'Wash the dishes before mom and dad come home', 1, true);                        
let itemArray1 = [item1, item2, item3, item4];
let seedProject1 = projectFactory('Main List', itemArray1);

let item5 = itemFactory('English', new Date(2019, 10, 27, 16),
                        'Read Fahrenheit 411', 3, false);
let item6 = itemFactory('Spanish', new Date(2019, 10, 28, 14),
                        'Find a partner for the oral exam', 1, false);
let item7 = itemFactory('Math', new Date(2019, 11, 1, 10),
                        'Problem Set #1, all even problems', 3, true);
let item8 = itemFactory('Biology', new Date(2019, 12, 6, 16),
                        'Read pages 92-106', 2, false);                        
let itemArray2 = [item5, item6, item7, item8];
let seedProject2 = projectFactory('Assignments', itemArray2);

let seedProjectArray = [seedProject1, seedProject2];

// Save seed array to localStorage
saveList(seedProjectArray);

// Retrieve the array from storage
let projectArray = retrieveList();

projectArray = createRealProjects(projectArray);

// Show all projects

for (let i = 0; i < projectArray.length; i++) {
  addProjectToSidebar(projectArray[i]);
}

initializeView(projectArray);




