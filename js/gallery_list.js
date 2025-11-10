//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const imgInfList = [   
    {
        "artwork_src" : 'img/art1_8.png',
        "artwork_name": 'The Mushroom King',
        "avatar_src"  : 'img/avatar1.png',
        "autor_name"  : 'Katfish Draws',

        "artwork_price" : '16,00',

        "theme"       : ['Creatures'],
        "style"       : ['Illustration', 'Stylized_Art'],
        "license"     : 'CC_BY-NC'
    },
    
    {
        "artwork_src" : 'img/art2_1.png',
        "artwork_name": 'Collonges-la-Rouge',
        "avatar_src"  : 'img/avatar2.png',
        "autor_name"  : 'Ethan Davies',        

        "artwork_price" : '13,70',

        "theme"       : ['Architectural_drawing'],
        "style"       : ['Illustration', 'Line_Art'],
        "license"     : 'CC_BY-NC'
    },
    
    {
        "artwork_src" : 'img/art1_1.png',
        "artwork_name": 'Breeze',
        "avatar_src"  : 'img/avatar1.png',
        "autor_name"  : 'Katfish Draws',

        "artwork_price" : '16,20',        

        "theme"       : ['Creatures'],
        "style"       : ['Illustration', 'Stylized_Art'],
        "license"     : 'CC0'
    },

    {
        "artwork_src" : 'img/art3_1.png',
        "artwork_name": 'Magical crows',
        "avatar_src"  : 'img/avatar3.png',
        "autor_name"  : 'pikaole',

        "artwork_price" : '17,20',

        "theme"       : ['Fantasy', 'Creatures'],
        "style"       : ['Flat_Illustration', 'Illustration'],
        "license"     : 'CC0'
    },

    {
        "artwork_src" : 'img/art3_2.png',
        "artwork_name": 'Witchy crows',
        "avatar_src"  : 'img/avatar3.png',
        "autor_name"  : 'pikaole',

        "artwork_price" : '15,20',

        "theme"       : ['Creatures'],
        "style"       : ['Flat_Illustration', 'Illustration'],
        "license"     : 'CC BY'
    },

    {
        "artwork_src" : 'img/art3_3.png',
        "artwork_name": 'Baby rails with shoes',
        "avatar_src"  : 'img/avatar3.png',
        "autor_name"  : 'pikaole',        

        "artwork_price" : '5,70',

        "theme"       : ['Creatures'],
        "style"       : ['Flat_Illustration', 'Illustration'],
        "license"     : 'CC0'
    },

    {
        "artwork_src" : 'img/art3_4.png',
        "artwork_name": 'Ghost bat',
        "avatar_src"  : 'img/avatar3.png',
        "autor_name"  : 'pikaole',

        "artwork_price" : '11,50',

        "theme"       : ['Creatures', 'Horror'],
        "style"       : ['Flat_Illustration', 'Illustration'],
        "license"     : 'CC_BY-SA'
    },
    
    {
        "artwork_src" : 'img/art3_5.png',
        "artwork_name": 'Twinkle twinkle little bugs',
        "avatar_src"  : 'img/avatar3.png',
        "autor_name"  : 'pikaole',

        "artwork_price" : '10,00',

        "theme"       : ['Creatures'],
        "style"       : ['Flat_Illustration', 'Illustration'],
        "license"     : 'CC_BY'
    }
]


//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//https://www.youtube.com/watch?v=tlcEXDGo0oY

function elementFromHtml(html) {
	const template = document.createElement("template");
	template.innerHTML = html.trim();

	return template.content.firstElementChild;
}

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function createImageGalery(imgInfList){
	let gallerySample = '';

	let gallerySamplesList = document.createDocumentFragment();
	// Going through the list of dictionaries
	for (let i = 0; i < imgInfList.length; i++) {

		// Define gallerySample
		// Creates a "Gallery sample" - fully edited gallery image sample
		// (must be created for EVERY image in gallery folder (so the every list member))

        // artwork_src  - path to artwork
        // artwork_name - name of artwork
        // avatar_src   - path to avatar
        // autor_name   - name of artist

        gallerySample = elementFromHtml(`
			<div class="art-card ${imgInfList[i].theme.join(' ')} ${imgInfList[i].style.join(' ')} ${imgInfList[i].license}">
                <div class="art-img">
                    <img src="${imgInfList[i].artwork_src}" alt="art image" class="art-photo" />
                </div>
                <h3>${imgInfList[i].artwork_name}</h3>
                <div class='price-back'>${imgInfList[i].artwork_price} €</div>
                <div class="artist-info" onclick="redirectToArtistPage()">
                    <div class="artist-avatar">
                        <img src="${imgInfList[i].avatar_src}" alt="art image" class="art-photo" />
                    </div>
                    <div class="artist-text">
                        <span class="made-by">Made by ${imgInfList[i].autor_name}</span>
                    </div>
                </div>
            </div>
		`);

		gallerySamplesList.appendChild(gallerySample);
	}

	return gallerySamplesList;
}

window.addEventListener("DOMContentLoaded", () => {
    const myGallery = createImageGalery(imgInfList);
    document.querySelector(".gallery").appendChild(myGallery);

    const checkboxes = document.querySelectorAll('.checkbox');
    const images = document.querySelectorAll('.art-card');
    const priceFromInput = document.getElementById('price-1');
    const priceToInput = document.getElementById('price-2');

    checkboxes.forEach(cb => cb.addEventListener('change', filterImages));
    priceFromInput.addEventListener('input', filterImages);
    priceToInput.addEventListener('input', filterImages);

    function filterImages() {
        const activeTags = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value.replace(/\s/g, '_')); // заменяем пробелы на "_", как в классах

        const priceFrom = parseFloat(priceFromInput.value) || 0;
        const priceTo = parseFloat(priceToInput.value) || Infinity;

        images.forEach(image => {
            const classList = Array.from(image.classList);
            const tagMatch  = activeTags.length === 0 || activeTags.some(tag => classList.includes(tag));

            const priceText = image.querySelector('.price-back').textContent
            .replace('€', '')
            .replace(',', '.')
            .trim();
            const priceValue = parseFloat(priceText);

            const priceMatch = priceValue >= priceFrom && priceValue <= priceTo;

            image.style.display = (tagMatch && priceMatch) ? '' : 'none';
        });
    }
});

