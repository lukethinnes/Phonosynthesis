
baseURL = 'http://localhost:3000'

const albumForm = document.querySelector('.add-album')
const albumCollection = document.querySelector('#albums')

albumForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)
    const formData = new FormData(event.target)
    const albumTitle = formData.get('title')
    const albumCover = formData.get('cover')
    const albumYear = formData.get('year')

    const album = {
        title: albumTitle,
        cover: albumCover,
        year: albumYear
    }

    const albumCard = document.createElement('div')
    const title = document.createElement('h4')
    const image = document.createElement('img')
    const year = document.createElement('p')
    const deleteButton = document.createElement('button')

    albumCard.className = 'card'
    title.textContent = albumTitle
    image.src = image
    image.className = 'cover'
    year.textContent = albumYear
    deleteButton.className = 'delete'
    deleteButton.textContent = 'Remove'

    albumCard.append(title, image, year, deleteButton)
    albumCollection.appendChild(albumCard)

    fetch(baseURL + '/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    }).then(() => window.location.replace('/'))
})

fetch(baseURL + '/albums')
    .then(response => response.json())
    .then(albums => albums.forEach(album => createAlbumCard(album)))

function createAlbumCard(album) {
    const id = album.id
    const albumCard = document.createElement('div')
    const title = document.createElement('h4')
    const image = document.createElement('img')
    const year = document.createElement('p')
    const deleteButton = document.createElement('button')

    albumCard.className = 'card'
    title.textContent = album.title
    image.src = album.cover
    image.className = 'cover'
    year.textContent = album.year
    deleteButton.className = 'delete'
    deleteButton.textContent = 'Remove'

    albumCard.append(title, image, year, deleteButton)
    albumCollection.appendChild(albumCard)

    fetch(baseURL + '/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    })

    deleteButton.addEventListener('click', (event) => deleteAlbum(event, id))

    function deleteAlbum(event, id) {
        event.preventDefault()
        fetch(baseURL + `/albums/${album.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(() => window.location.replace('/'))
    }

}