const popupInfList = [
    { 
        popupName: 'Theme', 
        "filter-type": 'checkbox', 
        lable_list: ['Creatures', 'Architectural drawing', 'Fantasy', 'Horror'] 
    },
    { 
        popupName: 'Style', 
        "filter-type": 'checkbox', 
        lable_list: ['Illustration', 'Stylized Art', 'Line Art', 'Flat Illustration'] 
    },
    { 
        popupName: 'License', 
        "filter-type": 'checkbox', 
        lable_list: ['CC0', 'CC BY', 'CC BY-SA', 'CC BY-NC'] 
    },
    { 
        popupName: 'Price', 
        "filter-type": 'number', 
        lable_list: ['From', 'To'] 
    }
];


function elementFromHtml(html) {
    let templateElement = document.createElement("template");
    templateElement.innerHTML = html.trim();
    return templateElement.content.firstElementChild;
}

function createPopups(popupInfList) {
    let allPopupsFragment = document.createDocumentFragment();

    popupInfList.forEach((currPopup, popupIndex) => {

        let labelHtml = "";

        if (currPopup["filter-type"] === "checkbox") {
            currPopup.lable_list.forEach((labelText, labelIndex) => {
                const checkboxId = `${currPopup.popupName}-popup-${labelIndex}`;
                labelHtml += `
                    <div class="filter-item">
                        <div class="checkbox-row">
                            <input type="checkbox" id="${checkboxId}" name="${currPopup.popupName}" value="${labelText}">
                            <label for="${checkboxId}">${labelText}</label>
                        </div>
                    </div>
                `;
            });

        } 
        else {
            labelHtml = `
                <div class="num-row">
                    <label class="num-lb" for="price-1">From:</label>
                    <input class="num-input" type="number" step="0.01" id="price-1" name="price-1"
                        min="1" max="100000" placeholder="1">
                </div>

                <div class="num-row">
                    <label class="num-lb" for="price-2">To:</label>
                    <input class="num-input" type="number" step="0.01" id="price-2" name="price-2"
                        min="1" max="100000" placeholder="100000">
                </div>
            `;
        }

        let popupHtml = `
            <div id="bottomPopup-${popupIndex}" class="popup-container" data-popup-index="${popupIndex}">
                <div class="popup-content">
                    <h2>${currPopup.popupName}</h2>
                    <button class="closePopup">&times;</button>
                    <hr>
                    <div class="filter-container">${labelHtml}</div>
                    <div style="margin-top:12px;">
                        <button class="popup-btn applyFilter" data-popup-index="${popupIndex}">Apply</button>
                        <button class="popup-btn resetFilter" data-popup-index="${popupIndex}">Reset</button>
                    </div>
                </div>
            </div>
        `;
        let popupElement = elementFromHtml(popupHtml);
        allPopupsFragment.appendChild(popupElement);
    });

    return allPopupsFragment;
}

document.addEventListener("DOMContentLoaded", () => {

    let createdPopups = createPopups(popupInfList);
    document.body.appendChild(createdPopups);

    let openPopupBtns = document.querySelectorAll(".openPopup");
    let currentlyOpenPopup = null;

    openPopupBtns.forEach((button, buttonIndex) => {
        button.addEventListener("click", () => {

            let previouslyOpenedPopup = document.querySelector(`#bottomPopup-${currentlyOpenPopup}`);
            let popupToOpen = document.querySelector(`#bottomPopup-${buttonIndex}`);

            if (currentlyOpenPopup !== null && currentlyOpenPopup !== buttonIndex) {
                previouslyOpenedPopup?.classList.remove("show");
            }

            popupToOpen.classList.toggle("show");

            currentlyOpenPopup = popupToOpen.classList.contains("show") ? buttonIndex : null;
        });
    });

    document.body.addEventListener("click", (event) => {

        let clickedElement = event.target;
        let popupContainer = clickedElement.closest(".popup-container");

        if (clickedElement.classList.contains("closePopup") && popupContainer) {
            popupContainer.classList.remove("show");
            currentlyOpenPopup = null;
            return;
        }

        if (clickedElement.classList.contains("applyFilter") && popupContainer) {

            let filters = {};
            let allInputs = popupContainer.querySelectorAll("input");

            allInputs.forEach(inputElement => {
                if (inputElement.type === "checkbox" && inputElement.checked) {
                    if (!filters[inputElement.name]) filters[inputElement.name] = [];
                    filters[inputElement.name].push(inputElement.value);
                }

                if (inputElement.type === "number" && inputElement.value) {
                    filters[inputElement.name] = parseFloat(inputElement.value);
                }
            });
            applyGalleryFilters(filters);

            return;
        }

        if (clickedElement.classList.contains("resetFilter") && popupContainer) {

            let allInputs = popupContainer.querySelectorAll("input");

            allInputs.forEach(inputElement => {
                if (inputElement.type === "checkbox") inputElement.checked = false;
                if (inputElement.type === "number") inputElement.value = "";
            });
            applyGalleryFilters({});
        }

        if (clickedElement.classList.contains("popup-container")) {
            clickedElement.classList.remove("show");
            currentlyOpenPopup = null;
        }
    });
});

let startY = 0;

document.body.addEventListener("touchstart", (event) => {
    let popup = event.target.closest(".popup-container");
    if (!popup) return;
    startY = event.touches[0].clientY;
});

document.body.addEventListener("touchend", (event) => {
    let popup = event.target.closest(".popup-container");
    if (!popup) return;

    let endY = event.changedTouches[0].clientY;
    if (endY - startY > 50) popup.classList.remove("show");
});

function applyGalleryFilters(filters) {
    let allGalleryCards = document.querySelectorAll(".art-card");

    allGalleryCards.forEach(card => {
        let visible = true;

        if (filters["Theme"]) {
            let themeClasses = filters["Theme"].map(t => t.replace(/\s/g, "_"));
            visible = visible && themeClasses.some(t => card.classList.contains(t));
        }

        if (filters["Style"]) {
            let styleClasses = filters["Style"].map(s => s.replace(/\s/g, "_"));
            visible = visible && styleClasses.some(s => card.classList.contains(s));
        }

        if (filters["License"]) {
            let licenseClasses = filters["License"].map(l => l.replace(/\s/g, "_"));
            visible = visible && licenseClasses.some(l => card.classList.contains(l));
        }

        let priceText = card.querySelector(".price-back").
        textContent.replace("€", "").replace(",", ".").trim();
        let priceValue = parseFloat(priceText);

        if (filters["price-1"] !== undefined) visible = visible && priceValue >= filters["price-1"];
        if (filters["price-2"] !== undefined) visible = visible && priceValue <= filters["price-2"];

        card.style.display = visible ? "" : "none";
    });
}