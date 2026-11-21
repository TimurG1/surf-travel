import destination from "./templates/distination.hbs";
import countries from "./templates/countries.hbs";
import categories from "./templates/categories.hbs";

const API = "https://surf-travel-backend-eta.vercel.app";

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

async function fetchElement(endpoint, container, template, pagination = false) {
  try {
    const data = await fetchJson(`${API}/` + endpoint);
    if (pagination) {
      console.log(limit);
      const slicedData = data.slice(0, limit)
      renderElements(slicedData, container, template);
    } else {
      renderElements(data, container, template);
    }
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
  fetchElement(
    `destinations`,
    refs.cardList,
    destination,
    true
  );
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
  fetchElement(
    `destinations`,
    refs.cardList,
    destination,
    true
  );
});


fetchElement(
  `destinations`,
  refs.cardList,
  destination,
  true,
);


fetchElement("countries", refs.countriesFilter, countries);

fetchElement("categories", refs.categoriesFilter, categories);


refs.filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(refs.filterForm);
  const filters = {
    countryId: formData.getAll("countries"),
    categoryId: formData.getAll("categories"),
    difficulty: formData.getAll("difficulty"),
    priceLevel: formData.getAll("priceLevel"),
  };
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([name, values]) => {
    values.forEach((value) => {
      params.append(name, value);
    });
  });
  fetchElement(
    `destinations?${params.toString()}`,
    refs.cardList,
    destination,
    true
  );
});


