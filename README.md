---Prosty Notatnik - Company Notes App##

---

Built with:

Backend - Django

Frontend - React (Vite)

Database - SQLite

---Setup instructions:

git clone https://github.com/KarolinaSzerszen/Prosty_Notatnik.git

cd Prosty_Notatnik

---Backend setup:

cd backend

python -m venv venv

source venv/Scripts/activate (on Windows)
souce venv/bin/activate (on Mac and Linux)

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

---Frontend setup:

cd fronted

npm install

npm run dev
