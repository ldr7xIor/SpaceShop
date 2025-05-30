function toggleMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-overlay");

    const isOpen = menu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      menu.classList.add("open");
      overlay.classList.remove("hidden");
    }
  }

  function closeMenu() {
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-overlay");
    menu.classList.remove("open");
    overlay.classList.add("hidden");
  }

  // 문서 클릭 시 메뉴 닫기
  document.addEventListener("click", function (event) {
    const menu = document.getElementById("mobile-menu");
    const hamburger = document.getElementById("hamburger-button");

    if (menu.classList.contains("open")) {
      const isClickInsideMenu = menu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger) {
        closeMenu();
      }
    }
  });


  // 화면 리사이즈 시 메뉴 닫기
  window.addEventListener("resize", () => {
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("mobile-overlay");
    if (window.innerWidth > 1024) {
      menu.classList.remove("open");
      overlay.classList.add("hidden");
    }
  });

  const userData = JSON.parse(localStorage.getItem("loggedInUser"));

  if (userData) {
    document.getElementById("auth-section")?.classList.add("hidden");
    document.getElementById("user-info")?.classList.remove("hidden");
    document.getElementById("welcome").innerHTML = `<em>${userData.name}</em>님`;
  
    document.getElementById("mobile-auth-section")?.classList.add("hidden");
    document.getElementById("mobile-user-info")?.classList.remove("hidden");
    document.getElementById("mobile-welcome").innerHTML = `<em>${userData.name}</em>님`;
  
    const pointDisplay = document.getElementById("user-point");
    if (pointDisplay) {
      pointDisplay.textContent = `${userData.point}p`;
    }
  
    const mobilePointDisplay = document.getElementById("mobile-user-point");
    if (mobilePointDisplay) {
      mobilePointDisplay.textContent = `${userData.point}p`;
    }
  }
  

  // 정렬 기능
  function sortProducts(method) {
    const container = document.getElementById("recommended-products");
    const items = Array.from(container.getElementsByClassName("product"));

    let sorted;
    if (method === 'name') {
      sorted = items.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
    } else if (method === 'asc') {
      sorted = items.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (method === 'desc') {
      sorted = items.sort((a, b) => b.dataset.price - a.dataset.price);
    }

    container.innerHTML = "";
    sorted.forEach(item => container.appendChild(item));
  }

  function logout() {
    localStorage.removeItem("loggedInUser");

    document.getElementById("auth-section")?.classList.remove("hidden");
    document.getElementById("user-info")?.classList.add("hidden");

    document.getElementById("mobile-auth-section")?.classList.remove("hidden");
    document.getElementById("mobile-user-info")?.classList.add("hidden");

    document.getElementById("welcome").textContent = "";
    document.getElementById("mobile-welcome").textContent = "";

    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // 검색 기능
  function filterProducts(keyword) {
    const container = document.getElementById("recommended-products");
    const items = Array.from(container.getElementsByClassName("product"));
    const loweredKeyword = keyword.trim().toLowerCase();

    items.forEach(item => {
      const name = item.dataset.name.toLowerCase();
      item.style.display = name.includes(loweredKeyword) ? "block" : "none";
    });
  }

  // PC 검색
  document.getElementById("search-button").addEventListener("click", function () {
    const keyword = document.getElementById("search").value;
    filterProducts(keyword);
  });

  function handlePointAccess() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      window.location.href = "PointRegi.html";
    } else {
      alert("로그인이 필요합니다.");
      window.location.href = "login.html";
    }
  }

  function goToDetail(el) {
    const name = el.dataset.name;
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
  }  
