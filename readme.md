### Fullstack Assignment 8 - Blood Donation Application

# Live link: https://blood-donation-hub.vercel.app

### Technologies:

- Typescript
- Node.js
- Express.js
- Prisma and PostgreSQL
- JWT

## Instruction to run the application local

- Step 1: create a `.env` file at root of the directory and include the environment variables as following bellow

  ```bash
    NODE_ENV=prod

    PORT=8000

    JWT_ACCESS_SECRET=4d1216db387c24a42ce2f1f9dbbf106fc5011660b107d988202d47016cf4f7fc14dfa677a4c5a504b96f86cdece62e7bfd19246de25d6840126edb4a4a1587a0

    DATABASE_URL=postgres://postgres.voczdhigqqtcrymmonnf:Ph2fb5M_$s_yT~y@aws-0-ap-southeast-1.poolersupabase.com:6543/postgres?pgbouncer=true&connection_limit=1

    DIRECT_URL=postgres://postgres.voczdhigqqtcrymmonnf:Ph2fb5M_$s_yT~y@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
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

### Features

1. User registration - User can register a new account
2. User login - User can login into their existing account with email and password
3. Get all donar list with filter, search, pagination and sorting
4. Request for blood by user as a donar
5. Get All of my donation request
6. Update donation request status
7. Get my profile
