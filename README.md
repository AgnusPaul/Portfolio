# ✦ Agnus Paul — Portfolio
### A luxe editorial Flask portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Replit-blue?logo=replit)](https://web-host-hub--agnuspaul162.replit.app/)

---

## 🌐 Live Demo
Your Flask portfolio is publicly available at:

`https://web-host-hub--agnuspaul162.replit.app/`

---

## 📁 Project Structure

```
portfolio/
├── app.py                  ← Flask routes + data
├── requirements.txt
├── templates/
│   └── index.html          ← Main page template
└── static/
    ├── css/
    │   └── style.css       ← All styles
    ├── js/
    │   └── main.js         ← Cursor, animations, form
    └── images/
        └── (put profile.jpg here)
```

---

## 🚀 Setup & Run

```bash
# 1. Create & activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
python app.py
```

Then open **http://localhost:5000** in your browser.

---

## ✏️ Customise Your Portfolio

### 1. Personal Info
Edit `app.py` to update:
- **PROJECTS** — your project list (title, category, description, tech, year)
- **SKILLS** — name + level (0–100)
- **TIMELINE** — year, role, company, description

### 2. Your Name & Bio
Open `templates/index.html` and search for `Agnus Paul` — replace with your own name if needed.
Update the bio text in the `<!-- ABOUT -->` section.

### 3. Your Photo
Drop your photo at `static/images/profile.jpg`

Then in `index.html`, replace the placeholder block:
```html
<div class="portrait-placeholder">...</div>
```
with:
```html
<img src="{{ url_for('static', filename='images/profile.jpg') }}" alt="Your Name" style="width:100%;height:100%;object-fit:cover;" />
```

### 4. Contact Form (Email)
In `app.py`, the `/contact` route currently prints to console.
To actually send emails, add SMTP code inside that route:

```python
import smtplib
from email.mime.text import MIMEText

msg = MIMEText(f"From: {name} <{email}>\n\n{message}")
msg['Subject'] = f"Portfolio Contact from {name}"
msg['From'] = "your@gmail.com"
msg['To'] = "your@gmail.com"

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login("your@gmail.com", "your_app_password")
    server.send_message(msg)
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a0906` |
| Gold | `#c9a96e` |
| Cream | `#f0e8d8` |
| Display Font | Bebas Neue |
| Serif Font | Cormorant Garamond |
| Mono Font | DM Mono |

---

Built with Flask · Designed for impact.
