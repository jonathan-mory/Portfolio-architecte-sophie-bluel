import { fetchWorks, fetchCategories } from "./apiData.js";

export function displayWorks(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    works.forEach((work) => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;
        figure.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `;
        gallery.appendChild(figure);
    });
}

function displayFilterButtons(categories) {
    const filtersContainer = document.querySelector(".filters-container");
    categories.forEach((category) => {
        // Création des boutons de filtre
        const filterButton = document.createElement("button");
        filterButton.dataset.categoryId = category.id;
        filterButton.classList.add("filter-button");
        filterButton.innerText = category.name;
        filtersContainer.appendChild(filterButton);
        // Activation des boutons de filtre
        filterButton.addEventListener("click", (event) => {
            document.querySelector(".filter-button.active-button")?.classList.remove("active-button");
            event.target.classList.add("active-button")
            const selectedFilter = parseInt(event.target.dataset.categoryId);
            const filteredWorks = works.filter((work) => work.categoryId === selectedFilter)
            displayWorks(selectedFilter >= 1 ? filteredWorks : works)
        })
    });
};

function modifyLoginLogout() {
    const loginButton = document.getElementById("login")
    loginButton.innerHTML = "<li>logout</li>"
    loginButton.addEventListener("click", () => {
        sessionStorage.removeItem("token")
    })
}

function displayEditionBar() {
    const headerTag = document.querySelector("header");
    const headerDiv = document.querySelector(".header");
    const editionModeDiv = document.createElement("div");
    editionModeDiv.setAttribute("class", "edition-mode-header");
    editionModeDiv.innerHTML = `
        <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
        <a href="#modal" class="js-modal-open">Mode édition</a>
    `;
    headerTag.insertBefore(editionModeDiv, headerDiv);
}

function displayModifyButton(params) {
    const portfolioTitleDiv = document.querySelector(".portfolio-title");
    portfolioTitleDiv.innerHTML = `
        <h2> Mes Projets </h2>
        <i class="fa-regular fa-pen-to-square"></i>
        <a href="#modal" class="js-modal-open">modifier</a>
    `    
}

fetchWorks().then(works => {
    displayWorks(works); // Affiche la liste des travaux une fois la promesse résolue
});

fetchCategories()

if (!sessionStorage.token) {
    displayFilterButtons(categories);
    // Initialisation du filtrage sur le bouton "Tous"
    document.querySelector('[data-category-id="0"]').classList.add("active-button");
}

if (sessionStorage.token) {
    modifyLoginLogout()
    displayEditionBar()
    displayModifyButton()
}