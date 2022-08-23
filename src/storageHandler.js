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
  let projects = [];
  for (let i = 0; i < projectArray.length; i++) {
    let project = projectArray[i];
    let itemArray = [];
    for (let j = 0; j < project.getItems().length; j++) {
      let item = project.getItems()[j];
      let itemObj = {
        title: item.getTitle(),
        dueDate: item.getDueDate(),
        notes: item.getNotes(),
        priority: item.getPriority(),
        complete: item.getComplete(),
        projectId: item.getProjectId(),
        id: item.getId()
      }
      itemArray.push(itemObj);
    }
    let projectObj = {
      title: project.getTitle(),
      items: itemArray,
      id: project.getId()
    }
    projects.push(projectObj);
  }

  if (storageAvailable('localStorage')) {
    if (localStorage.length > 0) {
      localStorage.clear();
    }
    localStorage.setItem('project-array', JSON.stringify(projects));
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
      return [];
    }
  } else {
    console.log('No storage set up!');
  }
}

export function createRealItem(item) {
  let realItem = itemFactory( item.title,
                              new Date(item.dueDate),
                              item.notes,
                              item.priority,
                              item.complete,
                              item.projectId,
                              item.id );
  return realItem;
}

export function createRealProjects(projectArray) {
  let realProjectArray = [];
  for (let i = 0; i < projectArray.length; i++) {
    let realItemArray = [];
    let project = projectArray[i];
    let itemArray = project.items;
    for (let j = 0; j < itemArray.length; j++) {
      realItemArray.push(createRealItem(itemArray[j]));
    }
    let realProject = projectFactory(project.title, realItemArray, project.id);
    realProjectArray.push(realProject);
  }
  return realProjectArray;
}