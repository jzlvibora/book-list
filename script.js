const bookContainer = document.querySelector('#bookContainer');
const bookField=document.querySelector('#bookField');
const bookForm=document.querySelector('form');
const $title = document.querySelector('#title');
const $author= document.querySelector('#author');
const $page = document.querySelector('#page');
const $isRead = document.querySelector('#isRead');
const formBox = document.querySelector('.formBox');
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
}

//display book
function renderBook(book){
  
  const bookBox = document.createElement('div');
  const titleLn = document.createElement('h2');
  const authorLn = document.createElement('h2');
  const pageLn = document.createElement('h2');
  const statusBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  
  titleLn.textContent = `Title: ${book.title}`;
  authorLn.textContent = `Author: ${book.author}`; 
  pageLn.textContent = `Number of pages: ${book.page}`;
  
   if (book.isRead==='Read') {
   statusBtn.textContent = 'Read';
   statusBtn.classList.add('read');
  } else if(book.isRead==='Not Read') {
   statusBtn.textContent = 'Not read';
   statusBtn.classList.add('notRead');
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
bookForm.addEventListener('submit', function(e){
  e.preventDefault();
  addBook();
  //renderBook();
  clearForm();
  })
  
//addEvent listener to bookContainer
bookContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('remove')){
    console.log('remove');
    //console.log(e.target.parentElement.parentElement);
    e.target.parentElement.remove();
  }

 if(e.target.classList.contains('read')){
    e.target.classList.remove('read');
    e.target.classList.add('notRead');
    e.target.textContent= 'Not Read'  
    }
 else if(e.target.classList.contains('notRead')){
   e.target.classList.remove('notRead');
   e.target.classList.add('read');
    e.target.textContent= 'Read'  ;
    } 
})

//modal

const btnCloseForm = document.querySelector('.close-form');
const btnShowForm = document.querySelector('.show-form');

//show modal function 
const showForm = function(){
    formBox.classList.remove('hidden');
}

//close modal function
const closeForm = function(){
   formBox.classList.add('hidden');
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
/* function storeBookInLocalStorage(book) {
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
getBooks(); */