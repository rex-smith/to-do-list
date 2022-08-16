import toDoBuilder from './toDoBuilder.js';
import projectBuilder from './projectBuilder.js';
import storageHandler from './storageHandler.js';
import displayController from './displayController.js';
import { format, compareAsc } from 'date-fns';
import './style.css';

console.log('I think it is working!');

// Create initial seed 'database'

let item1 = toDoFactory('Take out trash', new Date(2022, 10, 27, 16),
                        'The trash needs to be taken out by Friday', 1, false);
let item2 = toDoFactory('Water the plants', new Date(2022, 10, 29, 14),
                        'The plants need water before they die', 1, false);
let item3 = toDoFactory('Homework', new Date(2022, 11, 10, 10),
                        'All homework assignments are due by Monday', 2, false);
let item4 = toDoFactory('Wash the dishes', new Date(2022, 12, 6, 16),
                        'Wash the dishes before mom and dad come home', 1, false);                        
let itemArray = [item1, item2, item3, item4];
let seedProject = projectFactory('Main List', itemArray);
let seedProjectArray = [seedProject];

// Save seed array to localStorage
saveList(seedProjectArray);

// Retrieve the array from storage
let projectArray = retrievelist();

// Show all projects

for (project in projectArray) {
  showProject(project);
}




