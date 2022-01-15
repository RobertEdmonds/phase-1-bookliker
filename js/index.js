document.addEventListener("DOMContentLoaded", function() {});
function displayBooks(books){
    let list = document.createElement('li')
    let title = document.createElement('h2')
    let subtit = document.createElement('h2')
    let author = document.createElement('h2')
    let image = document.createElement('img')
    let para = document.createElement('p')
    let ulist = document.createElement('ul')
    let btn = document.createElement('button')
    title.textContent = `Title: ${books.title}`
    author.textContent = `Author: ${books.author}`
    image.src = books.img_url
    para.innerText = books.description
    ulist.id = books.id
    books.users.forEach(userList => {
        let userName = document.createElement('li')
        userName.textContent  = userList.username
        ulist.appendChild(userName)
    })
    btn.textContent = 'Like'
    btn.addEventListener('click',() => {
        let newLike = document.createElement('li')
        newLike.className = 'newLike'
        newLike.textContent = 'Bob'      
        if(btn.textContent === 'Like'){
            btn.textContent = 'Unlike'
            ulist.appendChild(newLike)
        }else if(btn.textContent === 'Unlike'){
            btn.textContent = 'Like'
            document.querySelector('.newLike').remove()
        }

        updateUser(books)
    })
    list.textContent = books.title
    list.addEventListener('click', () =>{
        if(books.subtitle === undefined){
            document.querySelector('#show-panel').replaceChildren(image, title, author, para, ulist, btn)
        }else if(books.subtitle.length > 1){
            subtit.textContent = `Subtitle: ${books.subtitle}`
            document.querySelector('#show-panel').replaceChildren(image, title, subtit, author, para, ulist, btn)
        }else{
            document.querySelector('#show-panel').replaceChildren(image, title, author, para, ulist, btn)
        }
    })
    document.querySelector('#list').appendChild(list)
}
function updateUser(book){
    fetch(`http://localhost:3000/books/${book.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book.users)
    })
    .then(resp => resp.json())
    .then(book => console.log(book))
}

function renderBookCon(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(book => book.map(displayBooks))
}
renderBookCon()