'use strict';

const STORE = 
  {items:[
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}],
  
  completedCheck: false
  };


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <div>
          <form id= "js-edit-entry-form">
            <label for="edit-entry">Change Name</label>
            <input type="text" name="edit-entry" class="js-edit-entry placeholder= "${item.name}">
            <button type= "submit">Edit</button>
        </div>
        <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  if(STORE.completedCheck){
    shoppingList = shoppingList.filter(function(item){
      return item.checked === false;
    });
  }
  shoppingList = shoppingList.map((item, index) => generateItemElement(item, index));  
  return shoppingList.join('');
}


function renderShoppingList(items = STORE.items) {
  const shoppingListItemsString = generateShoppingItemsString(items);
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}


function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function deleteListItem(itemIndex) {
  delete STORE.items[itemIndex];
}


function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}


function completedCheckToggle(){
  STORE.completedCheck = !STORE.completedCheck;
}


function handleCompletedItems(){
  $('#completed-check').on('click', ()=> {
    completedCheckToggle(); 
    renderShoppingList();    
  });
}


function handleSearch (){
  $('#js-search-entry-form').submit(function(event) {
    event.preventDefault();
    const searchItemName = $('.js-search-list-entry').val();
    $('.js-search-list-entry').val(''); 
    let search = STORE.items.filter(function(item){
      return item.name === searchItemName;   
    });
    renderShoppingList(search);
  });
}


//create an edit button
//create an input field
//change the store to reflect input using index

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCompletedItems(); 
  handleSearch(); 
}


$(handleShoppingList);