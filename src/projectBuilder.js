export default function projectFactory(title, itemArray) {

  const getTitle = () => { return title };
  const setTitle = (newTitle) => { title = newTitle }; 
  const getItems = () => { return itemArray };
  const addItem = (item) => {
    itemArray.push(item);
  }
  const removeItem = (item) => {
    for (let i = 0; i < itemArray.length; i++) {
      if (itemArray[i].getTitle() === item.getTitle()) {
        itemArray.splice(i, 1)
      }
    }
  }
  return {
    title,
    itemArray,
    getTitle,
    setTitle,
    getItems,
    addItem,
    removeItem
  }
}