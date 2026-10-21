(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const loginPanel = $("loginPanel");
  const dashboard = $("dashboard");
  const loginForm = $("loginForm");
  const loginButton = $("loginButton");
  const logoutButton = $("logoutButton");
  const loginMessage = $("loginMessage");
  const dashboardMessage = $("dashboardMessage");
  const foodList = $("foodList");

  let supabase = null;

  function showMessage(element, message, type = "") {
    if (!element) return;
    element.textContent = message;
    element.className = "message" + (type ? " " + type : "");
  }

  function setLoggedIn(isLoggedIn) {
    loginPanel?.classList.toggle("hidden", isLoggedIn);
    dashboard?.classList.toggle("hidden", !isLoggedIn);
    logoutButton?.classList.toggle("hidden", !isLoggedIn);
  }

  function getConfig() {
    return {
      url: typeof SUPABASE_URL !== "undefined" ? SUPABASE_URL : "",
      key: typeof SUPABASE_PUBLISHABLE_KEY !== "undefined"
        ? SUPABASE_PUBLISHABLE_KEY
        : ""
    };
  }

  function initializeSupabase() {
    const { url, key } = getConfig();

   if (!url || !window.supabase?.createClient) {
  showMessage(
    loginMessage,
    "تنظیمات Supabase بارگذاری نشده. ترتیب فایل‌های HTML را بررسی کن.",
    "error"
  );
  return false;
}
      

    // از کلاینت موجود استفاده می‌کنیم تا اتصال تکراری ساخته نشود.
    if (typeof supabaseClient !== "undefined" && supabaseClient) {
      supabase = supabaseClient;
    } else {
      supabase = window.supabase.createClient(url, key);
    }

    return true;
  }

  function safeImageUrl(value) {
  if (!value) return "";

  try {
    const imageAddress = new URL(value);
    if (imageAddress.protocol === "https:") {
      return imageAddress.href;
    }
    return "";
  } catch (error) {
    return "";
  }
}

  async function login(username, password) {
    const { url, key } = getConfig();

   const response = await fetch(
  url.replace(/\/+$/, "") + "/functions/v1/dynamic-service",
  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": key
        },
        body: JSON.stringify({ username, password })
      }
    );

    let result;

    try {
      result = await response.json();
    } catch {
      throw new Error("پاسخ سرویس ورود قابل خواندن نیست.");
    }

   if (!response.ok) {
  throw new Error("خطای ورود: " + response.status);
}

