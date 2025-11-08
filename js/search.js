
//get the input and the autocomplete container elements
const input = document.getElementById("search-input");
const autocompleteList = document.getElementById("autocomplete-list");
const gallery = document.querySelector(".gallery");
const searchButton = document.getElementById("search-button");

let currentFocus = -1; //To track the currently active suggestiom


function filterGallery(query) {
    const cards = gallery.querySelectorAll(".art-card");
    query = query.trim().toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const author = card.querySelector(".made-by").textContent.toLowerCase();

        if (query === "") {
            card.style.display = "";
        } else {
            card.style.display = title.includes(query) || 
            author.includes(query) ? "" : "none";
        }
    });
}


//Part 1: Handling user input and filtering suggestions
input.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    //Get user input and convert to lowercase for case-insensitive matching
    autocompleteList.innerHTML = ""; //Clear previous autocomplete suggestions
    currentFocus = -1; //Reset the focus index when typing new input

    //If the input is empty dont show any suggestions
    if (!query) return;

    const suggestions = [];

    imgInfList.forEach(item => {
        if (item.artwork_name.toLowerCase().includes(query)) {
            suggestions.push({ text: item.artwork_name, type: "artwork" });
        }
        if (item.autor_name.toLowerCase().includes(query)) {
            suggestions.push({ text: item.autor_name, type: "author" });
        }
    });

    const uniqueSuggestions = Array.from(
        new Map(suggestions.map(s => [s.text.toLowerCase(), s])).values()
    );

    uniqueSuggestions.forEach(s => {
        const div = document.createElement("div");
        div.textContent = s.text;

        div.addEventListener("click", function () {
            input.value = s.text;
            autocompleteList.innerHTML = "";
            filterGallery(input.value.trim().toLowerCase());
        });
        autocompleteList.appendChild(div);
    });
});


//Part 3: handling keyboard navigation(arrow keys and enter)
input.addEventListener("keydown", function (e) {
    let items = autocompleteList.getElementsByTagName("div");
    //get all suggestions div elements
    if (e.key === "ArrowDown") {
        currentFocus++;
        highlightItem(items);
    } else if (e.key === "ArrowUp") {
        currentFocus--;
        highlightItem(items);
    } else if (e.key === "Enter") {
        e.preventDefault();

        if (currentFocus > -1 && items[currentFocus]) {
            items[currentFocus].click();
        } 

        filterGallery(input.value.trim().toLowerCase());

        autocompleteList.innerHTML = "";
}});

searchButton.addEventListener("click", function () {
    filterGallery(input.value.trim().toLowerCase());
    autocompleteList.innerHTML = "";
});


//Part 4: Function to highlight the current item
function highlightItem(items) {
    if (!items) 
        return;
    removeActive(items);
    //Wrap focus withon the bounds of suggestion list
    if (currentFocus >= items.length) 
        currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add("autocomplete-active");
    }

//Part 5: Function to remove the active class from all items
function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("autocomplete-active");
    }
}

//Part 6: close the autocomple list is the user click outite tje input field or list
document.addEventListener("click", function (e) {
    if (!autocompleteList.contains(e.target) && e.target !== input) {
    autocompleteList.innerHTML = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    filterGallery("");
});