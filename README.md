# CourseHub

# Переглянути проект https://course-dnyduq6ea-annelis-projects-d302cb2b.vercel.app/login

CourseHub — це повноцінна full-stack платформа для управління курсами, створена на основі **React + TypeScript (frontend)** та **NestJS (backend)**.

Проєкт включає:
- Авторизацію та реєстрацію користувачів
- Ролі користувачів (admin / user)
- Список курсів + детальна сторінка курсу
- CRUD-операції для курсів (admin)
- API на NestJS із валідацією та обробкою помилок
- Акуратну структуру проєкту та чистий код

---

## 🚀 Технології

### **Frontend**
- React
- TypeScript
- Vite
- React Router
- Fetch API
- Context API (Auth)

### **Backend**
- NestJS
- TypeScript
- JWT аутентифікація
- File-based JSON storage (mock database)
- Swagger API

---

## 📁 Структура проєкту

CourseHub/
    frontend/
        src/
        public/
        package.json
        backend/
        src/
        bd/
        package.json
        README.md
        LICENSE
        .gitignore


---

## 🛠️ Установка та запуск

### 1. Клонувати репозиторій

git clone https://github.com/your-username/CourseHub.git

cd CourseHub


---

## 🖥️ Запуск backend (NestJS)

cd backend
npm install
npm run start:dev


За замовчуванням бекенд працює на: http://localhost:4000



Swagger документація: http://localhost:4000/api




## 🌐 Запуск frontend (React + Vite)

cd frontend
npm install
npm run dev

Фронтенд буде доступний на: http://localhost:5173


## 🔐 Дані для входу

### **Admin**

email: admin@example.com

password: admin


### **User**

email: user@example.com

password: user


(Дані можуть змінюватися залежно від файлу `bd/users.json`.)



## 📚 Основні можливості

### 👤 **Авторизація**
- Реєстрація нового користувача
- Вхід / вихід
- Зберігання токена в localStorage

### 📘 **Курси**
- Перегляд списку всіх курсів
- Перегляд детальної інформації про курс
- Пошук та фільтрація (опціонально)

### 🔧 **Admin функції**
- Створення нового курсу
- Редагування курсу
- Видалення курсу



## 🧩 API ендпоінти (backend)

- `POST /login`
- `POST /register`
- `GET /courses/all`
- `GET /courses/:id`
- `POST /courses/add` (admin)
- `PUT /courses/:id` (admin)
- `DELETE /courses/:id` (admin)

## 📸 Скриншоти


![photo_![photo_2025-12-20_07-44-57](https://github.com/user-attachments/assets/7d3faf52-322a-497c-bdff-a66f3a02c9f9)
![photo_2025-12-20_07-45-07](https://github.com/user-attachments/assets/0fc4fa13-5b75-47b7-8c1b-4e49854bc51f)
2025-12-22_11-35-29](https://github.com/user-attachments/assets/4e3ada3f-fd16-4400-acc1-f555a8b0bfaa)
![photo_2025-12-20_07-45-10](https://github.com/user-attachments/assets/1f00a70f-d714-4582-9f44-91b67edb630e)
![photo_2025-12-20_07-45-05](https://github.com/user-attachments/assets/c28dd8f5-9f5a-4b17-bf4b-9c4215388ec6)


## 📄 License

This project is proprietary.
All rights reserved.

The source code is provided for viewing and evaluation purposes only.
Unauthorized use, copying, or distribution is prohibited.
