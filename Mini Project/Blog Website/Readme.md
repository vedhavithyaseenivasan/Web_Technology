
# 📝 Blog Website – Web Technology Mini Project

This is a mini project developed as part of the **Web Technology** course at **Kongu Engineering College**, using HTML, CSS, JavaScript, and Node.js with MongoDB. The system allows users to explore blog content and provides admin functionality to manage blogs (Create, Read, Update, Delete).

---

## 👩‍💻 Project Developed By
**Vedhavithya S**  
Department of Information Technology  
Kongu Engineering College  

---

## 🔗 GitHub Repository
[https://github.com/vedhavithyaseenivasan/Web_Technology](https://github.com/vedhavithyaseenivasan/Web_Technology)

---

## 🌐 Features

### 🧭 User View:
- Home page displaying different blog categories (with background images).
- View more details for each blog like:
  - Travel and Adventure
  - Education and Learning
  - Health and Wellness, etc.
- About Us and Contact pages.

### 🛠️ Admin Functionalities (via `employee.html`):
- **Insert** – Add new blog entries with author, title, date, and content.
- **Update** – Modify existing blog titles.
- **Delete** – Remove blog posts by author name.
- **Display** – View all stored blog data in tabular format.

---

## 💻 Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (HTTP Module)
- **Database**: MongoDB
- **Hosting**: Localhost (Port: 7050)

---
## 📁 Project Structure
Web_Technology/
│
├── home.html # Main blog landing page
├── about.html # About the blog site
├── contact.html # Contact form
├── employee.html # Admin panel (Insert, Delete, Update, Display)
├── empdb.js # Node.js backend with MongoDB logic
├── Various category pages like ta.html, el.html, etc.
├── Images and assets (e.g., tg1.webp, b10.png)

---
## How to run

- Make sure MongoDB is running on localhost:27017.
- Run the server:
  ```bash
  node empdb.js
  
- Open home.html in a browser.
- Use employee.html to manage blog entries.


