const bookContainer = document.querySelector('#bookContainer');
const lol=document.querySelector('#lol');
const bookForm=document.querySelector('form');
let myLibrary = [];
const $title = document.querySelector('#title')
const $author= document.querySelector('#author')
const $page = document.querySelector('#page')
const $isRead = document.querySelector('#isRead')

function Book(title,author,page,isRead){
  this.title=title,
  this.author=author,
  this.page=page,
  this.isRead = isRead,
  this.info=function(){
    return `The ${title} by ${author}, ${page} pages, not read is ${isRead}`
  }
}

bookForm.addEventListener('submit', function(e){
  e.preventDefault();
  let newBook = new Book($title.value,$author.value,$page.value,$isRead.value);
  myLibrary.push(newBook);
  const tr = document.createElement('tr');
  const title = document.createElement('td');
  const author = document.createElement('td');
  const page = document.createElement('td');
  const isRead = document.createElement('td');
  //const rem = document.createElement('td)');
  const removeButton = document.createElement('button');
  removeButton.textContent = "Remove";
  title.textContent = newBook.title;
  author.textContent = newBook.author;
  page.textContent = newBook.page;
  isRead.append(newBook.isRead);
  //rem.append(removeButton)
  tr.append(title,author,page,isRead,removeButton)
  lol.append(tr);
  newBook.title.value='';
  newBook.author.value='';
})
