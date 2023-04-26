# ORM-E-Commerce-Back-End

  ## Description

  This is the back end for an e-commerce site. Using Express.js, it creates a functional API to use Sequelize to interact with a MySQL database.

  ## Table of Contents
  
  - [Usage](#usage)
  - [Video](#video)
  - [Installation](#installation)
  - [License](#license)
  - [Questions](#questions)

  ## Usage

  * GIVEN a functional Express.js API, you can add your database name, MySQL username, and MySQL password to an environment variable file (.env)
  * THEN you are able to connect to a database using Sequelize.
  * WHEN you enter schema and seed commands
    ```bash
    SOURCE db/schema.sql;
    ```
    ```bash
    npm run seed
    ```
  * THEN a development database is created and is seeded with test data.
  * WHEN you enter the command to invoke the application
    ```bash
    node server.js
    ```
  * THEN your server is started and the Sequelize models are synced to the MySQL database.
  * WHEN you open API GET routes in Insomnia for categories, products, or tags
  * THEN the data for each of these routes is displayed in a formatted JSON.
  * WHEN you test API POST, PUT, and DELETE routes in Insomnia
  * THEN you are able to successfully create, update, and delete data in my database.

  ## Video

  Please have a look at the walkthrough video demonstrating the functionality of this Express.js API:

  Video link: https://drive.google.com/file/d/11q8AKeyiJNXyWKyENldVyd8hI3_V5ZN3/view
  
  ## Installation

  * [express](https://www.npmjs.com/package/express)
  * [MySQL2](https://www.npmjs.com/package/mysql2)
  * [Sequelize](https://www.npmjs.com/package/sequelize)
  * [dotenv](https://www.npmjs.com/package/dotenv)

  ## License

  N/A

  ## Questions

  If you have additional questions, feel free to reach me through github or email.

  Github: https://github.com/xybai0103
  
  Email: xueyin0103@gmail.com