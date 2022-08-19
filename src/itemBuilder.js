export default function toDoFactory(title, dueDate, notes, priority, complete) {

  const getTitle = () => { return title } ;
  const setTitle = (newTitle) => { title = newTitle };
  const getDueDate = () => { return dueDate };
  const setDueDate = (newDueDate) => { dueDate = newDueDate };
  const getNotes = () => { return notes };
  const setNotes = (newNotes) => { notes = newNotes };
  const getPriority = () => { return priority };
  const setPriority = (newPriority) => { priority = newPriority };
  const getComplete = () => { return complete };
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