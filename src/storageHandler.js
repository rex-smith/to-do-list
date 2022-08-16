import projectBuilder from './projectBuilder.js'
import toDoBuilder from './toDoBuilder.js'

export default function storageHandler() {
  // Check if storage available

  function storageAvailable(type) {
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

  function saveList(projectArray) {
    if (storageAvailable('localStorage')) {
      if (localStorage.length > 0) {
        localStorage.clear();
      }
      // For each project to be stored as separate
      // for (let i = 0; i < projectArray.length; i++) {
      //   localStorage.setItem(`project-${i}`, JSON.stringify(projectArray[i]));
      // }
      // OR FOR FULL ARRAY SERIALIZED
      localStorage.setItem('project-array', JSON.stringify(projectArray));
    } else {
      console.log('No storage set up!');
    }
  }

  function retrieveList() {
    if (storageAvailable('localStorage')) {
      let projectArray = [];
      if (localStorage.length > 0) {
        // To retrieve if each project stored separately
        // for (let i = 0; i < localStorage.length; i++) {
        //   let savedProject = JSON.parse(localStorage.getItem(localStorage.key(i)));
        //   projectArray.push(savedProject);
        // }
        // OR FOR FULL ARRAY FROM SERIALIZED VERSION
        projectArray = JSON.parse(localStorage.getItem('project-array'));
        return projectArray;
      } else {
        console.log('Nothing in storage!');
      }
    } else {
      console.log('No storage set up!');
    }
  }

  function createRealItem(item) {
    let realItem = toDoBuilder.toDoFactory(item.title, item.dueDate, item.notes, item.priority, item.complete);
    return realItem;
  }

  function createRealProjects(projectArray) {
    let realProjectArray = [];
    for (project in projectArray) {
      let realItemArray = [];
      for (item in project) {
        realItemArray.push(createRealItem(item));
      }
      let realProject = projectBuilder.projectFactory(project.title, realItemArray);
      realProjectArray.push(realProject);
    }
    return realProjectArray;
  }

}