export default function toDo() {
  // Factory
  let toDoFactory = (title, dueDate, notes, priority, complete) => {

    // Getters and Setters for all properties 

    const getTitle = () => { title };
    const setTitle = (newTitle) => { title = newTitle };
    const getDueDate = () => { title };
    const setDueDate = (newDueDate) => { dueDate = newDueDate };
    const getNotes = () => { notes };
    const setNotes = (newNotes) => { notes = newNotes };
    const getPriority = () => { priority };
    const setPriority = (newPriority) => { priority = newPriority };
    const getComplete = () => { complete };
    const setComplete = (newComplete) => { complete = newComplete };

    return {
      title,
      dueDate,
      notes,
      priority,
      complete,
      getTitle,
      setTitle,
      getDueDate,
      setDueDate,
      getNotes,
      setNotes,
      getPriority,
      setPriority,
      getComplete,
      setComplete
    }
  }

}