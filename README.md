# AccelKeys 🚀
A full-stack typing practice web app showcasing **secure JWT authentication** with Spring Boot, React, and MySQL.  

---

## 🔧 How to Run  

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/accelkeys.git
cd accelkeys

**Backend (Spring Boot)**
cd backend
# Configure database in src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/accelkeys
spring.datasource.username=your-username
spring.datasource.password=your-password

./mvnw spring-boot:run
Runs on: http://localhost:8080


**Frontend (React + Vite)**
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173
