# AccelKeys - Typing Website (Full Stack Project)

This project demonstrates a typing practice application built with
- Backend Spring Boot with JWT authentication
- Frontend React (Vite)
- Database MySQL (via JPAHibernate)

## Setup Instructions

### Backend
1. Clone the repository and navigate to the `backend` folder.
2. Update the database connection in `srcmainresourcesapplication.properties`

   ```properties
   spring.datasource.url=jdbcmysqllocalhost3306yourdbname
   spring.datasource.username=yourusername
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
