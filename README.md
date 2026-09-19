# Gemini AI Chatbot

Project chatbot sederhana yang menghubungkan frontend Vanilla JavaScript dengan
Google Gemini AI melalui backend Node.js dan Express. Pengguna dapat mengirim
pesan melalui antarmuka web, kemudian server meneruskan riwayat percakapan ke
Gemini dan menampilkan jawabannya kembali di halaman chatbot.

## Fitur

- Antarmuka chatbot berbasis HTML, CSS, dan Vanilla JavaScript.
- Percakapan dikirim ke backend melalui endpoint `POST /api/chat`.
- Riwayat pesan dipertahankan selama halaman masih terbuka.
- Backend menyajikan file frontend dari folder `public`.
- API key Gemini disimpan di environment variable, bukan di dalam source code.
- Parameter model dapat dikonfigurasi untuk mengatur gaya respons AI.

## Teknologi yang Digunakan

- **Node.js**: runtime JavaScript untuk menjalankan server.
- **Express**: framework HTTP untuk membuat server dan endpoint API.
- **Google GenAI SDK**: library untuk memanggil Gemini API.
- **Vanilla JavaScript**: mengatur interaksi dan komunikasi frontend dengan API.
- **dotenv**: membaca konfigurasi dari file `.env`.
- **CORS**: mengaktifkan dukungan Cross-Origin Resource Sharing.

## Persiapan

Pastikan sudah terpasang:

- Node.js versi 18 atau lebih baru
- npm
- API key Gemini dari [Google AI Studio](https://aistudio.google.com/)

## Instalasi dan Konfigurasi

1. Buka terminal di folder project.
2. Install dependency:

   ```bash
   npm install
   ```

3. Buat file `.env` di root project, sejajar dengan `index.js`:

   ```env
   GEMINI_API_KEY=isi_api_key_kamu
   PORT=3000
   ```

File `.env` sudah tercantum di `.gitignore`, sehingga API key tidak ikut
ter-upload ke GitHub. Jangan membagikan isi file tersebut.

## Menjalankan Aplikasi

Untuk menjalankan server:

```bash
npm start
```

Mode development dengan restart otomatis saat file berubah:

```bash
npm run dev
```

Setelah server berjalan, buka [http://localhost:3000](http://localhost:3000)
di browser.

## Struktur Project

```text
gemini-chatbot-api/
├── index.js          # Server Express dan endpoint Gemini
├── package.json      # Konfigurasi project dan dependency
├── package-lock.json # Versi dependency yang terkunci
├── .env              # API key dan konfigurasi lokal, tidak di-upload
├── .gitignore        # Daftar file yang diabaikan Git
└── public/
    ├── index.html    # Struktur halaman chatbot
    ├── style.css     # Tampilan chatbot
    └── script.js     # Logika interaksi dan request API
```

## Penjelasan Backend: `index.js`

### 1. Import library dan konfigurasi server

```js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
```

`dotenv/config` membaca file `.env`. Express digunakan untuk membuat server,
CORS untuk middleware cross-origin, dan `GoogleGenAI` untuk berkomunikasi dengan
Gemini.

Server menggunakan nilai `PORT` dari `.env`. Jika tidak tersedia, server
menggunakan port `3000`:

```js
const PORT = process.env.PORT || 3000;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```

### 2. Middleware

```js
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
```

- `cors()` mengizinkan request dari origin lain.
- `express.json()` membaca body request dalam format JSON.
- `express.static()` membuat file di folder `public` dapat diakses browser.

### 3. Instruksi sistem

Konstanta `SYSTEM_INSTRUCTION` menentukan karakter chatbot: ramah, sopan,
membantu, dan jujur ketika tidak mengetahui jawaban. Instruksi ini dikirim ke
Gemini pada setiap request dan dapat diubah sesuai kebutuhan use case.

### 4. Endpoint `POST /api/chat`

Endpoint menerima body JSON dengan format:

```json
{
  "conversation": [
    { "role": "user", "text": "Halo, siapa kamu?" },
    { "role": "model", "text": "Saya asisten AI." }
  ]
}
```

Server kemudian:

1. Memastikan `conversation` berbentuk array.
2. Mengubah setiap pesan ke format `contents` yang dipahami Gemini.
3. Memanggil `ai.models.generateContent()` dengan model `gemini-3.6-flash`.
4. Mengatur parameter respons melalui `temperature`, `topP`, dan `topK`.
5. Mengembalikan jawaban dalam format `{ "result": "..." }`.

Jika input tidak valid, server mengembalikan status `400`. Jika terjadi error
saat menghubungi Gemini, server mengembalikan status `500`.

## Penjelasan Frontend

### `public/index.html`

File ini membuat struktur halaman yang terdiri dari judul, area chat dengan id
`chat-box`, input pesan dengan id `user-input`, dan form `chat-form`. File
`style.css` dan `script.js` dimuat di halaman ini.

### `public/script.js`

File ini menyimpan riwayat chat dalam array `conversation`. Saat form dikirim:

1. Input kosong diabaikan.
2. Pesan pengguna ditampilkan dan dimasukkan ke `conversation`.
3. Browser mengirim request `POST` ke `/api/chat` menggunakan `fetch`.
4. Pesan sementara `Gemini is thinking...` diganti dengan hasil dari server.
5. Jawaban model dimasukkan kembali ke riwayat agar percakapan tetap memiliki
   konteks pada request berikutnya.

Fungsi `appendMessage()` membuat elemen pesan baru, memberi class sesuai role,
dan otomatis menggulir area chat ke pesan terbaru.

### `public/style.css`

File ini mengatur tampilan container chatbot, area percakapan, pesan pengguna,
pesan bot, input, serta tombol kirim.

## Pengujian API dengan Postman

- Method: `POST`
- URL: `http://localhost:3000/api/chat`
- Header: `Content-Type: application/json`
- Body: `raw` dengan format JSON

```json
{
  "conversation": [
    { "role": "user", "text": "Jelaskan JavaScript secara singkat." }
  ]
}
```

Respons berhasil memiliki format:

```json
{
  "result": "JavaScript adalah ..."
}
```


