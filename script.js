// ===================================
// منوی دیجیتال رستوران قائم
// ===================================

const foods = [
  // کباب‌ها
  { name: "چلو کباب مخصوص قائم", category: "کباب‌ها", price: 615000, image: "ghaeim-special.jpg" },
  { name: "چلو کباب کوبیده", category: "کباب‌ها", price: 580000, image: "kabab-koobideh.jpg" },
  { name: "چلو جوجه کباب زعفرانی", category: "کباب‌ها", price: 580000, image: "joje-kabab.jpg" },
  { name: "چلو جوجه کباب مخصوص", category: "کباب‌ها", price: 615000, image: "joojeh-special.jpg" },
  { name: "چلو کباب وزیری", category: "کباب‌ها", price: 730000, image: "vaziri.jpg" },
  { name: "چلو کباب نگینی", category: "کباب‌ها", price: 595000, image: "negin.jpg" },
  { name: "چلو کباب بختیاری", category: "کباب‌ها", price: 0, image: "bakhtiari.jpg" },
  { name: "چلو کباب برگ", category: "کباب‌ها", price: 0, image: "barg.jpg" },
  { name: "چلو کباب سلطانی", category: "کباب‌ها", price: 0, image: "soltani.jpg" },
  { name: "چلو کباب لقمه", category: "کباب‌ها", price: 560000, image: "loghmeh.jpg" },

  // غذاهای ایرانی
  { name: "زرشک پلو با مرغ", category: "غذاهای ایرانی", price: 560000, image: "zereshk-polo.jpg" },
  { name: "چلو خورشت قیمه", category: "غذاهای ایرانی", price: 497000, image: "gheimeh.jpg" },
  { name: "چلو خورشت قیمه بادمجان", category: "غذاهای ایرانی", price: 495000, image: "gheimeh-bademjan.jpg" },
  { name: "چلو اکبرجوجه", category: "غذاهای ایرانی", price: 730000, image: "akbar-jojeh.jpg" },
  { name: "چلو مرغ ترش", category: "غذاهای ایرانی", price: 560000, image: "morgh-torsh.jpg" },
  { name: "چلو شنسیل سوخاری", category: "غذاهای ایرانی", price: 590000, image: "shishler.jpg" },
  { name: "چلو مرغ مجلسی", category: "غذاهای ایرانی", price: 0, image: "morgh-majlsi.jpg" },
  { name: "چلو قورمه سبزی", category: "غذاهای ایرانی", price: 497000, image: "ghormeh-sabzi.jpg" },

  // انواع پلو
  { name: "هواری مرغ", category: "انواع پلو", price: 520000, image: "havari-morgh.jpg" },
  { name: "هواری گوشت", category: "انواع پلو", price: 530000, image: "havari-goosht.jpg" },
  { name: "هویج پلو", category: "انواع پلو", price: 540000, image: "havij-polo-2.jpg" },
  { name: "عدس پلو", category: "انواع پلو", price: 510000, image: "adas-polo.jpg" },
  { name: "استانبولی", category: "انواع پلو", price: 498000, image: "istanboli.jpg" },

  // غذاهای محلی و دریایی
  { name: "گبولی گوشت", category: "غذاهای محلی و دریایی", price: 565000, image: "goboli-goosht.jpg" },
  { name: "پلو بندری", category: "غذاهای محلی و دریایی", price: 530000, image: "bandari-polo.jpg" },
  { name: "بریانی هندی", category: "غذاهای محلی و دریایی", price: 520000, image: "booyae-siah.jpg" },
  { name: "گبولی مرغ", category: "غذاهای محلی و دریایی", price: 530000, image: "goboli-morgh.jpg" },
  { name: "چلو ماهی سرخ شده شیر سوخاری", category: "غذاهای محلی و دریایی", price: 830000, image: "mahi-sorkh.jpg" },
  { name: "چلو ماهی سرخ شده شیر نیزه سوخاری", category: "غذاهای محلی و دریایی", price: 730000, image: "mahi-sorkh.jpg" },
  { name: "چلو قلیه ماهی", category: "غذاهای محلی و دریایی", price: 600000, image: "ghalie-mahi.jpg" },
  { name: "چلو میگو سوخاری", category: "غذاهای محلی و دریایی", price: 780000, image: "meygoo-sokhari.jpg" },
  { name: "هواری ماهی", category: "غذاهای محلی و دریایی", price: 0, image: "havari-mahi.jpg" },
  { name: "چلو ماهی و میگو سوخاری", category: "غذاهای محلی و دریایی", price: 999000, image: "mahi-meygoo.jpg" },

  // غذای اقتصادی
  { name: "بریانی", category: "غذای اقتصادی", price: 0, image: "beryani.jpg" },
  { name: "چلو کباب کوبیده یک سیخ", category: "غذای اقتصادی", price: 400000, image: "koobideh-one.jpg" },
  { name: "چلو جوجه کباب", category: "غذای اقتصادی", price: 400000, image: "joojeh2.jpg" },
  { name: "چلو کباب وزیری", category: "غذای اقتصادی", price: 470000, image: "vaziri2-economy.jpg" },
  { name: "چلو زرشک پلو", category: "غذای اقتصادی", price: 460000, image: "zereshk-economy.jpg" },
  { name: "چلو خورشت قیمه", category: "غذای اقتصادی", price: 400000, image: "gheimeh-economy.jpg" },
  { name: "چلو خورشت سبزی", category: "غذای اقتصادی", price: 410000, image: "sabzi-economy.jpg" },
  { name: "استانبولی", category: "غذای اقتصادی", price: 400000, image: "istanboli-economy.jpg" },
  { name: "چلو ماهی سرخ شده شیر نیزه", category: "غذای اقتصادی", price: 450000, image: "mahi-economy.jpg" }
];


