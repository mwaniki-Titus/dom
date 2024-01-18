document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector('ul');
    const forms = document.forms;

    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];

    // Function to render movies from local storage
    function renderMovies() {
        list.innerHTML = ''; // Clear the existing list
        storedMovies.forEach(movie => {
            const li = createMovieListItem(movie.name, movie.date);
            list.appendChild(li);
        });
    }

    // Delete movies using event delegation
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement;
            const movieName = li.querySelector('span.name').textContent;
            const movieDate = li.querySelector('span.date').textContent;

            // Remove from the DOM
            li.remove();

            // Remove from local storage
            const updatedMovies = storedMovies.filter(movie => !(movie.name === movieName && movie.date === movieDate));
            localStorage.setItem('movies', JSON.stringify(updatedMovies));
        }
    });

    // Add movies
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = addForm.querySelector('input[type="text"]').value;

        if (value.trim() !== '') {
            const currentDate = new Date().toLocaleDateString();

            // Add to the DOM
            const li = createMovieListItem(value, currentDate);
            list.appendChild(li);

            // Add to local storage
            storedMovies.push({ name: value, date: currentDate });
            localStorage.setItem('movies', JSON.stringify(storedMovies));

            addForm.querySelector('input[type="text"]').value = '';
        }
    });

    // Initial rendering of movies
    renderMovies();

    function createMovieListItem(name, date) {
        const li = document.createElement('li');
        const movieName = document.createElement('span');
        const movieDate = document.createElement('span');
        const deleteBtn = document.createElement('span');

        movieName.textContent = name;
        movieName.className = 'name';  // Assign the class 'name'
        movieDate.textContent = date;
        deleteBtn.textContent = 'delete';
        deleteBtn.className = 'delete';

        li.appendChild(movieName);
        li.appendChild(movieDate);
        li.appendChild(deleteBtn);

        return li;
    }
});




