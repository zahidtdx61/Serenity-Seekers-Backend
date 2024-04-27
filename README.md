# Serenity Seekers Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

This is the server-side codebase for the Serenity Seekers project. Serenity Seekers is a web application that allows users to find and share peaceful locations around the world. This server provides the necessary APIs for the client-side application to interact with the database and perform various operations.


**Check out the live api**: [Serenity Seekers Backend](https://serenity-seekers-backend.vercel.app/api/v1/info)


## Features
- Add tourist spot
- Delete tourist spot
- Add user
- Find spot added by user
- Find spot filtered by country
- Update your added tourist spot
- Delete your added tourist spot


## Installation

1. Clone the repository:

```bash
git clone https://github.com/programming-hero-web-course-4/b9a10-server-side-zahidtdx61
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

- Create a `.env` file in the root directory.
- Add the following variables and provide appropriate values:

  ```
  PORT=<any_port_of_you_choice>
  MONGO_URL=<your_mongoDb_url>
  MONGO_DB_NAME=<any_name_of_your_choice>
  ```

4. Start the server:

```bash
npm run dev
```


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
