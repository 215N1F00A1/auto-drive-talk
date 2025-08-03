# 📁 WhatsApp-Driven Google Drive Assistant (n8n Workflow)

https://auto-drive-talk.vercel.app/

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-Automation-blue.svg)](https://n8n.io/)
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-green.svg)](https://www.twilio.com/whatsapp)
[![Google Drive](https://img.shields.io/badge/Google_Drive-API-blue.svg)](https://developers.google.com/drive)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT-yellow.svg)](https://openai.com/)

A professional automation solution to control your Google Drive via **WhatsApp** using **Twilio**, **Google APIs**, and **n8n Workflows**. Users can issue text commands over WhatsApp to list, delete, move, and summarize files securely and intelligently.

---

## 🧠 Key Features

### Core Functions

* 📄 **List Files**: View contents of Google Drive folders
* 🗑️ **Delete Files**: Remove files securely (with confirmation)
* 📁 **Move Files**: Organize Drive by moving files/folders
* 🧠 **Summarize Docs**: Summarize content of PDFs or DOCs using OpenAI
* 🔁 **Dynamic Responses**: Replies with formatted drive data in WhatsApp

### Enhancements

* ✅ Confirmation prompts for destructive actions
* 🔐 Secure OAuth2 auth for Google Drive
* 📩 WhatsApp replies powered by Twilio sandbox
* 💬 Command parser to handle structured input
* 🧾 Simple audit log system (in-memory or optional DB)

---

## 🔧 Setup Instructions

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/auto-drive-talk.git
cd auto-drive-talk
```

### 2. Install Dependencies

```bash
bun install  # or npm install
```

### 3. Configure Environment Variables

> Copy `.env-sample` into `.env` and fill your values:

```bash
cp .env-sample .env
```

```env
# Twilio WhatsApp Sandbox
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5678/rest/oauth2-credential/callback

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# n8n Config
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=securepassword
N8N_PORT=5678
```

---

## 📱 WhatsApp Commands (via Twilio)

| Command                       | Function                      |
| ----------------------------- | ----------------------------- |
| `LIST /MyDocs`                | Lists files in /MyDocs folder |
| `DELETE /Old/report.pdf`      | Deletes specified file        |
| `MOVE /Doc/file.txt /Archive` | Moves file to Archive         |
| `SUMMARY /Notes`              | Summarizes documents inside   |

> Twilio webhook configured to receive and parse messages.

---

## 🐳 Running Locally

### Using Docker Compose

```bash
docker-compose up -d
```

### Without Docker (for testing only)

```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  --env-file .env \
  n8nio/n8n
```

Use [ngrok](https://ngrok.com/) to expose your local n8n:

```bash
ngrok http 5678
```

Set Twilio webhook to:

```
https://your-ngrok-url/webhook/whatsapp
```

---

## 🧪 Demo Behavior

* Simulated Drive with mock files (if no real API configured)
* Simulated OpenAI summaries (demo mode)
* WhatsApp command testing UI (in `src/`)
* Dark Mode + Shadcn UI via Vite frontend (optional)

---

## 🏗️ File Structure

```
root/
├── src/                   # Optional frontend helpers
├── workflow.json          # n8n workflow export (core logic)
├── .env-sample            # Environment template
├── docker-compose.yml     # Docker runner
└── README.md              # This file
```

---

## 🔒 Security

* OAuth2 scopes restricted to Google Drive file access
* Twilio auth token validated before processing
* `.env` ignored from version control
* Admin credentials protected via n8n basic auth

---

## 🧠 Future Ideas

* Real-time Google Drive sync feedback
* Voice message parsing via WhatsApp
* Multi-user support with access control
* Persistent file history and audit log (Supabase)

---

## 📜 License

MIT License. Use at your own risk. Contact court authorities before automating public portals.

---

## 🙋 Author & Acknowledgments

Created with ❤️ by **\[Your Name]** as part of the ADmyBRAND Internship Task 2.
📧 Email: [your.email@example.com](mailto:your.email@example.com)
🙏 Thanks to **n8n**, **Twilio**, **OpenAI**, and **Google APIs** teams.
