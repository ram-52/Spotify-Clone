console.log(`hello world`);


// Client ID: 27a6920c17e545c283d7ddd38d081da2
// Client Secret: 4507e157ddb948e1a9719afc6ce1af8c


/* Technologies Used:   
        1. HTML, CSS and JavaScript
        2. Tailwind CSS
*/


/* 
    Functionality of this Spotify Clone
    1. Dynamic Data Loading
    2. Dynamic Search Results while typing
*/



const client_id = `27a6920c17e545c283d7ddd38d081da2`
const client_secret = `4507e157ddb948e1a9719afc6ce1af8c`
let access_token = ''

// generateAccessToken()
async function generateAccessToken() {
    const token_url = `https://accounts.spotify.com/api/token`
    const info = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    }

    const resp = await fetch(token_url, info)
    const token = await resp.json()
    access_token = token.access_token
}


async function getSeveralArtistsData() {
    await generateAccessToken()
    const url = `https://api.spotify.com/v1/artists?ids=0C8ZW7ezQVs4URX5aX7Kqx,2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,0a3zDmrvmZcORfPeONPvfL,7vk5e3vY1uw9plTHJAMwjN`
    const request_for_several_artists_data = new Request(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const resp = await fetch(request_for_several_artists_data)
    const data = await resp.json()
    loadPopularArtist(data.artists)
}
getSeveralArtistsData()


// JavaScript Code to load Popular Artists
const popularArtistSect = document.getElementById('popular-artist-section')
function loadPopularArtist(artists) {
    artists.forEach((artist) => {
        const { name, type } = artist
        const { url } = artist.images[0];

        const div = document.createElement('div')
        div.classList.add("artist", "relative", "px-4", "pt-4", "pb-12",
            "rounded-2xl", "cursor-pointer")
        div.innerHTML = `
        <img class="w-[150px] h-[150px] rounded-[50%] object-cover"
        src="${url}" alt="">
        <h3 class="mt-4 font-extrabold">${name}</h3>
        <p class="text-xs">${type}</p>
        `
        popularArtistSect.appendChild(div)
    })
}

// Function to get Artist ID from the URL
function getArtistId(url) {
    const ids = url.slice(url.indexOf('=') + 1)
    const ids_arr = ids.split(',')
    ids_arr.forEach(id => console.log(id))
}




// Getting several categories
async function getSeveralCategories() {
    await generateAccessToken()
    const url = `https://api.spotify.com/v1/browse/categories?limit=5`
    const request_for_several_categories = new Request(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const resp = await fetch(request_for_several_categories)
    const data = await resp.json()
    const categories = data.categories.items
    loadCategories(categories)
}
getSeveralCategories()

const categorySection = document.getElementById('categories-section')
function loadCategories(categories) {
    categories.forEach(category => {
        const { name } = category
        const { url } = category.icons[0]

        const div = document.createElement('div')
        div.classList.add("relative", "px-4", "pt-4", "pb-12", "rounded-2xl", "cursor-pointer")
        div.innerHTML = `
             <img class="w-[150px] h-[150px] rounded-[50%] object-cover"
             src="${url}" alt="">
            <h3 class="mt-4 font-extrabold">${name}</h3>
        `
        categorySection.appendChild(div)
    })
}


// Code to get Several Albums
async function getSeveralAlbums() {
    await generateAccessToken()
    const url = `https://api.spotify.com/v1/albums?ids=0a183xiCHiC1GQd8ou7WXO,382ObEPsp2rxGrnsizN5TX,3g35NyznPvksBecm94JhG3,1dNAXHTY5Ezn0hcH7N5BsH,5AivaZj0CiQJoDWqVH2pbh`
    const request_for_several_albums = new Request(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const resp = await fetch(request_for_several_albums)
    const data = await resp.json()
    loadPopularAlbums(data.albums)
}

getSeveralAlbums()

const popularAlbumSec = document.getElementById('popular-albums-section')
function loadPopularAlbums(albums) {
    albums.forEach(album => {
        const { name, release_date } = album
        const year = release_date.slice(0, 4)
        const { url } = album.images[0]
        const artists_arr = []
        album.artists.forEach(artist => artists_arr.push(artist.name))

        const div = document.createElement('div')
        div.classList.add("relative", "px-4", "pt-4", "pb-12", "rounded-2xl", "cursor-pointer", "h-[275px]", "w-[175px]")
        div.innerHTML = `
            <img class="w-[150px] h-[150px] rounded-[50%] object-cover"
            src="${url}" alt="">
            <h3 class="mt-4 font-extrabold">${name}</h3>
            <div class="h-[42px] overflow-clip text-sm"><span>${year} &#x2022; ${getArtistName(artists_arr[0])}, ${getArtistName(artists_arr[1])}, ${getArtistName(artists_arr[2])}</span></div>
        `
        popularAlbumSec.appendChild(div)
    })
}
function getArtistName(artist) {
    return (artist) ? artist : ''
}



// Code to get Podcasts & Shows
async function getSeveralShows() {
    await generateAccessToken()
    const url = `https://api.spotify.com/v1/shows?ids=5CfCWKI5pZ28U0uOzXkDHe,3ptiw7nOKh5vsMoar79YGc,6olvQhNhQwMbGG26t3rVgM,5aAR1VPIQ6rarijDBYPDtw,1VXcH8QHkjRcTCEd88U3ti`
    const request_for_several_shows = new Request(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const resp = await fetch(request_for_several_shows)
    const data = await resp.json()
    loadPodcastsNshows(data.shows)
}
getSeveralShows()

const podcasts_n_shows = document.getElementById('podcasts-section')
function loadPodcastsNshows(podcasts) {
    podcasts.forEach(podcast => {
        const { name, description } = podcast
        const { url } = podcast.images[0]
        const div = document.createElement('div')
        div.classList.add('relative', 'px-4', 'pt-4', 'pb-12', 'rounded-2xl', 'cursor-pointer', 'h-[275px]', 'w-[175px]', 'overflow-hidden')
        div.innerHTML = `
        <img class="w-[150px] h-[150px] rounded-[10%] object-cover"
        src="${url}" alt="">
        <h3 class="mt-4 font-extrabold overflow-hidden">${name}</h3>
        <p class="text-xs h-[30px] overflow-hidden">${description}</p>
        `
        podcasts_n_shows.appendChild(div)

    })
}


// Code for Search Functionality inside the Spotify App
const music_data = document.getElementById('main-data')
const searchResultTop = document.getElementById('searchResultTopParent')
async function getSearchResults(searchStr) {
    music_data.innerHTML = ``
    searchResultTop.classList.remove('hidden')
    await generateAccessToken()
    const url = `https://api.spotify.com/v1/search?q=${searchStr}&type=album,artist,track&limit=4`
    const request_for_search_results = new Request(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    const resp = await fetch(request_for_search_results)
    const data = await resp.json()
    loadSearchResultAlbums(data.albums.items[0])
    loadTracksInSearchResults(data.tracks.items)
}

const leftCard = document.querySelector('.left-card')
const rightCard = document.querySelector('.right-card')
function loadSearchResultAlbums(album) {
    const { name } = album
    const { url } = album.images[0]
    const artistName = album.artists[0].name
    leftCard.innerHTML = `
    <img class="w-[120px] h-[120px] object-cover rounded-lg" src="${url}" alt="">
    <h1 class="text-3xl mt-2 font-extrabold">${name}</h1>
    <div class="flex gap-2 mt-2">
        <p class="text-sm font-bold hover:underline">${artistName}</p>
        <p class="text-sm bg-black font-extrabold rounded-2xl px-3 py-1">Album</p>
    </div>
    `
}

function loadTracksInSearchResults(tracks) {
    rightCard.innerHTML = ``
    tracks.forEach(track => {
        const { name } = track
        const { url } = track.album.images[0]
        const { duration_ms } = track
        const duration_min = Math.floor(duration_ms / (1000 * 60))
        const artists = []
        track.artists.forEach(artist => artists.push(artist.name))
        const div = document.createElement('div')
        div.classList.add('songs', 'flex', 'gap-2', 'my-3', 'p-2', 'rounded-lg', 'relative', 'hover:cursor-pointer')
        div.innerHTML = `
        <img class="w-[40px] h-[40px] object-cover rounded-sm" src="${url}" alt="">
        <div class="flex flex-col gap-1 text-sm">
            <a>${name}</a>
            <a class="opacity-50"><span>${getArtistName(artists[0])}</span>, <span>${getArtistName(artists[1])}</span>, <span>${getArtistName(artists[2])}</span></a>
        </div>
        <div class="time text-sm absolute top-4 right-2 opacity-50">${duration_min} min</div>
        `
        rightCard.appendChild(div)
    })
}




// JS code to hide/display search bar
const searchEl = document.getElementById('search')
const formEl = document.querySelector('form')
searchEl.addEventListener('click', () => {
    searchEl.classList.toggle('active')
    if (searchEl.classList.contains('active')) {
        searchEl.classList.replace('opacity-75', 'opacity-100')
        formEl.classList.toggle('hidden')
    } else {
        searchEl.classList.replace('opacity-100', 'opacity-75')
        formEl.classList.toggle('hidden')
    }
})

// Code to load Search Results
const inputEl = document.querySelector('input')

inputEl.addEventListener('input', (e) => {
    const searchStr = e.target.value
    if (searchStr) {
        getSearchResults(searchStr)
    }
})



/* Styling of header using JavaScript */
const header = document.getElementById('header')
const mainEl = document.querySelector('main')

mainEl.addEventListener('scroll', () => changeHeaderBg())

function changeHeaderBg() {
    const headerBottom = header.getBoundingClientRect().bottom
    const musicDataTop = music_data.getBoundingClientRect().top

    if (musicDataTop < headerBottom) {
        header.classList.add('bg-purple')
    } else {
        header.classList.remove('bg-purple')
    }
}
changeHeaderBg()