/* LUX AUTO – wspólny nagłówek, stopka, menu, treść stron */
(function () {
  "use strict";
  var D = window.LUX, page = document.body.getAttribute("data-page") || "index";
  function ico(n) { return '<span class="ms" aria-hidden="true">' + n + "</span>"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var NAV = [["index", "Start"], ["uslugi", "Usługi"], ["flota", "Flota"], ["pomoc-drogowa", "Pomoc drogowa"], ["opinie", "Opinie"], ["kontakt", "Kontakt"]];
  var tel = function (cls, label) { return '<a class="' + cls + '" href="tel:' + D.phoneTel + '">' + ico("call") + "<span>" + (label || D.phone) + "</span></a>"; };
  var towTel = function (cls) { return '<a class="' + cls + '" href="tel:' + D.towTel + '">' + ico("local_shipping") + "<span>Pomoc drogowa: " + D.tow + "</span></a>"; };
  var mail = function (cls) { return '<a class="' + cls + '" href="mailto:' + D.email + '">' + ico("mail") + "<span>" + D.email + "</span></a>"; };
  var logo = '<a class="logo" href="index.html" aria-label="LUX AUTO – strona główna"><b>LUX AUTO</b><small>' + D.cityShort + "</small></a>";

  /* ---------- Header (bez backdrop-filter na kontenerze menu!) ---------- */
  document.getElementById("header").outerHTML =
    '<header class="hdr"><div class="hdr-in">' + logo +
    '<nav class="nav" aria-label="Główne">' + NAV.map(function (n) { return '<a href="' + n[0] + '.html"' + (n[0] === page ? ' class="on" aria-current="page"' : "") + ">" + n[1] + "</a>"; }).join("") + "</nav>" +
    '<div class="hdr-act">' + tel("btn btn-gold hdr-call") +
    (page !== "index" ? '<a class="ibtn back-btn" href="index.html" aria-label="Wróć" title="Wróć">' + ico("arrow_back") + "</a>" : "") +
    '<button class="ibtn burger" aria-label="Otwórz menu" aria-expanded="false" aria-controls="mnav">' + ico("menu") + "</button></div></div></header>";

  /* Mobilne menu – osobny element w body, pełny ekran, nieprzezroczyste tło */
  var mn = document.createElement("div");
  mn.className = "mnav"; mn.id = "mnav"; mn.setAttribute("aria-hidden", "true");
  mn.innerHTML = '<div class="mn-top">' + logo + '<button class="ibtn mn-close" aria-label="Zamknij menu">' + ico("close") + "</button></div>" +
    '<nav class="mn-tiles">' + NAV.map(function (n) { return '<a href="' + n[0] + '.html"' + (n[0] === page ? ' class="on"' : "") + ">" + n[1] + ico("arrow_forward") + "</a>"; }).join("") + "</nav>" +
    '<div class="mn-bottom">' + tel("btn btn-gold btn-lg", "Zadzwoń: " + D.phone) + towTel("btn btn-ghost") + "</div>";
  document.body.appendChild(mn);

  var bb = document.querySelector(".back-btn");
  if (bb) bb.addEventListener("click", function (e) {
    var same = !!document.referrer && (location.protocol === "file:" ? document.referrer.indexOf("file:") === 0 : document.referrer.indexOf(location.origin) === 0);
    if (same && history.length > 1) { e.preventDefault(); history.back(); }
  });

  var burger = document.querySelector(".burger"), savedY = 0, bs = document.body.style;
  function setMenu(o) {
    if (o) { savedY = window.scrollY; bs.position = "fixed"; bs.top = -savedY + "px"; bs.left = "0"; bs.right = "0"; bs.width = "100%"; }
    mn.classList.toggle("open", o); document.body.classList.toggle("menu-open", o);
    burger.setAttribute("aria-expanded", o); mn.setAttribute("aria-hidden", !o);
    if (!o) { bs.position = bs.top = bs.left = bs.right = bs.width = ""; var de = document.documentElement, sb = de.style.scrollBehavior; de.style.scrollBehavior = "auto"; window.scrollTo(0, savedY); de.style.scrollBehavior = sb; }
  }
  burger.addEventListener("click", function () { setMenu(true); });
  mn.querySelector(".mn-close").addEventListener("click", function () { setMenu(false); });
  mn.addEventListener("click", function (e) { var a = e.target.closest("a"); if (a && a.getAttribute("href").indexOf("tel:") !== 0) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && mn.classList.contains("open")) setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1024 && mn.classList.contains("open")) setMenu(false); });

  /* ---------- Bloki treści ---------- */
  function head(k, t, p) { return '<div class="sh reveal"><span class="kicker">' + k + "</span><h2>" + t + "</h2>" + (p ? "<p>" + p + "</p>" : "") + "</div>"; }
  function services(n) { return '<div class="svc-grid">' + D.services.slice(0, n).map(function (s, i) { return '<article class="svc reveal"><span class="svc-n">0' + (i + 1) + "</span>" + ico(s[0]) + "<h3>" + s[1] + "</h3><p>" + s[2] + "</p></article>"; }).join("") + "</div>"; }
  function fleet(n) {
    return '<div class="fleet-grid">' + D.fleet.slice(0, n).map(function (c) {
      return '<article class="car reveal"><div class="car-media"><img src="img/' + c[0] + '-sm.webp" srcset="img/' + c[0] + "-sm.webp 640w, img/" + c[0] + '.webp 960w" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" alt="' + esc(c[1]) + '" loading="lazy" decoding="async" width="960" height="620" data-video="video/' + c[0] + '.mp4"></div><div class="car-b"><h3>' + c[1] + '</h3><span class="tag">' + c[2] + "</span></div></article>";
    }).join("") + '</div><p class="note reveal">' + ico("directions_car") + " " + D.fleetNote + "</p>";
  }
  function stars() { return '<span class="stars" aria-label="5 na 5">' + "★★★★★" + "</span>"; }
  function review(r) { return '<figure class="rev">' + stars() + "<blockquote>„" + r[0] + "”</blockquote><figcaption><b>" + r[1] + "</b><span>Google · 5/5</span></figcaption></figure>"; }
  function reviewsMarquee() { var h = D.reviews.map(review).join(""); return '<div class="marquee" aria-label="Opinie z Google"><div class="mq-track">' + h + '<div class="mq-dup" aria-hidden="true">' + h + "</div></div></div>"; }
  function perks() { return '<div class="perks">' + D.perks.map(function (p) { return '<div class="perk reveal">' + ico(p[0]) + "<div><h3>" + p[1] + "</h3><p>" + p[2] + "</p></div></div>"; }).join("") + "</div>"; }
  function steps() { return '<ol class="steps">' + D.steps.map(function (s, i) { return '<li class="step reveal"><span class="kicker">Krok 0' + (i + 1) + "</span><h3>" + s[0] + "</h3><p>" + s[1] + "</p></li>"; }).join("") + "</ol>"; }
  /* SLOT NA MEDIA: aby dodać prawdziwe wideo/zdjęcie w tle, wpisz ścieżkę w heroMedia (patrz README.md) */
  var heroMedia = { index: "", "pomoc-drogowa": "" };
  function heroBg(key) {
    var m = heroMedia[key], media = "";
    if (m) media = /\.(mp4|webm)$/i.test(m) ? '<video class="hero-media" src="' + m + '" autoplay muted loop playsinline preload="metadata"></video>' : '<img class="hero-media" src="' + m + '" alt="">';
    return '<div class="hero-bg" aria-hidden="true">' + media + "</div>";
  }
  function pageHead(k, t, p, extra) { return '<section class="phead">' + heroBg("x") + '<div class="wrap"><span class="kicker reveal">' + k + '</span><h1 class="reveal">' + t + '</h1><p class="lead reveal">' + p + "</p>" + (extra || "") + "</div></section>"; }
  function contactBlock() {
    return '<div class="contact-list">' + tel("cl") + towTel("cl") + mail("cl") +
      '<a class="cl" href="' + D.mapLink + '" target="_blank" rel="noopener">' + ico("location_on") + "<span><b>Biuro i parking:</b> " + D.office + "</span></a>" +
      '<div class="cl">' + ico("location_on") + "<span><b>Siedziba:</b> " + D.seat + "</span></div>" +
      '<div class="cl">' + ico("schedule") + "<span>" + D.hours + "</span></div></div>";
  }
  function mapBlock() { return '<div class="map reveal"><iframe src="' + D.map + '" title="Mapa – ' + esc(D.office) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>'; }
  function form() {
    var base = location.href.split("#")[0].split("?")[0].replace(/[^\/]*$/, "") + "kontakt.html?wyslano=1#formularz";
    return '<form class="form reveal" id="formularz" action="https://formsubmit.co/' + D.email + '" method="POST">' +
      '<input type="hidden" name="_subject" value="Nowe zgłoszenie ze strony LUX AUTO">' +
      '<input type="hidden" name="_template" value="table"><input type="hidden" name="_next" value="' + esc(base) + '">' +
      '<input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off">' +
      '<div class="ok-msg" hidden>' + ico("check_circle") + "<div><b>Dziękujemy! Zgłoszenie zostało wysłane.</b><br>Oddzwonimy najszybciej, jak to możliwe. W pilnej sprawie zadzwoń: <a href=\"tel:" + D.phoneTel + '">' + D.phone + "</a>.</div></div>" +
      '<div class="f2"><label>Imię i nazwisko<input name="Imię i nazwisko" required autocomplete="name"></label><label>Telefon<input name="Telefon" type="tel" required autocomplete="tel" inputmode="tel"></label></div>' +
      '<label>E-mail (opcjonalnie)<input name="email" type="email" autocomplete="email"></label>' +
      '<label>Opis zdarzenia<textarea name="Wiadomość" rows="4" required placeholder="Co się stało, gdzie jesteś, jakie auto…"></textarea></label>' +
      '<button class="btn btn-gold btn-lg" type="submit">' + ico("send") + " Wyślij zgłoszenie</button>" +
      '<p class="small">Wolisz e-mail? Napisz bezpośrednio: <a href="mailto:' + D.email + '?subject=Zg%C5%82oszenie%20szkody">' + D.email + "</a></p></form>";
  }
  function contactSection(h) { return '<section class="wrap sec" id="kontakt">' + head("Kontakt", h || "Napisz do nas", "Zadzwoń lub napisz — podpowiemy, co zrobić po kolizji i podstawimy auto zastępcze.") + '<div class="contact-grid"><div class="reveal">' + contactBlock() + "</div>" + form() + "</div></section>"; }
  function cta() { return '<section class="wrap sec"><div class="cta reveal">' + heroBg("x") + '<span class="kicker">Dostępni 24/7</span><h2>Ustalmy szczegóły</h2><p>Zadzwoń — auto zastępcze podstawimy we wskazane miejsce, a formalności weźmiemy na siebie.</p>' + tel("btn btn-gold btn-lg") + "</div></section>"; }

  var P = {
    index: function () {
      return '<section class="hero">' + heroBg("index") + '<div class="wrap hero-in"><span class="kicker reveal">' + D.city + ' · 24/7</span><h1 class="reveal">LUX <em>AUTO</em></h1><p class="lead reveal">Samochód zastępczy z OC sprawcy, pomoc drogowa i likwidacja szkody od A do Z. Bez kaucji, bez limitu kilometrów, bez kosztów.</p><div class="hero-cta reveal">' + tel("btn btn-gold btn-lg") + '<a class="btn btn-ghost btn-lg" href="#uslugi">Zobacz usługi</a></div></div>' +
        '<div class="wrap"><dl class="stats reveal">' + D.stats.map(function (s) { return "<div><dt>" + s[0] + "</dt><dd>" + s[1] + "</dd></div>"; }).join("") + '</dl><p class="small stat-note">* rozliczenie bezpośrednio z ubezpieczycielem sprawcy (OC)</p></div></section>' +
        '<section class="wrap sec" id="uslugi">' + head("Zakres usług", "Wszystko po naszej stronie") + services(6) + '<p class="more"><a class="btn btn-ghost" href="uslugi.html">Zobacz wszystkie usługi ' + ico("arrow_forward") + "</a></p></section>" +
        '<section class="wrap sec" id="flota">' + head("Flota zastępcza", "Auta klasy premium") + fleet(3) + '<p class="more"><a class="btn btn-ghost" href="flota.html">Cała flota ' + ico("arrow_forward") + "</a></p></section>" +
        '<section class="wrap sec-s">' + perks() + "</section>" +
        '<section class="sec band" id="opinie"><div class="wrap">' + head("Opinie klientów", "5,0 w Google") + "</div>" + reviewsMarquee() + "</section>" +
        '<section class="wrap sec" id="lokalizacja">' + head("Lokalizacja", D.office, D.hours) + mapBlock() + "</section>" +
        cta() + contactSection();
    },
    uslugi: function () { return pageHead("Zakres usług", "Kompleksowa obsługa szkody", "Działamy 24 godziny na dobę, 7 dni w tygodniu — również w weekendy i święta, bez dodatkowych kosztów.") + '<section class="wrap sec">' + services(6) + "</section>" + '<section class="wrap sec-s">' + perks() + "</section>" + cta(); },
    flota: function () { return pageHead("Flota", "Samochody zastępcze", "Podstawiamy auto we wskazane miejsce — bez kaucji, bez limitu kilometrów, na cały czas likwidacji szkody.") + '<section class="wrap sec">' + fleet(6) + "</section>" + cta(); },
    "pomoc-drogowa": function () {
      return '<section class="phead tall">' + heroBg("pomoc-drogowa") + '<div class="wrap"><span class="kicker reveal">24 godziny na dobę</span><h1 class="reveal">Pomoc drogowa i holowanie</h1><p class="lead reveal">Wypadek, kolizja lub awaria? Jesteśmy na miejscu ekspresowo — również w weekendy i święta.</p><div class="hero-cta reveal"><a class="btn btn-gold btn-lg" href="tel:' + D.towTel + '">' + ico("local_shipping") + "<span>" + D.tow + "</span></a>" + tel("btn btn-ghost btn-lg") + "</div></div></section>" +
        '<section class="wrap sec">' + head("Jak to działa", "Cztery kroki do spokoju") + steps() + "</section>" + cta();
    },
    opinie: function () { return pageHead("Zaufanie", "Opinie naszych klientów", "Ocena 5,0 w Google. Poniżej wybrane recenzje osób, którym pomogliśmy po kolizji.") + '<section class="wrap sec"><div class="rev-grid">' + D.reviews.map(function (r) { return '<div class="reveal">' + review(r) + "</div>"; }).join("") + "</div></section>" + cta(); },
    kontakt: function () { return pageHead("Kontakt", "Jesteśmy do dyspozycji 24/7", "Zadzwoń lub napisz — podpowiemy, co zrobić po kolizji i podstawimy auto zastępcze.") + '<section class="wrap sec"><div class="contact-grid"><div class="reveal">' + contactBlock() + "</div>" + form() + "</div></section>" + '<section class="wrap sec-s">' + mapBlock() + "</section>"; }
  };
  document.getElementById("main").innerHTML = (P[page] || P.index)();

  /* ---------- Stopka + pasek "Zadzwoń" + do góry ---------- */
  document.getElementById("footer").outerHTML = '<footer class="ftr"><div class="wrap ftr-in"><div>' + logo + "<p>Auto zastępcze z OC sprawcy, pomoc drogowa 24/7 i likwidacja szkód w " + D.city + ".</p></div>" +
    '<nav aria-label="Stopka">' + NAV.map(function (n) { return '<a href="' + n[0] + '.html">' + n[1] + "</a>"; }).join("") + "</nav>" +
    "<div>" + contactBlock() + '<a class="fb" href="' + D.facebook + '" target="_blank" rel="noopener">Facebook</a></div></div><p class="wrap copy">© ' + new Date().getFullYear() + " LUX AUTO · " + D.city + "</p></footer>" +
    '<div class="callbar"><a href="tel:' + D.phoneTel + '">' + ico("call") + " Zadzwoń " + D.phone + '</a><a href="tel:' + D.towTel + '" class="cb-tow">' + ico("local_shipping") + " Laweta</a></div>" +
    '<button class="totop" aria-label="Przewiń do góry">' + ico("arrow_upward") + "</button>";

  /* Formularz – podziękowanie */
  if (/[?&]wyslano=1/.test(location.search)) { var ok = document.querySelector(".ok-msg"); if (ok) { ok.hidden = false; document.querySelector(".form").classList.add("sent"); } }

  /* ---------- Przewijanie do kotwic z offsetem nagłówka ---------- */
  var hdr = document.querySelector(".hdr");
  function goTo(id, smooth) {
    var el = document.getElementById(id); if (!el) return false;
    var rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); }); /* bez przesunięć układu w trakcie */
    var y = el.getBoundingClientRect().top + window.scrollY - hdr.offsetHeight - 12;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth && !rm ? "smooth" : "auto" }); return true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a || a.getAttribute("href").length < 2) return;
    if (goTo(a.getAttribute("href").slice(1), true)) { e.preventDefault(); history.replaceState(null, "", a.getAttribute("href")); }
  });
  if (location.hash) { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; window.addEventListener("load", function () { setTimeout(function () { goTo(location.hash.slice(1), false); }, 60); }); }

  var top = document.querySelector(".totop");
  top.onclick = function () { window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
  var tk = false, sTop = null, sHdr = null;
  function onScroll() { tk = false; var y = window.scrollY, a = y > 500, b2 = y > 10;
    if (a !== sTop) { sTop = a; top.classList.toggle("show", a); }
    if (b2 !== sHdr) { sHdr = b2; document.body.classList.toggle("scrolled", b2); } }
  window.addEventListener("scroll", function () { if (!tk) { tk = true; requestAnimationFrame(onScroll); } }, { passive: true }); onScroll();
  /* pasek opinii – pauza, gdy poza ekranem */
  var mq = document.querySelector(".marquee");
  if (mq && "IntersectionObserver" in window) new IntersectionObserver(function (es) { mq.classList.toggle("off", !es[0].isIntersecting); }).observe(mq);

  /* ---------- Animacje wejścia ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (r) { io.observe(r); });
  } else document.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });

  /* ---------- Wideo aut: tylko desktop, bez oszczędzania danych, leniwie ---------- */
  var conn = navigator.connection || {}, rm2 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.matchMedia("(min-width: 1024px) and (hover: hover)").matches && !conn.saveData && !rm2 && "IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var box = e.target, v = box.querySelector("video");
        if (e.isIntersecting) {
          if (!v) { var img = box.querySelector("img"); v = document.createElement("video"); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "none"; v.poster = img.currentSrc || img.src; v.src = img.getAttribute("data-video"); v.setAttribute("aria-hidden", "true");
            v.addEventListener("playing", function () { box.classList.add("playing"); }); box.appendChild(v); }
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (v) v.pause();
      });
    }, { threshold: 0.35 });
    document.querySelectorAll(".car-media").forEach(function (b) { vio.observe(b); });
  }
})();
