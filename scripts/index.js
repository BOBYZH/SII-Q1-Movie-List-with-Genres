// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'
const data = []
const genresList = document.querySelector('#v-pills-tab')
const moviesPanel = document.querySelector('#movies-panel')
const tags = document.querySelectorAll('.tags')
const genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

// generate nav-menu items
for (i = 1; i <= Object.getOwnPropertyNames(genres).length; i++) { // get the "length" of genres for iteration
  let HTMLContent = `
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" data-genreid= ${i} href="#" role="tab" aria-controls="" aria-selected="false">${genres[i]}</a>
    </li>`
  genresList.innerHTML += HTMLContent
}

// get data from api
axios.get(INDEX_URL)
  .then((response) => {
    data.push(...response.data.results)
    console.log(data)
    displayDataList(data)
  })
  .catch((err) => console.log(err))

// filter movies by genres
genresList.addEventListener('click', e => {
  if (e.target.matches('.nav-link')) {
    let genre = event.target.textContent
    let genreID = event.target.dataset.genreid
    console.log(genre, genreID)

    let results = []

    for (i = 0; i < data.length; i++) {
      if (data[i].genres.indexOf(+genreID) > -1) {
        results.push(data[i])
      }
    }

    console.log(results)
    displayDataList(results)
  }
})

// display selected movies
function displayDataList(data) {
  let htmlContent = ''
  data.forEach(function (item) {
    htmlContent += `
        <div class="col-lg-3 col-md-5 col-sm-6">
          <div class="card mb-4">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h6>
            </div>
            <!-- genres tags -->
            <div class="tags">${generateGenresTags(item.genres)}</div>
          </div>
        </div>
      `
  })
  moviesPanel.innerHTML = htmlContent
}

// generate genres tags for single movie
function generateGenresTags(genres) {
  let htmlContent = ''
  genres.forEach(function (genre) {
    //   console.log(genre)
    htmlContent += `<span class="badge badge-light">${translateGenresIndexs(genre)}</span>`
  })
  // console.log(tags)
  return htmlContent
}

// translate genre indexs to names
function translateGenresIndexs(genre) {
  return genres[genre]
}