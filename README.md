# Gemini AI Chatbot — Project Sesi 3 (Hacktiv8)

Chatbot sederhana berbasis **Node.js + Express** (backend) dan **Vanilla JavaScript** (frontend), terintegrasi dengan **Google Gemini AI API**.

## 1. Persiapan

Pastikan sudah terinstall:
- Node.js v18+ (`node -v` untuk cek)
- VS Code
- API key Gemini dari https://aistudio.google.com/

## 2. Install dependency

Buka folder project ini di terminal, lalu jalankan:

```bash
npm install
```

Ini akan menginstall: `express`, `dotenv`, `cors`, `@google/genai`.

## 3. Setup API Key

1. Salin file `.env.example` menjadi `.env`
2. Isi `GEMINI_API_KEY` dengan API key kamu:

```
GEMINI_API_KEY=isi_api_key_kamu_disini
PORT=3000
```

> `.env` sengaja sudah dimasukkan ke `.gitignore` — jangan pernah upload API key ke GitHub.

## 4. Jalankan aplikasi

```bash
npm start
```

Lalu buka browser ke: **http://localhost:3000**

## 5. Struktur project

```
gemini-chatbot-api/
├── index.js          # Backend Express + endpoint /api/chat
├── package.json
├── .env.example       # Contoh isi .env (copy jadi .env)
├── .gitignore
└── public/
    ├── index.html     # UI chatbot
    ├── style.css
    └── script.js      # Logic fetch ke backend
```

## 6. Kustomisasi (sesuai instruksi tugas)

Bagian ini yang bisa kamu ubah sesuai kreativitas kamu untuk memenuhi instruksi
"use case dan konfigurasi parameter sesuai kreativitas masing-masing":

- **`SYSTEM_INSTRUCTION`** di `index.js` → ubah persona chatbot (misalnya jadi
  customer service bot, education bot, travel assistant, dll).
- **`temperature`, `topP`, `topK`** di `index.js` → atur tingkat kreativitas
  jawaban (temperature tinggi = lebih kreatif, rendah = lebih presisi/faktual).
- **Tampilan** di `style.css` / `index.html` → ubah warna, judul, layout sesuai selera.

## 7. Testing API (opsional, pakai Postman)

- Method: `POST`
- URL: `http://localhost:3000/api/chat`
- Body → raw → JSON:

```json
{
  "conversation": [
    { "role": "user", "text": "Halo, siapa kamu?" }
  ]
}
```

Response yang diharapkan:

```json
{ "result": "..." }
```

## 8. Submit ke GitHub (sesuai instruksi pengumpulan tugas)

```bash
git init
git add .
git commit -m "Implementasi endpoint Gemini AI API"
git branch -M main
git remote add origin https://github.com/username-kamu/nama-repo-kamu.git
git push -u origin main
```

Lalu kumpulkan:
- URL repository GitHub
- Screenshot User Interface chatbot

ke form pengumpulan tugas yang diberikan panitia.

**Catatan penting:** karena `.env` sudah masuk `.gitignore`, API key kamu tidak
akan ikut ter-push ke GitHub — itu memang benar dan aman.
