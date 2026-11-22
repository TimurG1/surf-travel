
import categoriesTemplate from "../templates/categories.hbs";

import surf1 from "../images/surf-1.png";
import surf2 from "../images/surf-2.png";
import surf3 from "../images/surf-3.png";
import surf4 from "../images/surf-4.png";
import surf5 from "../images/surf-5.png";
import surf6 from "../images/surf-6.png";

// CATEGORIES

const cards = [
    { title: "Surf Camp", icon: "surf-camp" },
    { title: "Gruppi", icon: "group" },
    { title: "Surf Lodge", icon: "surf-lodge" },
    { title: "Surf Resort", icon: "surf-resort" },
    { title: "Boat Trip", icon: "boat-trip" },
    { title: "Junior", icon: "junior" },
    { title: "Surf & Yoga", icon: "surf-yoga" },
    { title: "Adventures", icon: "adventures" },
    { title: "Family Trip", icon: "family-trip" }
];

const cardsContainer = document.querySelector(".cards-container");

if (cardsContainer) {
    cardsContainer.innerHTML = categoriesTemplate({ cards });
}


import surf1 from "../images/surf-1.png";
import surf2 from "../images/surf-2.png";
import surf3 from "../images/surf-3.png";
import surf4 from "../images/surf-4.png";
import surf5 from "../images/surf-5.png";
import surf6 from "../images/surf-6.png";


// PACKAGES

const images = [
    surf1,
    surf2,
    surf3,
    surf4,
    surf5,
    surf6
];

const packagesContainer = document.querySelector(".packages-container");

if (packagesContainer) {
    const packagesMarkup = images.map((imagePath) => {
        return `
            <div class="package-card">
                <div class="package-card__image">
                    <img src="${imagePath}" alt="Surf vacation">
                    <span class="package-card__badge">
                        Surf Camp
                    </span>
                </div>

                <div class="package-card__content">
                    <p class="package-card__location">
                        Africa, Morocco
                    </p>

                    <h3 class="package-card__title">
                        Jeffrey’s Bay Surf Camp in Hotel
                    </h3>
                </div>
            </div>
        `;
    }).join("");

    packagesContainer.innerHTML = packagesMarkup;
}