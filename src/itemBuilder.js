let itemCounter = 0;

export default function toDoFactory(title = '', dueDate = (new Date()), notes = '', priority = 3, complete = false, projectId) {
  itemCounter++;
  const id = itemCounter;

  const getTitle = () => title;
  const setTitle = (newTitle) => { title = newTitle; };
  const getDueDate = () => dueDate;
  const setDueDate = (newDueDate) => { dueDate = newDueDate; };
  const getNotes = () => notes;
  const setNotes = (newNotes) => { notes = newNotes; };
  const getPriority = () => priority;
  const setPriority = (newPriority) => { priority = newPriority; };
  const getComplete = () => complete;
  const setComplete = (newComplete) => { complete = newComplete; };
  const getProjectId = () => projectId;
  const setProjectId = (newProjectId) => { projectId = newProjectId; };
  const getId = () => id;
  const setId = (newId) => { id = newId; };

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
    setId,
  };
}
