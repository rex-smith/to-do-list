export default function Project() {
  let projectFactory = (title, toDoArray) {

    const getTitle = () => { title };
    const setTitle = (newTitle) => { title = newTitle }; 
    const getToDos = () => { toDoArray };
    const addToDo = (toDoItem) => {
      toDoArray.push(toDoItem);
    }
    const removeToDo = (toDoItem) => {
      for (let i = 0; i < toDoArray.length; i++) {
        if (toDoArray[i].getTitle === toDoItem.getTitle) {
          toDoArray.splice(i, 1)
        }
      }
    }
    return {
      title,
      toDoArray,
      getTitle,
      setTitle,
      getToDos,
      addToDo,
      removeToDo
    }
  }
}