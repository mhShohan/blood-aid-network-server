### Blood Aid Network (server)

The Blood Donation website is a user-centric platform designed to facilitate blood donations by connecting donors with recipients. It includes features for searching and filtering donors, detailed donor profiles, user account management, and administrative tools for overseeing site activity and user accounts. The aim is to promote and streamline the process of blood donation, ensuring that those in need can easily find willing donors and that the donation process is secure, efficient, and user-friendly.

# Live link: https://blood-aid-network.vercel.app

# Server link: https://blood-aid-network-server.vercel.app

### Technologies:

- Typescript
- Node.js
- Express.js
- PostgreSQL
- Prisma
- JWT

### Features

- User registration and login
- Search for blood donors by location and blood type
- Send blood request and View all blood requests
- User profile management (view, edit and change password)
- Donation history tracking and view your incoming blood requests
- Admin dashboard for managing users and update users status and role
- Mobile-friendly responsive design
- Secure authentication and data encryption

## Instruction to run the application local

- Step 1: create a `.env` file at root of the directory and include the environment variables as following bellow

  ```bash
    NODE_ENV=dev
    PORT=8000
    JWT_ACCESS_SECRET="4d1216db387c24a42ce2f1f9dbbf106fc5011660b107d988202d47016cf4f7fc14dfa677a4c5a504b96f86cdece62e7bfd19246de25d6840126edb4a4a1587a0"

    SUPABASE_PASS=9zRf84HEFPYYrjLs
    BLOOD_DONATION_PASS=rpCH7S2fIm896iQ0


    # Connect to Supabase via connection pooling with Supavisor.
    DATABASE_URL="postgres://postgres.gkhfwmeijcutxhzhtjge:rpCH7S2fIm896iQ0@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

    # Direct connection to the database. Used for migrations.
    DIRECT_URL="postgres://postgres.gkhfwmeijcutxhzhtjge:rpCH7S2fIm896iQ0@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

  ```

- Step 2: install all the dependencies using the command
  ```bash
    npm install
  ```
- Step 3: run the development server using the command

  ```bash
    npm run dev
  ```

  or run the production server using the commands

  ```bash
    # at first build the production server
    npm run build

    #then
    npm start
  ```
