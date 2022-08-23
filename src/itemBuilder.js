let itemCounter = 0;

export default function toDoFactory(title='', dueDate=(new Date()), notes='', priority=3, complete=false, projectId) {
  itemCounter++;
  const id = itemCounter;

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
  const getProjectId = () => { return projectId };
  const setProjectId = (newProjectId) => { projectId = newProjectId };
  const getId = () => { return id };
  const setId = (newId) => { id = newId };

  return {
    title,
    dueDate,
    notes,
    priority,
    complete,
    projectId,
    id,
    getTitle,
    setTitle,
    getDueDate,
    setDueDate,
    getNotes,
    setNotes,
    getPriority,
    setPriority,
    getComplete,
    setComplete,
    getProjectId,
    setProjectId,
    getId,
    setId
  }
}