// ===================================
// عناصر صفحه
// ===================================

const foodSections = document.getElementById("food-sections");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-btn");
const emptyState = document.getElementById("empty-state");
const foodCount = document.getElementById("food-count");

let selectedCategory = "all";


// ===================================
// تبدیل عدد به قیمت فارسی
// ===================================

function formatPrice(price) {
  if (!price || price <= 0) {
    return "قیمت تماس";
  }

  return price.toLocaleString("fa-IR") + " تومان";
}


// ===================================
// ساخت کارت غذا
// ===================================

function createFoodCard(food) {
  const card = document.createElement("article");
  card.className = "food-card";

  const photo = document.createElement("img");
  photo.className = "food-photo";
  photo.src = food.image;
  photo.alt = food.name;
  photo.loading = "lazy";

  // اگر عکس پیدا نشد، نمایش جایگزین
  photo.addEventListener("error", function () {
    this.style.display = "none";

    if (!card.querySelector(".photo-placeholder")) {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";
      placeholder.textContent = "🍽️";

      placeholder.style.cssText =
        "height:205px;display:flex;align-items:center;" +
        "justify-content:center;background:#eee8dc;font-size:48px;";

      card.insertBefore(placeholder, card.firstChild);
    }
  });

  const info = document.createElement("div");
  info.className = "food-info";

  const name = document.createElement("h3");
  name.textContent = food.name;

  const price = document.createElement("div");
  price.className = "food-price";
  price.textContent = formatPrice(food.price);

  const label = document.createElement("span");
  label.className = "food-category-label";
  label.textContent = food.category;

  info.append(name, price, label);
  card.append(photo, info);

  return card;
}


// ===================================
// نمایش غذاها بر اساس دسته‌بندی
// ===================================

function renderMenu() {
  const searchText = searchInput.value.trim().toLocaleLowerCase("fa");

  const filteredFoods = foods.filter(function (food) {
    const matchesCategory =
      selectedCategory === "all" ||
      food.category === selectedCategory;

    const matchesSearch =
      food.name.toLocaleLowerCase("fa").includes(searchText);

    return matchesCategory && matchesSearch;
  });

  foodSections.replaceChildren();

  const categories = [
    ...new Set(filteredFoods.map(food => food.category))
  ];

  categories.forEach(function (category) {
    const categoryFoods = filteredFoods.filter(
      food => food.category === category
    );

    const section = document.createElement("section");
    section.className = "food-category";

    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = category;

    const grid = document.createElement("div");
    grid.className = "food-grid";

    categoryFoods.forEach(function (food) {
      grid.appendChild(createFoodCard(food));
    });

    section.append(title, grid);
    foodSections.appendChild(section);
  });

  emptyState.hidden = filteredFoods.length !== 0;

  foodCount.textContent =
    "تعداد " + filteredFoods.length.toLocaleString("fa-IR") + " غذا";
}


// ===================================
// فیلتر دسته‌بندی‌ها
// ===================================

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    renderMenu();
  });
});


// ===================================
// جست‌وجوی غذا
// ===================================

searchInput.addEventListener("input", renderMenu);


// ===================================
// شروع برنامه
// ===================================

renderMenu();