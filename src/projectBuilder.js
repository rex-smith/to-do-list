let projectCounter = 0;

export default function projectFactory(title, itemArray) {
  projectCounter++;
  const id = projectCounter;

  const getTitle = () => title;
  const setTitle = (newTitle) => {
    title = newTitle;
  };
  const getItems = () => itemArray;
  const addItem = (item) => {
    itemArray.push(item);
  };
  const removeItem = (item) => {
    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i].getTitle() === item.getTitle()) {
        itemArray.splice(i, 1);
      }
    }
  };
  const getId = () => id;
  const setId = (newId) => {
    id = newId;
  };

  return {
    id,
    title,
    itemArray,
    getTitle,
    setTitle,
    getItems,
    addItem,
    removeItem,
    getId,
    setId,
  };
}
