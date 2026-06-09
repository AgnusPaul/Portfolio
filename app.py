from flask import Flask, render_template, request, jsonify
import smtplib
from datetime import datetime

app = Flask(__name__)

PROJECTS = [
    {
        "id": "01",
        "title": "Calculator CLI",
        "category": "Python · CLI Tool",
        "description": "An advanced command-line calculator built with Python. Supports complex arithmetic operations, clean terminal UI, and is also deployed as a GitHub Pages demo.",
        "tech": ["Python", "HTML", "CLI", "GitHub Pages"],
        "year": "2026",
        "url": "https://github.com/AgnusPaul/Calculator-CLI"
    },
    {
        "id": "02",
        "title": "Data Analysis on CSV Files",
        "category": "Data Science · Python",
        "description": "End-to-end sales data analysis pipeline using Pandas. Loads, cleans, and explores CSV datasets to surface business insights through statistical summaries and visualisations.",
        "tech": ["Python", "Pandas", "CSV", "Data Analysis"],
        "year": "2026",
        "url": "https://github.com/AgnusPaul/Data-Analysis-on-CSV-files"
    },
    {
        "id": "03",
        "title": "REST API with Flask",
        "category": "Backend · Web Development",
        "description": "A fully functional REST API built with Flask. Implements standard CRUD endpoints, JSON request/response handling, and is served with a live GitHub Pages demo.",
        "tech": ["Python", "Flask", "REST API", "HTML"],
        "year": "2026",
        "url": "https://github.com/AgnusPaul/REST-API"
    },
    {
        "id": "04",
        "title": "To-Do List App",
        "category": "Python · Console App",
        "description": "A console-based task management application with full CRUD functionality — add, complete, and delete tasks — with a live web demo hosted on GitHub Pages.",
        "tech": ["Python", "HTML", "CLI", "GitHub Pages"],
        "year": "2026",
        "url": "https://github.com/AgnusPaul/To-Do-List"
    },
    {
        "id": "05",
        "title": "Web Scraper for News Headlines",
        "category": "Python · Web Scraping",
        "description": "Scrapes top headlines from news websites using Python and BeautifulSoup. Parses live HTML, extracts structured data, and outputs clean results to the terminal.",
        "tech": ["Python", "BeautifulSoup", "Web Scraping", "Requests"],
        "year": "2026",
        "url": "https://github.com/AgnusPaul/Web-Scraper-For-News-Headlines"
    },
]

SKILLS = [
    {"name": "Python", "level": 85},
    {"name": "Artificial Intelligence & GenAI", "level": 75},
    {"name": "Java", "level": 70},
    {"name": "Flutter / Mobile Dev", "level": 65},
    {"name": "C Programming", "level": 68},
    {"name": "Data Structures & Algorithms", "level": 60},
]

CERTS = [
    {"year": "2025", "title": "Generative AI Foundations", "org": "LinkedIn Learning"},
    {"year": "2025", "title": "Introduction to Generative AI", "org": "LinkedIn Learning"},
    {"year": "2025", "title": "Web Development Fundamentals", "org": "IBM SkillsBuild"},
    {"year": "2024", "title": "Python Essentials 1", "org": "Cisco Networking Academy"},
    {"year": "2024", "title": "JavaScript Essentials 1", "org": "Cisco Networking Academy"},
]

@app.route("/")
def index():
    return render_template("index.html",
        projects=PROJECTS,
        skills=SKILLS,
        certs=CERTS,
        year=datetime.now().year
    )

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    print(f"[CONTACT] From: {name} <{email}>\nMessage: {message}")
    return jsonify({"success": True, "message": "Message received. I'll get back to you shortly!"})

if __name__ == "__main__":
    app.run(debug=True)
