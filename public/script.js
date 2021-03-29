

if(typeof(Storage) !== "undefined") {
    let currentPage = document.querySelector('h2')
    localStorage.progress = 0
    if (localStorage.progress) {
        if (currentPage.textContent === 'Weekly Nerd'){
            localStorage.progress = 1
        }
        if (currentPage.textContent === 'Web app from scratch'){
            localStorage.progress = 2
        }
        if (currentPage.textContent === 'CSS to the rescue'){
            localStorage.progress = 3
        }
        if (currentPage.textContent === 'Progressive web app'){
            localStorage.progress = 4
        }
        if (currentPage.textContent === 'Browser technology'){
            localStorage.progress = 5
        }
        if (currentPage.textContent === 'Real time web'){
            localStorage.progress = 6
        }
        if (currentPage.textContent === 'Hunam centered design'){
            localStorage.progress = 7
        }
    }
    const progressContainer = document.createElement('div')
        progressContainer.className = 'progressBarContainer'
    const progressBar = document.createElement('div')
        progressBar.className = 'progressBar'
    const form = document.querySelector("form")
    const container =  document.querySelector('.progressBarContainer')
    const bar = document.querySelector('.progressBar')
    let percentage = localStorage.progress * 12.5


    if (localStorage.progress == 0) {
        progressContainer.parentNode.removeChild(progressContainer)
    }
    else {
        form.insertBefore(progressContainer, currentPage)
        progressContainer.appendChild(progressBar)
        progressBar.style.width = percentage + '%'
    }
}
else {
    console.log('sorry, your browser does not support local storage')
}