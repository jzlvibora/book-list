const bookContainer = document.querySelector('#bookContainer');
const bookField=document.querySelector('#bookField');
const bookForm=document.querySelector('form');
const $title = document.querySelector('#title');
const $author= document.querySelector('#author');
const $page = document.querySelector('#page');
const $isRead = document.querySelector('#isRead');
const overlay = document.querySelector('.overlay');
const formBox = document.querySelector('.formBox');
const deleteAll = document.querySelector('.delete-all');
let myLibrary = [];

class Book{
  constructor(title, author, page, isRead){
    this.title=title,
    this.author=author,
    this.page=page,
    this.isRead = isRead
  }
}

//add book
function addBook(){
  if($isRead.checked){
    $isRead.value = 'Read';
  }
  else{
    $isRead.value = 'Not Read';
  }
  
  let newBook = new Book($title.value,$author.value,$page.value,$isRead.value);

  console.log(newBook);
  myLibrary.push(newBook);
  renderBook(newBook);
  storeBookInLocalStorage(newBook);
}

//display book
function renderBook(book){
  
  const bookBox = document.createElement('div');
  const titleLn = document.createElement('h2');
  const authorLn = document.createElement('h3');
  const pageLn = document.createElement('h3');
  const statusBtn = document.createElement('button');
  statusBtn.classList.add('statusBtn');
  const removeBtn = document.createElement('button');
  
  titleLn.textContent = `${book.title}`;
  authorLn.textContent = `Author: ${book.author}`; 
  pageLn.textContent = `Number of pages: ${book.page}`;
  
   if (book.isRead==='Read') {
   statusBtn.textContent = 'Read';
     statusBtn.classList.add('read');
     bookBox.classList.add('readBk');
  } else if(book.isRead==='Not Read') {
   statusBtn.textContent = 'Not read';
     statusBtn.classList.add('notRead');
     bookBox.classList.add('notreadBk');
  }
  
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove');
  bookBox.append(titleLn, authorLn, pageLn, statusBtn, removeBtn);
  bookBox.classList.add('bookBox');
  bookContainer.append(bookBox);
  
}


//clear form 
function clearForm(){
  $title.value = '';
  $author.value ='';
  $page.value='';
  $isRead.value='';
}

  
//addevent listener to bookForm  
bookForm.addEventListener('click', function (e) {
 
  if (e.target.classList.contains('submit')) {
    e.preventDefault();
    if ($title.value === '' || $author.value === '' || $page.value === '') {
      alert('Please fill in all fields');
    }
    else {
      addBook();
      //renderBook();
      clearForm();
    }
  }
  else if (e.target.classList.contains('cancel')) {
    e.preventDefault();
    closeForm();
  }
  })
  
//addEvent listener to bookContainer
bookContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('remove')){
    console.log('remove');
    console.log(e.target.parentElement.children[0].innerText);
    e.target.parentElement.remove();
    removeBookFromLocalStorage(e.target.parentElement.children[0].innerText);
  }

 if(e.target.classList.contains('read')){
    e.target.classList.remove('read');
    e.target.classList.add('notRead');
   e.target.textContent = 'Not Read';
   e.target.parentElement.classList.remove('readBk');
   e.target.parentElement.classList.add('notreadBk');
   updateReadStatus(e.target.parentElement.children[0].innerText)

    }
 else if(e.target.classList.contains('notRead')){
   e.target.classList.remove('notRead');
   e.target.classList.add('read');
   e.target.textContent = 'Read';
   e.target.parentElement.classList.remove('notreadBk');
   e.target.parentElement.classList.add('readBk');
   updateReadStatus(e.target.parentElement.children[0].innerText)
    } 
})

//modal

const btnCloseForm = document.querySelector('.close-form');
const btnShowForm = document.querySelector('.show-form');

//show modal function 
const showForm = function () {
  overlay.classList.remove('hidden');
  formBox.classList.remove('hidden');
  formBox.style.opacity = 1;

}

//close modal function
const closeForm = function(){
  formBox.classList.add('hidden');
  overlay.classList.add('hidden');
 
}


btnShowForm.addEventListener('click', showForm);
btnCloseForm.addEventListener('click', closeForm);
document.addEventListener('keydown', function(e){
 if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeForm();       }  
});

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
      renderBook(book);
  })
    }  
}

getBooks();


//Remove book from local storage
function removeBookFromLocalStorage(bookItem) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  for (let i = 0; i < myLibrary.length; i++){
    console.log(bookItem.innerText);
      if (bookItem===`${myLibrary[i].title}`) {
          myLibrary.splice(i, 1);
      }
      console.log(myLibrary);
  }
        
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//Delete all books
deleteAll.addEventListener('click', function(){
  alert('Are you sure you want to delete all books in the list?')
  window.localStorage.clear();
  bookContainer.innerHTML='';
})

//Form validation 
function validateForm(){
  
}

//update read status
function updateReadStatus(book) {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  for (let i = 0; i < myLibrary.length; i++){
    if (book === `Title: ${myLibrary[i].title}`) {
      if (myLibrary[i].isRead === 'Read') {
        myLibrary[i] = {...myLibrary[i],isRead:'Not Read'}
      }
      else {
        myLibrary[i] = {...myLibrary[i],isRead:'Read'}

      }
      }
  }
        
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
