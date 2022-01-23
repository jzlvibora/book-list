const bookContainer = document.querySelector('#bookContainer');
const bookField=document.querySelector('#bookField');
const bookForm=document.querySelector('form');
const $title = document.querySelector('#title')
const $author= document.querySelector('#author')
const $page = document.querySelector('#page')
const $isRead = document.querySelector('#isRead')
let myLibrary = [];
let currIndex = -1;

class Book{
  constructor(title, author, page, isRead){
    this._myLibrary = [];
    this.title=title,
    this.author=author,
    this.page=page,
    this.isRead = isRead
  }
}

function addBook(){
  if($isRead.checked){
    $isRead.value = 'Read';
  }
  else{
    $isRead.value = 'Not Read';
  }
  let newBook = new Book($title.value,$author.value,$page.value,$isRead.value);
  myLibrary.push(newBook);
  currIndex++;
  storeBookInLocalStorage(newBook);
}

function renderBook(){
 
  const bookDisplay = 
  `<tr>
    <td>${myLibrary[currIndex].title}</td>
    <td>${myLibrary[currIndex].author}</td>
    <td>${myLibrary[currIndex].page}</td>
    <td><button>${myLibrary[currIndex].isRead}</button></td>
    <td><button class="remove" >Remove</button></td>
  </tr>` 
  const status = document.querySelectorAll('.status');

  if(myLibrary[currIndex].isRead==='Read'){
  bookField.insertAdjacentHTML('afterend', bookDisplay);
  
}
}

function renderLibrary(book){
  const bookDisplay = 
  `<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.page}</td>
    <td><button>${book.isRead}</button></td>
    <td><button class="remove">Remove</button></td>
  </tr>` 
  bookField.insertAdjacentHTML('afterend', bookDisplay);
}

function clearForm(){
  $title.value = '';
  $author.value ='';
  $page.value='';
  $isRead.value='';
;}

bookForm.addEventListener('submit', function(e){
  e.preventDefault();
  addBook();
  renderBook();
  clearForm();
  })
 
bookContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('remove')){
    console.log('remove');
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.remove();
    removeBookFromLocalStorage(e.target.parentElement.parentElement);
  }
})


////////////////////////////////////
//////////LOCAL STORAGE////////////

//Store book in local storage
function storeBookInLocalStorage(book) {
  if(localStorage.getItem('myLibrary') === null){
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


//Get book from local storage
function getBooks() {
    if(localStorage.getItem('myLibrary') === null){
      myLibrary= [];
    } else {
      myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    myLibrary.forEach(function (book) {
      renderLibrary(book);
  })
    }  
}


//Remove book from local storage
function removeBookFromLocalStorage(bookItem) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  for (let i = 0; i < myLibrary.length; i++){
    console.log(bookItem.innerText);
      if (bookItem.innerText===myLibrary) {
          myLibrary.splice(i, 1);
      }
      console.log(myLibrary);
  }
        
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
getBooks();