import itemFactory from "./itemBuilder";
import projectFactory from "./projectBuilder";

export function seedProjectArrays() {
  // Create initial seed 'database'
  let seedProject1 = projectFactory('Chores', []);
  let item1 = itemFactory('Take out trash', new Date(2019, 10, 27, 16),
                          'The trash needs to be taken out by Friday', 1, false, seedProject1.getId());
  let item2 = itemFactory('Water the plants', new Date(2022, 10, 29, 14),
                          'The plants need water before they die', 1, false, seedProject1.getId());
  let item3 = itemFactory('Homework', new Date(2022, 11, 10, 10),
                          'All homework assignments are due by Monday', 2, false, seedProject1.getId());
  let item4 = itemFactory('Wash the dishes', new Date(2022, 12, 6, 16),
                          'Wash the dishes before mom and dad come home', 1, true, seedProject1.getId());                        
  seedProject1.addItem(item1);
  seedProject1.addItem(item2);
  seedProject1.addItem(item3);
  seedProject1.addItem(item4);

  let seedProject2 = projectFactory('Assignments', []);
  let item5 = itemFactory('English', new Date(2019, 10, 27, 16),
                          'Read Fahrenheit 411', 3, false, seedProject2.getId());
  let item6 = itemFactory('Spanish', new Date(2019, 10, 28, 14),
                          'Find a partner for the oral exam', 1, false, seedProject2.getId());
  let item7 = itemFactory('Math', new Date(2019, 11, 1, 10),
                          'Problem Set #1, all even problems', 3, true, seedProject2.getId());
  let item8 = itemFactory('Biology', new Date(2019, 12, 6, 16),
                          'Read pages 92-106', 2, false, seedProject2.getId());                        
  seedProject2.addItem(item5);
  seedProject2.addItem(item6);
  seedProject2.addItem(item7);
  seedProject2.addItem(item8);

  return [seedProject1, seedProject2];
}
