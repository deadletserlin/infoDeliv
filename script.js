const dataLayanan = [
  {
    nama: "Warung Sugema", kontak: "0813-1605-093", wilayah: "Bandung",
    gambar: "images/sugema.png", poster: "images/sugema.png",
    detail: "detail-menu/detail-sugema.html", ongkir: "Gratis ongkir ke asrama dan Sukapura",
    label: "Gratis asrama & Sukapura", gratis: true
  },
  {
    nama: "Lestari", kontak: "0813-1330-8864", wilayah: "Bandung",
    gambar: "images/lestari.png", poster: "images/lestari.png",
    detail: "detail-menu/detail-lestari.html",
    ongkir: "Asrama gratis; Sukapura Rp1.000",
    label: "Asrama gratis · Sukapura Rp1.000",
    gratis: false
  },
  {
    nama: "Dongmoon", kontak: "0851-2104-0012", wilayah: "Sekitar Telkom",
    gambar: "images/dongmoon.jpeg", poster: "images/dongmoon.jpeg",
    detail: "detail-menu/detail-dongmoon.html", ongkir: "Rp2.000 sekitar Telkom",
    label: "Rp2.000 sekitar Telkom", gratis: false
  },
  {
    nama: "Chinese Food", kontak: "+62 812-2327-8852", wilayah: "Sukabirus, depan gate 2 WDP",
    gambar: "images/chineseFood.jpeg", poster: "images/chineseFood.jpeg",
    detail: "detail-menu/detail-chineseFood.html", ongkir: "Rp2.000 sekitar Telkom",
    label: "Rp2.000 sekitar Telkom", gratis: false
  },
  {
    nama: "Kantin Pahlawan", kontak: "+62 895-1814-6988", wilayah: "Sukapura",
    gambar: "images/kantinPahlawan.jpeg", poster: "images/kantinPahlawan.jpeg",
    detail: "detail-menu/detail-kantinPahlawan.html", ongkir: "Gratis ongkir semua daerah",
    label: "Gratis ongkir semua daerah", gratis: true
  }
];

function kartuGerai(item) {
  const labelClass = item.gratis ? "fee-label" : "fee-label paid";

  return `<article class="store-card">
      <a href="${item.detail}">
          <img class="store-card-image" src="${item.gambar}"
              alt="Gambar ${item.nama}" loading="lazy">
          <div class="store-card-body">
              <p class="eyebrow">GERAI PILIHAN</p>
              <h2>${item.nama}</h2>
              <p class="store-location">${item.wilayah}</p>
              <span class="${labelClass}">${item.label}</span>
              <div class="card-link">
                  <span>Lihat detail gerai</span><span>↗</span>
              </div>
          </div>
      </a>
  </article>`;
}

function kartuMenu(item) {
  return `<article class="menu-card">
      <a href="${item.detail}">
          <img class="menu-card-image" src="${item.poster}"
              alt="Poster menu ${item.nama}" loading="lazy">
          <div class="menu-card-body">
              <p class="eyebrow">MENU DAN HARGA</p>
              <h3>${item.nama}</h3>
              <p class="store-location">Buka detail untuk melihat poster menu.</p>
              <div class="card-link">
                  <span>Lihat menu</span><span>↗</span>
              </div>
          </div>
      </a>
  </article>`;
}

function renderGerai(data, targetId, emptyId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = data.map(kartuGerai).join("");

  if (emptyId) {
    const empty = document.getElementById(emptyId);
    empty.hidden = data.length > 0;
    target.hidden = data.length === 0;
  }
}

function renderMenu(data) {
  const target = document.getElementById("menu-track");
  if (target) {
    target.innerHTML = data.map(kartuMenu).join("");
  }
}

function renderTabelOngkir() {
  const body = document.getElementById("tabel-ongkir-body");
  if (!body) return;

  body.innerHTML = dataLayanan.map(item => `<tr>
      <td>${item.nama}</td>
      <td>${item.ongkir}</td>
      <td class="jam-buka">Isi jam buka</td>
      <td class="jam-tutup">Isi jam tutup</td>
      <td><a href="${item.detail}">Detail gerai ↗</a></td>
  </tr>`).join("");
}

async function fetchData() {
  const loading = document.getElementById("api-loading");
  const error = document.getElementById("api-error");
  const list = document.getElementById("api-list");

  if (!loading || !error || !list) return;
  loading.hidden = false;
  error.hidden = true;
  list.innerHTML = "";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const data = await response.json();

    list.innerHTML = data.slice(0, 5).map(item => `
          <article class="api-card" data-api-id="${item.id}">
              <h3>${item.title}</h3>
              <p>${item.body}</p>
          </article>
      `).join("");

    loading.hidden = true;

  } catch (err) {
    loading.hidden = true;
    error.hidden = false;

    console.error("Terjadi kesalahan:", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderMenu(dataLayanan);
  renderGerai(dataLayanan, "daftar-gerai", "empty-state");
  renderTabelOngkir();

  const search = document.getElementById("cari-layanan");

  if (search) {
    search.addEventListener("input", function () {
      const term = search.value.toLowerCase().trim();

      const result = dataLayanan.filter(item =>
        item.nama.toLowerCase().includes(term) ||
        item.wilayah.toLowerCase().includes(term) ||
        item.ongkir.toLowerCase().includes(term)
      );

      renderGerai(result, "daftar-gerai", "empty-state");
    });
  }
  const clear = document.getElementById("hapus-pencarian");

  if (clear && search) {
    clear.addEventListener("click", () => {
      search.value = "";
      renderGerai(dataLayanan, "daftar-gerai", "empty-state");
      search.focus();
    });
  }

  document.querySelectorAll("[data-scroll]").forEach(button =>
    button.addEventListener("click", () => {
      const track = document.getElementById(button.dataset.scroll);

      track.scrollBy({
        left: Number(button.dataset.direction) * track.clientWidth * .8,
        behavior: "smooth"
      });
    })
  );

  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");

      navToggle.setAttribute("aria-expanded", String(opened));
      navToggle.setAttribute(
        "aria-label",
        opened ? "Tutup navigasi" : "Buka navigasi"
      );
    });
  }

  const retry = document.getElementById("api-retry");
  if (retry) {
    retry.addEventListener("click", fetchData);
  }

  fetchData();
});