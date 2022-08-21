export default function toDoFactory(title='', dueDate=(new Date()), notes='', priority=3, complete=false, projectId) {

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
    setComplete,
    getProjectId,
    setProjectId
  }
}