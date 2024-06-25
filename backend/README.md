English or Portuguese translate

# Welcome

This is a login system using Microservices.

## Simple Example of Utility

To configure the server, you will need:

### 1. Create the Database

The database schema is located in the `/models/schema.sql` folder.
You can change the database access details in the file located at `/models/db.js`.

### 2. Install Packages in the Backend Folder

Run the following command to install the packages:
`npm install`

After installing the packages, execute:
`npm run createAdmin` This command is used to run the server for the first time when there is no admin in the database.

Default Credentials:
`email = 'admin@example.com';`
`password = 'admin123';`

To start the server using nodemon, execute: 
`npm start` This command is used when there is already an admin saved in the database.

By default, the service will start at `https://localhost:3001/` and can be changed in `/backend/server.js`.

### 3. Install Packages in the Frontend Folder

Run the following command to install the packages:
`npm install`

By default, the service will start at `https://localhost:3000/`.

### 4. Done

The system is now ready to use.

------------------------------------------------------------

# Olá,
Esse é um sistema de login utilizando Micro Serviços.

## Um simples exemplo de utilidade,
Para configurar o servidor você precisará:

### 1. Criar o banco de dados
O schema do banco esta na pasta /models/schema.sql
Você pode alterar os dados de acesso ao bancos de dados no arquivo em /models/db.js

### 2. Instalar os pacotes na pasta backend

Utilize `npm install`

Após a instalação dos pacotes, faça:
`npm run createAdmin` para rodar o servidor pela primeira vez não tendo nenhum admin no banco

Login padrão:
`email = 'admin@example.com';`
`senha = 'admin123';`

`npm start` para rodar o servidor nodemon, se já tiver um admin salvo ao database.

Por padrão, o serviço inicializará em https://localhost:3001/ e pode ser alterador em /backend/server.js

### 3. Instalar os pacotes na pasta frontend
        Utilize npm install

        Por padrão, o serviço inicializará em https://localhost:3001/ e pode ser alterador em /backend/server.js

### 4. Pronto. O sistema já esta disponivel para o uso.




