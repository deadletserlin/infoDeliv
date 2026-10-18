
const dataLayanan = [
    {
        nama: "Warung Sugema",
        kontak: "0813-1605-093",
        wilayah: "Bandung",
        gambar: "images/sugema.png",
        detail: "detail-menu/detail-sugema.html"
    },
    {
        nama: "Lestari",
        kontak: "0813-1330-8864",
        wilayah: "Bandung",
        gambar: "images/lestari.png",
        detail: "detail-menu/detail-lestari.html"
    },
    {
        nama: "Dongmoon",
        kontak: "0851-2104-0012",
        wilayah: "Bandung, Jakarta",
        gambar: "images/dongmoon.jpeg",
        detail: "detail-menu/detail-dongmoon.html"
    }
];

function tampilkanLayanan(data) {
    const tabel = document.getElementById("daftar-layanan");
    const jumlah = document.getElementById("jumlah-layanan");

    tabel.innerHTML = "";

    if (data.length === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="6">Layanan tidak ditemukan.</td>
            </tr>
        `;
    } else {
        for (let i = 0; i < data.length; i++) {
            tabel.innerHTML += `
                <tr>
                    <td>${data[i].nama}</td>
                    <td>
                        <img src="${data[i].gambar}"
                             alt="Menu ${data[i].nama}"
                             width="100">
                    </td>
                    <td>Delivery</td>
                    <td>${data[i].kontak}</td>
                    <td>${data[i].wilayah}</td>
                    <td>
                        <a href="${data[i].detail}">Lihat Detail</a>
                    </td>
                </tr>
            `;
        }
    }

    jumlah.textContent = "Jumlah layanan: " + data.length;
}

document.addEventListener("DOMContentLoaded", function () {
    tampilkanLayanan(dataLayanan);

    const pencarian = document.getElementById("cari-layanan");

    pencarian.addEventListener("input", function () {
        const kataKunci = pencarian.value.toLowerCase();

        const hasilFilter = dataLayanan.filter(function (layanan) {
            return layanan.nama.toLowerCase().includes(kataKunci);
        });

        tampilkanLayanan(hasilFilter);
    });
});

$(document).ready(function () {
    $("#tombol-form").on("click", function () {
        $("#area-form").slideToggle();

        if ($(this).text() === "Tampilkan Form") {
            $(this).text("Sembunyikan Form");
        } else {
            $(this).text("Tampilkan Form");
        }
    });

    $("#form-layanan").on("submit", function (event) {
        event.preventDefault();

        const nama = $("#nama-layanan").val().trim();
        const kontak = $("#kontak-layanan").val().trim();
        const wilayah = $("#wilayah-layanan").val().trim();

        if (nama === "" || kontak === "" || wilayah === "") {
            $("#pesan-form").text("Semua kolom harus diisi.");
            return;
        }

        const layananBaru = {
            nama: nama,
            kontak: kontak,
            wilayah: wilayah,
            gambar: "",
            detail: "#"
        };

        dataLayanan.push(layananBaru);
        tampilkanLayanan(dataLayanan);

        $("#cari-layanan").val("");
        $("#form-layanan")[0].reset();
        $("#pesan-form").text("Layanan berhasil ditambahkan.");

        $("#area-form").slideUp();
        $("#tombol-form").text("Tampilkan Form");
    });
});
