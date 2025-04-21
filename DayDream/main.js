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

  // ✅ 문서 클릭 시 메뉴 닫기
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

  // 로그인 상태 확인 및 UI 반영
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    document.getElementById("auth-section")?.classList.add("hidden");
    document.getElementById("user-info")?.classList.remove("hidden");
    document.getElementById("welcome").innerHTML = `<em>${user}</em>님`;

    document.getElementById("mobile-auth-section")?.classList.add("hidden");
    document.getElementById("mobile-user-info")?.classList.remove("hidden");
    document.getElementById("mobile-welcome").innerHTML = `<em>${user}</em>님`;
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

  // 로그인 예시
  function login() {
    localStorage.setItem("loggedInUser", "이자헌");
    window.location.href = "main.html";
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

  // 포인트 등록 진입
  function handlePointAccess() {
    if (user) {
      window.location.href = "/DayDream/PointRegi.html";
    } else {
      alert("로그인이 필요합니다.");
    }
  }

  function goToDetail(el) {
    const name = el.dataset.name;
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
  }

  // 말풍선 링크 클릭 시 깨지는 효과 후 이동
setTimeout(() => {
  document.querySelectorAll('.alien-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      startShatterEffect(() => {
        window.location.href = link.getAttribute('href');
      });
    });
  });
}, 0);

// 💥 메인 페이지 깨지는 효과
function startShatterEffect(callback) {
  const pieceCount = 80;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    piece.className = "glass-piece";

    // 랜덤 위치
    const size = Math.random() * 80 + 20;
    piece.style.width = `${size}px`;
    piece.style.height = `${size}px`;
    piece.style.left = `${Math.random() * window.innerWidth}px`;
    piece.style.top = `${Math.random() * window.innerHeight}px`;

    // 랜덤 배경
    piece.style.background = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`;
    document.body.appendChild(piece);

    // 랜덤 이동 방향
    const dx = (Math.random() - 0.5) * 1000;
    const dy = (Math.random() - 1) * 1000;
    const rot = (Math.random() - 0.5) * 1080;

    // 트랜지션 적용
    requestAnimationFrame(() => {
      piece.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
      piece.style.opacity = 0;
    });
  }

  setTimeout(() => {
    callback(); // 페이지 이동
  }, 1000);
}

  