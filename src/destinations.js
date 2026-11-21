import destination from "./templates/distination.hbs";
import countries from "./templates/countries.hbs";
import categories from "./templates/categories.hbs";

const API = "https://surf-travel-backend-eta.vercel.app";
let currentUrl = "https://surf-travel-backend-eta.vercel.app/destinations";
// endpoinst:
// /countries
// /categories
// /destinations

const refs = {
  filterForm: document.getElementById("filterForm"),
  filterOpen: document.querySelectorAll("#filterOpen"),
  countriesFilter: document.getElementById("countriesFilter"),
  categoriesFilter: document.getElementById("categoriesFilter"),
  filterSubmit: document.getElementById("filterSubmit"),
  cardList: document.getElementById("cardList"),
  loadBtn: document.getElementById("loadBtn"),
  hideBtn: document.getElementById("hideBtn"),
};

refs.filterOpen.forEach(btn => {
  btn.addEventListener("click", () => {
    const contentId = btn.getAttribute("aria-controls");
    const content = document.getElementById(contentId)

    const isOpen = btn.getAttribute('aria-expanded') === "true";
    const nextOpen = !isOpen;
    
    btn.setAttribute("aria-expanded", String(nextOpen));
    content.inert = !nextOpen
  })
})


let page = 1;
let limit = 15;

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("HTTP Error");
  }
  return response.json();
}

function renderElements(data, container, template) {
  container.innerHTML = "";
  data.forEach((item) => {
    const markup = template(item);
    container.insertAdjacentHTML("beforeend", markup);
  });
}

async function fetchElement(endpoint, container, template) {
  try {
    const data = await fetchJson(`${API}/` + endpoint);
    data.length <= limit
      ? refs.loadBtn.classList.add("hidden")
      : refs.loadBtn.classList.remove("hidden");
      renderElements(data, container, template);
    
  } catch (error) {
    console.error(error);
  }
}

async function fetchCards() {
  try {
    const data = await fetchJson(currentUrl);
    data.length <= limit
      ? refs.loadBtn.classList.add("hidden")
      : refs.loadBtn.classList.remove("hidden");
      const slicedData = data.slice(0, limit)
      renderElements(slicedData, refs.cardList, destination);
  } catch (error) {
    console.error(error);
  }
}

refs.loadBtn.addEventListener("click", (e) => {
  limit += 15;
  if (limit >= 45) {
    refs.loadBtn.classList.add("hidden");
    refs.loadBtn.disabled = true;
  }
  if (limit <= 45) {
    refs.hideBtn.classList.remove("hidden");
    refs.hideBtn.disabled = false;
  }
  fetchCards();
});


refs.hideBtn.addEventListener("click", (e) => {
  limit -= 15;
  if (limit <= 15) {
    refs.hideBtn.classList.add("hidden");
    refs.hideBtn.disabled = true;
  }
  if (limit <= 45) {
    refs.loadBtn.classList.remove("hidden");
    refs.loadBtn.disabled = false;
  }
  fetchCards();
});


fetchCards();


fetchElement("countries", refs.countriesFilter, countries);

fetchElement("categories", refs.categoriesFilter, categories);

const loopFormData = (length, arr) => {
  for (let i = 0; i < length; i++) {
    arr.push(String(i));
  }
};

refs.filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(refs.filterForm);
  const filters = {
    countryId: formData.getAll("countries"),
    categoryId: formData.getAll("categories"),
    difficulty: formData.getAll("difficulty"),
    priceLevel: formData.getAll("priceLevel"),
  };
  
  const difficultyLength = filters.difficulty[0];
  const priceLevelLength = filters.priceLevel[0];
  
  loopFormData(difficultyLength, filters.difficulty)
  loopFormData(priceLevelLength, filters.priceLevel);
  console.log(filters);
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([name, values]) => {
    values.forEach((value) => {
      params.append(name, value);
    });
  });
  currentUrl = API + `/destinations?${params.toString()}`;
  fetchCards();
});