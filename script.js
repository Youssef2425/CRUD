let title = document.getElementById('title');
let category = document.getElementById('category');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let createButton = document.getElementById('create');

let mode = 'create';
let edit; // Assistant variable

// [1]  Get Final Price In The Total
function getTotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = 'green'
  }else {
    total.innerHTML = '';
    total.style.backgroundColor = '#dc3545'
  }
}

// [2]  Create New Product

let productsData;

// Save localStorage in The Array 
if ( localStorage.product != null ) {
  productsData = JSON.parse(localStorage.product)

} else {
  productsData = [];
}

createButton.onclick = () => {
  let newProduct = {
      title: title.value.toLowerCase(),
      category: category.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
  }
if (title.value != '' &&
    price.value != '' &&
    category.value != '' &&
    newProduct.count <= 100 ) {
  if (mode === 'create') {
    // Create The Count of Products
    if ( newProduct.count > 1 ) {
      for ( let i = 0; i < newProduct.count; i++ ) {
        productsData.push(newProduct);
      }
    } else {
      productsData.push(newProduct);
    }
  } else {  // This Part relates to the Update Function 
    productsData[edit] = newProduct;
    mode = 'create';
    createButton.innerHTML = 'Create';
    count.style.display = 'block';
  }
  clearData();
}

  // Save Data in The localStorage
  localStorage.setItem('product', JSON.stringify(productsData));

  // Call ShowData Function To Updating Data
  showData();;
}

// [3]  Clear Inputs
function clearData() {
  title.value = '';
  category.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
}

// [4]  Read (Show Data)
function showData() {

  let tabel = '';

  for ( let i = 0; i < productsData.length; i++ ) {
    tabel += `
    <tr>
      <td> ${i+1} </td>
      <td> ${productsData[i].title} </td>
      <td> ${productsData[i].category} </td>
      <td> ${productsData[i].price} </td>
      <td> ${productsData[i].taxes} </td>
      <td> ${productsData[i].ads} </td>
      <td> ${productsData[i].discount} </td>
      <td> ${productsData[i].total} </td>
      <td> <button onclick='updateData(${i})' id="update"> Update </button> </td>
      <td> <button onclick='deleteProduct( ${i} )' id="delete"> Delete </button> </td>
    </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = tabel;

  // Create Delete All Button To Delete All Products
  let deleteAll = document.getElementById('deleteAll');
  if ( productsData.length > 0 ) {
    
    deleteAll.innerHTML = `
    <button onclick='deleteAllData()' id='deleteData'> Delete All ( ${productsData.length} ) </button>
    `
  } else {
    deleteAll.innerHTML = '';
  }
  // Call getTotal Function To Updating Total
  getTotal();
}
showData();

// [5]  Delete One Product

function deleteProduct(i) {

  productsData.splice( i, 1 );

  // Delete also from localStorage
  localStorage.product = JSON.stringify(productsData);

  // Call ShowData Function To Updating Data
  showData();
}

// [6]  Delete All Data

function deleteAllData() {
  productsData.splice(0);
  localStorage.clear();
  // Call ShowData Function To Updating Data
  showData();
}

// [7]  Editing And Update Data

function updateData(i) {
  title.value = productsData[i].title;
  category.value = productsData[i].category;
  price.value = productsData[i].price;
  taxes.value = productsData[i].taxes;
  ads.value = productsData[i].ads;
  discount.value = productsData[i].discount;
  getTotal();
  count.style.display = 'none';
  createButton.innerHTML = 'Update';
  mode = 'update';
  edit = i;
  scroll({
    top: 0,
    behavior: 'smooth',
  })
}

// [8]  Search

let searchMode = 'title';

function getSearchMode(id) {

  let search = document.getElementById('search');

  if ( id == 'searchTitle' ) {
    searchMode = 'title';
    search.placeholder = 'Search By Title';

  } else {
    searchMode = 'category';
    search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value = '';
  // Call ShowData Function To Updating Data
  showData();
}

function dataSearch(value) {
  
  let tabel = '';
  for ( i = 0; i < productsData.length; i++ ) {
  if ( searchMode == 'title' ) {
      if ( productsData[i].title.includes(value.toLowerCase()) ) {
        tabel += `
        <tr>
          <td> ${i} </td>
          <td> ${productsData[i].title} </td>
          <td> ${productsData[i].category} </td>
          <td> ${productsData[i].price} </td>
          <td> ${productsData[i].taxes} </td>
          <td> ${productsData[i].ads} </td>
          <td> ${productsData[i].discount} </td>
          <td> ${productsData[i].total} </td>
          <td> <button onclick='updateData(${i})' id="update"> Update </button> </td>
          <td> <button onclick='deleteProduct( ${i} )' id="delete"> Delete </button> </td>
        </tr>
        `;
      }
  } else {
      if ( productsData[i].category.includes(value.toLowerCase()) ) {
        tabel += `
        <tr>
          <td> ${i} </td>
          <td> ${productsData[i].title} </td>
          <td> ${productsData[i].category} </td>
          <td> ${productsData[i].price} </td>
          <td> ${productsData[i].taxes} </td>
          <td> ${productsData[i].ads} </td>
          <td> ${productsData[i].discount} </td>
          <td> ${productsData[i].total} </td>
          <td> <button onclick='updateData(${i})' id="update"> Update </button> </td>
          <td> <button onclick='deleteProduct( ${i} )' id="delete"> Delete </button> </td>
        </tr>
        `;
      }
  }
}
  document.getElementById('tbody').innerHTML = tabel;
}