if (result == null || !result.session) {
  throw new Error("پاسخ ورود فاقد session است.");
}

    const { error } = await supabase.auth.setSession({
      access_token: result.session.access_token,
      refresh_token: result.session.refresh_token
    });

    if (error) throw error;

    const { data, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;

    return data.user;
  }

  async function loadFoods() {
    foodList.replaceChildren();
    showMessage(dashboardMessage, "در حال دریافت غذاها...");

    const { data, error } = await supabase
      .from("menu_items")
      .select("id, name, category, price, image_url, updated_at")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      showMessage(
        dashboardMessage,
        "دریافت غذاها ناموفق بود: " + error.message,
        "error"
      );
      return;
    }

    if (!data || data.length === 0) {
      showMessage(dashboardMessage, "غذایی در جدول menu_items پیدا نشد.");
      return;
    }

    for (const food of data) {
      foodList.appendChild(createFoodCard(food));
    }

    showMessage(
  dashboardMessage,
  data.length + " غذا دریافت شد.",
  "success"
);
  }

  function createFoodCard(food) {
    const card = document.createElement("article");
    card.className = "food-card";

    const image = document.createElement("img");
    image.alt = food.name || "تصویر غذا";
    image.loading = "lazy";

    const initialImage = safeImageUrl(food.image_url);
    if (initialImage) image.src = initialImage;

    image.onerror = () => image.removeAttribute("src");

    const content = document.createElement("div");

    const name = document.createElement("div");
    name.className = "food-name";
    name.textContent = food.name || "غذای بدون نام";

    const category = document.createElement("div");
    category.className = "food-category";
    category.textContent = food.category || "بدون دسته‌بندی";

    const fields = document.createElement("div");
    fields.className = "fields";

    const priceLabel = document.createElement("label");
    priceLabel.textContent = "قیمت (تومان)";

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.min = "0";
    priceInput.step = "1";
    priceInput.required = true;
    priceInput.value = food.price ?? "";
    priceInput.inputMode = "numeric";

    priceLabel.appendChild(priceInput);

    const imageLabel = document.createElement("label");
    imageLabel.textContent = "آدرس تصویر غذا";

    const imageInput = document.createElement("input");
    imageInput.type = "url";
    imageInput.placeholder = "https://example.com/food.jpg";
    imageInput.value = food.image_url || "";

    imageLabel.appendChild(imageInput);
    fields.append(priceLabel, imageLabel);

    const actions = document.createElement("div");
    actions.className = "food-actions";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "btn";
    saveButton.textContent = "ذخیره تغییرات";

    const status = document.createElement("div");
    status.className = "message";
    status.setAttribute("role", "status");

    saveButton.addEventListener("click", async () => {
      const priceText = priceInput.value.trim();
      const price = Number(priceText);
      const imageUrl = imageInput.value.trim();

      if (
        priceText === "" ||
        !Number.isSafeInteger(price) ||
        price < 0
      ) {
        showMessage(
          status,
          "قیمت باید عدد صحیح و صفر یا بیشتر باشد.",
          "error"
        );
        return;
      }

      if (imageUrl && !safeImageUrl(imageUrl)) {
        showMessage(
          status,
          "آدرس تصویر باید یک لینک معتبر HTTPS باشد.",
          "error"
        );
        return;
      }

      saveButton.disabled = true;
      showMessage(status, "در حال ذخیره تغییرات...");

      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError || !sessionData.session) {
          throw new Error("نشست ورود معتبر نیست. دوباره وارد پنل شو.");
        }

        const { data, error } = await supabase
          .from("menu_items")
          .update({
            price: price,
            image_url: imageUrl || null,
            updated_at: new Date().toISOString()
          })
          .eq("id", food.id)
          .select("id");

        if (error) throw error;

        if (!data || data.length === 0) {
          throw new Error(
            "تغییری ذخیره نشد. دسترسی UPDATE یا شناسه غذا را بررسی کن."
          );
        }

        food.price = price;
        food.image_url = imageUrl || null;

        image.removeAttribute("src");
        if (food.image_url) image.src = food.image_url;

        showMessage(status, "تغییرات با موفقیت ذخیره شد.", "success");
      } catch (error) {
        showMessage(
          status,
          "خطا در ذخیره: " + (error.message || "خطای نامشخص"),
          "error"
        );
      } finally {
        saveButton.disabled = false;
      }
    });

    actions.appendChild(saveButton);
    content.append(name, category, fields, actions, status);
    card.append(image, content);

    return card;
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!supabase && !initializeSupabase()) return;

    const username = $("username").value.trim();
    const password = $("password").value;

    if (!username || !password) {
      showMessage(loginMessage, "نام کاربری و رمز عبور را وارد کن.", "error");
      return;
    }

    loginButton.disabled = true;
    showMessage(loginMessage, "در حال بررسی اطلاعات ورود...");

    try {
      await login(username, password);

      $("password").value = "";
      setLoggedIn(true);
      await loadFoods();
    } catch (error) {
      showMessage(
        loginMessage,
        error.message || "ورود ناموفق بود.",
        "error"
      );
    } finally {
      loginButton.disabled = false;
    }
  }

  async function handleLogout() {
    logoutButton.disabled = true;

    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }

      foodList.replaceChildren();
      setLoggedIn(false);
      showMessage(loginMessage, "با موفقیت از پنل خارج شدی.", "success");
    } catch (error) {
      showMessage(
        dashboardMessage,
        "خروج ناموفق بود: " + error.message,
        "error"
      );
    } finally {
      logoutButton.disabled = false;
    }
  }

  async function initializePage() {
    if (!initializeSupabase()) return;

    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) throw userError;

        if (userData.user) {
          setLoggedIn(true);
          await loadFoods();
        }
      }
    } catch (error) {
      showMessage(
        loginMessage,
        "خطا در بررسی ورود: " + (error.message || ""),
        "error"
      );
    }
  }

  loginForm.addEventListener("submit", handleLogin);
  $("refreshButton").addEventListener("click", loadFoods);
  logoutButton.addEventListener("click", handleLogout);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage);
  } else {
    initializePage();
  }
})();