// Import koneksi db dari file config Anda
        import { db } from '../firebase-config.js'; 
        import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

        const formMenu = document.getElementById('form_menu');
        const btnSubmit = document.getElementById('btn_submit');

        formMenu.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            btnSubmit.innerText = "Mengirim...";
            btnSubmit.disabled = true;

            try {
              const isTop = document.getElementById("top").checked;
              let ketAman = document.getElementById("new_keterangan").value;
              if (document.getElementById("new_keterangan").value === ""){
                ketAman = "~";
              };
                // Mengirim ke koleksi bernama 'menus'
                await addDoc(collection(db, "menus"), {
                    nama: document.getElementById("new_nama").value,
                    harga: document.getElementById("new_harga").value+"K",
                    keterangan: ketAman,
                    kategori: document.getElementById("kategori").value,
                    top: isTop ? "Best Seller" : ""
                });

                alert("Data berhasil masuk!");
                formMenu.reset();
            } catch (error) {
                alert("Gagal: " + error.message);
            } finally {
                btnSubmit.innerText = "Simpan ke Firestore";
                btnSubmit.disabled = false;
                renderKartuOtomatis();
            }
        });

        // display.js

// 1. Import data dan fungsi dari file list_menu.js Anda
import { menu_list, ambilDataMenu } from './list_menu.js';

// Ambil elemen wadah dari HTML
const container = document.getElementById("card-menu");
let status = ""
let menu_filter =[];
const pilih_kat = document.getElementById("filter_kat");
async function renderKartuOtomatis() {
    container.innerHTML = "<p>Memuat menu dari database...</p>";

    // 2. Tunggu sampai data dari Firestore masuk semua ke dalam array menu_list
    status = await ambilDataMenu();

    if (status === "berhasil") {
        // Kosongkan tulisan loading
        container.innerHTML = "<p>berhasil memuat</p>";
        // 3. Looping array untuk membuat string HTML div.card secara otomatis
         // Menggabungkan kumpulan kartu menjadi satu string teks HTML utuh
        const kategori_total = new Set(menu_list.map(item => item.kategori)).size;
        // 4. Masukkan seluruh kartu yang sudah terbuat otomatis ke dalam wadah HTML
        
        document.getElementById("total-menu").innerText = menu_list.length + "menu";
        document.getElementById("total-kategori").innerText = kategori_total + "kategori";
        menu_filter = menu_list;
        filter_menu();
    } else {
        container.innerHTML = "<p>Gagal memuat data menu. Silakan periksa koneksi Anda.</p>";
    }
}
if (pilih_kat){
    pilih_kat.addEventListener('change', function(kat){
            const menu_dipilih = kat.target.value;
            if(menu_dipilih === "ALL"){
                menu_filter = menu_list;
            } else{
            menu_filter = menu_list.filter(item => item.kategori === menu_dipilih);
            }
            filter_menu();
        });
};
// Jalankan fungsi otomatis saat file JS ini dimuat oleh browser
renderKartuOtomatis();
async function filter_menu(){
    if (menu_filter.length !== 0){
        container.innerHTML = "";
        const listKartuHTML = menu_filter.map((menu) => {

            // Return susunan struktur HTML kartu menu Anda
            return `
                <div class="card">
                <img loading="lazy" class="card-img" src="https://warasrest.pages.dev/assets/${menu.nama}.png" onerror="this.onerror=null; this.src='example.png';">
                <p class="card-txt">${menu.nama}<p/>
                <p class="card-muted">${menu.keterangan}<p/>
                <p class="card-harga">${menu.harga}<p/>
                <p class="card-kategori">${menu.kategori}<p/>
                <p class="card-best" style="display: ${(!menu.top || menu.top.trim() === "") ? "none" : "block"}">${menu.top}<p/>
                </div>
            `;
        }).join('');
        container.innerHTML = listKartuHTML;

    }
}


