const themeToggler = document.querySelector("#toggle");

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const items = [
  {
    title: "Дорожный мотоцикл",
    description: "Geon Scrambler 300",
    tags: ["Топ продаж", "В рассрочку"],
    price: 2400,
    img: "./img/1.jpeg",
    rating: 2.8,
  },
  {
    title: "Дорожный мотоцикл",
    description: "GEON BADDOG 250",
    tags: ["Новинка"],
    price: 1900,
    img: "./img/2.jpeg",
    rating: 4.9,
  },
  {
    title: "Эндуро-кросс, мотард",
    description: "ROTTOR ONYX 300",
    tags: ["Новинка"],
    price: 2628,
    img: "./img/3.jpeg",
    rating: 3.0,
  },
  {
    title: "Туристический мотоцикл",
    description: "KTM ADVENTURE 390",
    tags: ["Топ продаж", "В рассрочку"],
    price: 7640,
    img: "./img/4.jpeg",
    rating: 4.7,
  },
  {
    title: "Спорт",
    description: "VIPER V250-F2",
    tags: ["Топ продаж"],
    price: 1510,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Круизер",
    description: "RIDER RENEGADE 250CC",
    tags: ["В рассрочку"],
    price: 1865,
    img: "./img/6.jpeg",
    rating: 3.9,
  },
  {
    title: "Питбайк",
    description: "XTR 607 125CC 14/12",
    tags: ["Новинка"],
    price: 720,
    img: "./img/7.jpeg",
    rating: 5.0,
  },
  {
    title: "Питбайк",
    description: "МИНИ КРОССБАЙК DIRT BIKE",
    tags: ["Топ продаж"],
    price: 385,
    img: "./img/8.jpeg",
    rating: 3.0,
  },
  {
    title: "Эндуро-кросс, мотард",
    description: "SOKMOTO CRF300CC",
    tags: ["Предзаказ"],
    price: 2780,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Спорт",
    description: "ВVOGE 300RR (LONCIN GP300)",
    tags: ["В рассрочку"],
    price: 2640,
    img: "./img/10.jpeg",
    rating: 3.9,
  },
  {
    title: "Туристический мотоцикл",
    description: "SENKE (SKM) SK400-KV",
    tags: ["Предзаказ"],
    price: 5860,
    img: "./img/11.jpeg",
    rating: 4.1,
  },
  {
    title: "Питбайк",
    description: "EXDRIVE BARTON 150",
    tags: ["Топ продаж"],
    price: 1055,
    img: "./img/12.jpeg",
    rating: 3.1,
  },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
  nothingFound.textContent = "";
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    itemsContainer.append(prepareShopItem(item));
  });
  if (!arr.length) {
    nothingFound.textContent = "Ничего не найдено";
  }
}

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
  const { title, description, tags, img, price, rating } = shopItem;
  const item = itemTemplate.content.cloneNode(true);

  const cardFront = item.querySelector(".card-front");
  cardFront.querySelector("h1").textContent = title;
  cardFront.querySelector("p").textContent = description;
  cardFront.querySelector("img").src = img;
  cardFront.querySelector(".price").textContent = `$${price}`;

  const ratingContainer = cardFront.querySelector(".rating");
  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    ratingContainer.append(star);
  }

  const tagsHolder = cardFront.querySelector(".tags");
  tags.forEach((tag) => {
    const element = document.createElement("span");
    element.textContent = tag;
    element.classList.add("tag");
    tagsHolder.append(element);
  });

  const shopItemElement = item.querySelector(".shop-item");
  shopItemElement.addEventListener("click", () => {
    shopItemElement.classList.toggle("flipped");
  });

  return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
  const searchString = searchInput.value.trim().toLowerCase();
  currentState = items.filter((el) =>
    el.title.toLowerCase().includes(searchString)
  );
  currentState.sort((a, b) => sortByAlphabet(a, b));
  renderItems(currentState);
  sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentState.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentState.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentState.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentState.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }
  renderItems(currentState);
});