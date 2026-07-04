// list_menu.js

// 1. Import konfigurasi database Anda (pastikan path '../' atau './' nya benar)
import { db } from './firebase-config.js'; 
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// 2. Buat array kosong dan di-export agar bisa dipakai di file lain
export let menu_list = [];

// 3. Buat fungsi khusus untuk mengambil data
export async function ambilDataMenu() {
    try {
        // Mengosongkan array terlebih dahulu agar data tidak dobel (menumpuk) jika fungsi ini dipanggil lebih dari sekali
        menu_list.length = 0; 

        // Meminta data dari koleksi "menus"
        const querySnapshot = await getDocs(collection(db, "menus"));
        
        // Memasukkan setiap baris data dari database ke dalam array
        querySnapshot.forEach((doc) => {
            // doc.data() berisi objek yang kita kirim dari form HTML sebelumnya
            menu_list.push(doc.data());
        });

        console.log("Sukses mengambil data!", menu_list);
        return "berhasil";

    } catch (error) {
        console.error("Gagal mengambil menu dari database:", error);
        return "gagal";
    }
}
