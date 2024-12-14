let totalAmount = 0;

//load saved data from localStorage when the page loads
window.onload = function() {
  loadItems();
};

function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemAmount = parseFloat(document.getElementById('item-amount').value);

  if (itemName && !isNaN(itemAmount)) {
    //update the total
    totalAmount += itemAmount;
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);

    //add an item to list
    const listItem = document.createElement('li');
    listItem.innerHTML = `${itemName} - ₱${itemAmount.toFixed(2)}`;
    document.getElementById('items-list').appendChild(listItem);

    //save item to localStorage
    saveItem(itemName, itemAmount);

    //clear inputs
    document.getElementById('item-name').value = '';
    document.getElementById('item-amount').value = '';
  }
}

function saveItem(name, amount) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.push({ name: name, amount: amount });
  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('totalAmount', totalAmount);
}

function loadItems() {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

  //update the total amount on the UI
  document.getElementById('total-amount').innerText = totalAmount.toFixed(2);

  //display all items on the list
  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item.name} - ₱${item.amount.toFixed(2)}`;
    document.getElementById('items-list').appendChild(listItem);
  });
}
