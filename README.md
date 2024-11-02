# Greek Army Ticketing System

## Overview

The **Greek Army Ticketing System** is a web application designed to optimize the helpdesk support process for the Greek Army. By moving away from traditional phone call methods, Army personnel can efficiently submit and track support tickets through this platform. This ensures streamlined communication and faster problem resolution. Helpdesk staff, referred to as GEP members, are responsible for managing and resolving these tickets while maintaining constant communication with the users.
The application allows real-time ticket tracking, chat-based communication between users and helpdesk staff, and provides dashboards for GEP members to view relevant statistics and ticket statuses.

## Features

- **Role-based Access Control**:

  - **User**: Army personnel who submit support tickets.
  - **GEP members**: Helpdesk staff responsible for ticket management and resolution.
  - **Admin**: Supervisors who oversee the entire ticketing system.

- **Ticket Management**:

  - Users can submit tickets, including subject, category, and description, with an option to upload images.
  - Tickets progress through three statuses:
    - **Open**: When the user creates a ticket.
    - **In Progress**: When a GEP member assigns themselves to the ticket.
    - **Completed**: When the issue has been resolved.

- **Chat Functionality**:

  - Real-time chat allows users and GEP members to communicate directly to discuss issues and provide updates.

- **Dashboard for Admin and GEP members**:

  - Admin and GEP members can access a dashboard to monitor ticket statistics and manage all user tickets efficiently.

## Technologies

The application is built using the following technologies:

- **Frontend**:

  - [React.js](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Ant Design (antd)](https://ant.design/)
  - [React Router](https://reactrouter.com/)
  - [Redux](https://react-redux.js.org/)

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)

## Installation and Setup

### Prerequisites

Before running the application, ensure you have the following installed on your local machine:

- **Node.js** (version 14 or later)
- **npm** (Node package manager)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/christoskechagias/greek-army-ticketing-system.git
   cd greek-army-ticketing-system

   ```

2. **Backend Setup**
   ```bash
   npm install
   ```

- Create a `.env` file in the root of the backend directory with the following variables:
  ```plaintext
  PORT=5001
  MONGODB_URI=mongodb://127.0.0.1:27017/gep
  ID_TOKEN_KEY=semKey
  ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```

## Running the Application

1. Start the Backend Server:
   ```bash
      npm run dev
   ```
2. Start the Frontend Application:
   ```bash
   cd client
   npm start
   ```
3. Access the Application:

- Open your browser and navigate to https://localhost:3000/login to access the application.
