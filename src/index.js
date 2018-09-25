function increaseLikes(toyId){
  let likedToy;

  fetch(`http://localhost:3000/toys/${toyId}`)
    .then( res => res.json() )
    .then( resJson => likedToy = resJson )
    .then( () => {
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
      
          likes: ++likedToy.likes
        })
      }).then( res => res.json() )
        .then( resJson => {
          console.log(resJson);
          const toyDivs = document.getElementsByClassName('card');
          const likedToyDiv = toyDivs[toyId - 1];
          likedToyDiv.querySelector('p').innerText = resJson.likes;
        })
    });

}

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  // YOUR CODE HERE
  const toyCollectionDiv = document.getElementById("toy-collection");

  fetch("http://localhost:3000/toys")
    .then( (res) => res.json())
    .then( (resJson) => {
      resJson.forEach( (toy) => {
        const newToyDiv = `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"></img>
          <p>${toy.likes}</p>
          <button class="like-btn" onclick="increaseLikes(${toy.id})">Like <3</button>
        </div>`
        toyCollectionDiv.innerHTML += newToyDiv;
      })
    });

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  });

  const newToyForm = document.querySelector('.add-toy-form');

  newToyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementsByClassName('input-text')[0].value;
    const imageInput = document.getElementsByClassName('input-text')[1].value;

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0
      })
    }).then( res => res.json() )
      .then( toy => {
        const newToyDiv = `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"></img>
          <p>${toy.likes}</p>
          <button class="like-btn" onclick="increaseLikes(${toy.id})">Like <3</button>
        </div>`
        toyCollectionDiv.innerHTML += newToyDiv;
      });
      e.target.reset();
  });
  // OR HERE!
  function increaseLikes(toyId){
    let likedToy;

    fetch(`http://localhost:3000/toys/${toyId}`)
      .then( res => res.json() )
      .then( resJson => likedToy = resJson )
      .then( () => {
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: likedToy.name,
            image: likedToy.image,
            likes: ++likedToy.likes
          })
        }).then( res => res.json() )
          .then( resJson => {
            console.log(resJson);
            const toyDivs = document.getElementsByClassName('card');
            const likedToyDiv = toyDivs[toyId - 1];
            likedToyDiv.querySelector('p').innerText = resJson.likes;
          })
      });

  }

});
