document.addEventListener("DOMContentLoaded", function(event) {
  let allToys = []
  let toyCollection = document.querySelector('#toy-collection')
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const url = 'http://localhost:3000/toys'
  let addToy = false
  toyForm.addEventListener('submit', addNewToy)
  toyCollection.addEventListener('click', hand)
  function addToyForm(){
    addBtn.addEventListener('click', () => {
      // hide & seek with the form
      addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
        // submit listener here
      } else {
        toyForm.style.display = 'none'
      }
    })
  }
  addToyForm()
  function fetchToys(){
    fetch(url)
    .then(r => r.json())
    .then(toys => {
      loopThroughToys(toys)
    })
  }
  fetchToys()
  function loopThroughToys(toys){
    allToys = toys
    allToys.forEach(addSingleToyToDom)
  }
  function addSingleToyToDom(toy){
    toyCollection.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div>
      `
  }
  function addNewToy(e){
    name = document.querySelector('#name').value
    img = document.querySelector('#img').value

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: img,
        likes: 0
      })
    })
    .then(r => r.json())
    .then(toy => addSingleToyToDom(toy))
  }
  function hand(e){
    myToy = allToys.find(function(toy){
      return toy.id == e.target.dataset.id
    })
    if (e.target.dataset.id){
      fetch(`${url}/${myToy.id}` , {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: ++myToy.likes
        })
      })
      .then(r => r.json)
      .then(r => {
        e.target.previousElementSibling.innerText = `${myToy.likes} likes`
      })
    }
  }


})


// OR HERE!
