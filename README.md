# ToDo List Application

A simple ToDo list application with backend in ASP.NET Core (C#) and frontend in Angular.

## Features

- Add tasks with title, description, due date, and user assignment.
- View and manage tasks your user.
- User authentication and registration.

## Getting Started

### Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Angular CLI](https://cli.angular.io/)
- [Postgres](https://www.postgresql.org/)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Artemiyqq/to-do-list.git
   ```
2. Navigate to the project folder:
   ```
   cd to-do-list
   ```
3. Install frontend dependencies:
    ```
    cd frontend
    npm install
    ```
4. Install backend dependencies:
   ```
   cd ../API
   dotnet restore
   ```
5. Add appsettings.json file in API folder and add next code to it:
   ```
   {
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
      }
    },
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Port=5432;Database=todo_list;Username=entityframework;Password=secretpass169"
    },
    "AllowedHosts": "*"
   }
   ```

### Database Setup

1. Create an empty PostgreSQL database:
   ```
   CREATE DATABASE todo_list;
   ```
2. Create a user for Entity Framework:
   ```
   CREATE USER entityframework WITH PASSWORD 'secretpass169';
   ALTER ROLE entityframework SET client_encoding TO 'utf8';
   ALTER ROLE entityframework SET default_transaction_isolation TO 'read committed';
   ALTER ROLE entityframework SET timezone TO 'UTC';
   ```

### Run Migrations
1. Run Entity Framework migrations:
   ```
   cd API
   dotnet ef database update
   ```

### Usage
1. Open your browser and go to [http://localhost:4200/](http://localhost:4200/) to access the ToDo list application.
2. Register or log in to start using the application.

## Testing
- Backend tests: Run NUnit tests in the API.Tests project.
- Frontend tests: Run Angular tests using Jasmine and Karma.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Artemiyqq/to-do-list/blob/Prod/LICENSE.txt) file for details.
