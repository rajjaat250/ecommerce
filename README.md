# Ecommerce Project

This is a full-stack ecommerce application built with React (Vite) for the frontend and Django for the backend.

## Project Structure

- `frontend/`: Contains the React application built with Vite and styled with Tailwind CSS.
- `backend/`: Contains the Django backend API, managing users, products, orders, and authentication.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Python, Django, Django REST Framework

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```
