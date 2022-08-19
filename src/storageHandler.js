import projectFactory from './projectBuilder.js'
import itemFactory from './itemBuilder.js'

export function storageAvailable(type) {
  let storage;
  try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch (e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

export function saveList(projectArray) {
  if (storageAvailable('localStorage')) {
    if (localStorage.length > 0) {
      localStorage.clear();
    }
    localStorage.setItem('project-array', JSON.stringify(projectArray));
  } else {
    console.log('No storage set up!');
  }
}

export function retrieveList() {
  if (storageAvailable('localStorage')) {
    let projectArray = [];
    if (localStorage.length > 0) {
      projectArray = JSON.parse(localStorage.getItem('project-array'));
      return projectArray;
    } else {
      console.log('Nothing in storage!');
    }
  } else {
    console.log('No storage set up!');
  }
}

export function createRealItem(item) {
  let realItem = itemFactory(item.title, new Date(item.dueDate), item.notes, item.priority, item.complete);
  return realItem;
}

export function createRealProjects(projectArray) {
  let realProjectArray = [];
  for (let i = 0; i < projectArray.length; i++) {
    let realItemArray = [];
    let project = projectArray[i];
    let itemArray = project.itemArray;
    for (let j = 0; j < itemArray.length; j++) {
      realItemArray.push(createRealItem(itemArray[j]));
    }
    let realProject = projectFactory(project.title, realItemArray);
    realProjectArray.push(realProject);
  }
  return realProjectArray;
}