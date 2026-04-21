window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        const article = document.createElement('article')
        article.id = movie.imdbID
        const img = document.createElement('img')
        img.src = movie.Poster
        img.alt = movie.Title + ' Poster'
        article.append(img)
        const info = document.createElement('div')
        info.className = 'movie-info'
        const title = document.createElement('h1')
        title.textContent = movie.Title
        info.append(title)

        // Edit button direkt nach dem Titel
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.onclick = function () {
          location.href = 'edit.html?imdbID=' + movie.imdbID
        }
        info.append(editButton)

        const meta = document.createElement('p')
        meta.className = 'meta'
        const hours = Math.floor(movie.Runtime / 60)
        const minutes = movie.Runtime % 60
        meta.textContent = 'Runtime ' + hours + 'h ' + minutes + 'm • Released on ' + movie.Released
        info.append(meta)
        const genreDiv = document.createElement('div')
        genreDiv.className = 'genres'
        movie.Genres.forEach(function (genre) {
          const genreSpan = document.createElement('span')
          genreSpan.className = 'genre'
          genreSpan.textContent = genre
          genreDiv.append(genreSpan)
        })
        info.append(genreDiv)
        const plot = document.createElement('p')
        plot.textContent = movie.Plot
        info.append(plot)
        const dirTitle = document.createElement('h2')
        dirTitle.textContent = movie.Directors.length === 1 ? 'Director' : 'Directors'
        info.append(dirTitle)
        const dirList = document.createElement('ul')
        movie.Directors.forEach(function (director) {
          const li = document.createElement('li')
          li.textContent = director
          dirList.append(li)
        })
        info.append(dirList)
        const writTitle = document.createElement('h2')
        writTitle.textContent = 'Writers'
        info.append(writTitle)
        const writList = document.createElement('ul')
        movie.Writers.forEach(function (writer) {
          const li = document.createElement('li')
          li.textContent = writer
          writList.append(li)
        })
        info.append(writList)
        const actTitle = document.createElement('h2')
        actTitle.textContent = 'Actors'
        info.append(actTitle)
        const actList = document.createElement('ul')
        movie.Actors.forEach(function (actor) {
          const li = document.createElement('li')
          li.textContent = actor
          actList.append(li)
        })
        info.append(actList)
        const ratings = document.createElement('p')
        ratings.className = 'ratings'
        ratings.textContent = 'IMDb: ' + movie.imdbRating + '/10 • Metascore: ' + movie.Metascore
        info.append(ratings)
        article.append(info)
        bodyElement.append(article)
      }
    } else {
      bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText);
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
