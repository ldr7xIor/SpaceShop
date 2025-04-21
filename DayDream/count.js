(function () {
  const BACK_THRESHOLD = 1500;
  const REQUIRED_BACK_COUNT = 5;

  function showAlienHand() {
    if (document.getElementById("alien-hand")) return;

    const hand = document.createElement("img");
    hand.id = "alien-hand";
    hand.src = "/images/ALIEN HAND2.gif";
    hand.style.position = "fixed";
    hand.style.left = "0px";
    hand.style.bottom = "0px";
    hand.style.width = "120px";
    hand.style.zIndex = "1000";
    document.body.appendChild(hand);

    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.style.position = "fixed";
      bubble.style.left = "70px";
      bubble.style.bottom = "90px";
      bubble.style.width = "260px";
      bubble.style.aspectRatio = "4 / 3";
      bubble.style.backgroundImage = "url('/images/speech_bubble.png')";
      bubble.style.backgroundSize = "contain";
      bubble.style.backgroundRepeat = "no-repeat";
      bubble.style.backgroundPosition = "center";
      bubble.style.zIndex = "1001";
      bubble.style.padding = "40px 20px 20px 20px";
      bubble.style.boxSizing = "border-box";
      bubble.style.pointerEvents = "auto";
      bubble.style.display = "flex";
      bubble.style.flexDirection = "column";
      bubble.style.justifyContent = "center";
      bubble.style.alignItems = "flex-start";
      
      const text = document.createElement("div");
      text.innerHTML = `
      <p><em><a href="/Alien/title.html" class="alien-link">1주년 감사 할인 중! ~80%</a></em></p>        <p><em><a href="/Alien/title.html" class="alien-link">직장이 지루한가요? &gt;&gt; 클릭</a></em></p>
      <p><em><a href="/Alien/title.html" class="alien-link">더 강해지고 싶나요? &gt;&gt; 클릭</a></em></p>
      <p><em><a href="/Alien/title.html" class="alien-link">멋진 물건을 가지고 싶나요? &gt;&gt; 클릭</a></em></p>
      `;

      text.style.zIndex = "1002";
      text.style.color = "#000";
      text.style.fontSize = "11px";
      text.style.lineHeight = "1.4";
      text.style.position = "relative";
      text.style.transform = "translate(28px, -15px)";      

      [...text.querySelectorAll("p")].forEach(p => {
        p.style.margin = "4px 0";
      });

      bubble.appendChild(text);
      document.body.appendChild(bubble);
    }, 1000);
  }

  // 실제 뒤로가기로 진입한 경우만 카운트
  function handleBackTracking() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    if (navType !== "back_forward") return;

    const now = Date.now();
    const lastBackTime = parseInt(sessionStorage.getItem("lastBackTime") || "0", 10);
    let backCount = parseInt(sessionStorage.getItem("backCount") || "0", 10);

    if (now - lastBackTime < BACK_THRESHOLD) {
      backCount += 1;
    } else {
      backCount = 1;
    }

    sessionStorage.setItem("lastBackTime", now.toString());
    sessionStorage.setItem("backCount", backCount.toString());

    if (backCount >= REQUIRED_BACK_COUNT) {
      showAlienHand();
      sessionStorage.setItem("backCount", "0");
    }
  }

  window.addEventListener("pageshow", () => {
    handleBackTracking();
  });
})();
