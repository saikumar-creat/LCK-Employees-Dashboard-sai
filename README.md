# Employee Dashboard

A modern, responsive employee management dashboard built with React, TypeScript, and Material-UI.

## Features

- 👥 Employee Management (Add, Edit, Delete)
- 🔍 Advanced Search & Filtering
- 📊 Department-wise Employee Distribution
- 📱 Responsive Design
- 🎨 Modern UI with Material Design
- ✨ Real-time Form Validation
- 🚀 Performance Optimized

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 4.9+
- **UI Components**: Material-UI (MUI) v5
- **Styling**: Tailwind CSS 3
- **Data Grid**: MUI X-Data-Grid
- **API Integration**: REST API (JSONPlaceholder)
- **Build Tool**: Vite
- **Package Manager**: npm

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/employee-dashboard-new.git
cd employee-dashboard-new
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
employee-dashboard-new/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript interfaces
│   ├── App.tsx          # Root component
│   └── index.tsx        # Entry point
├── public/              # Static assets
└── package.json        # Project dependencies
```

## Key Dependencies

```json
{
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "@mui/x-data-grid": "^6.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "tailwindcss": "^3.x",
  "typescript": "^4.9.x"
}
```

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint
- `npm run format` - Formats code with Prettier

## Features in Detail

### Employee Management
- Add new employees with validation
- Edit existing employee details
- Delete employees
- View employee information in a data grid

### Search and Filtering
- Real-time search across all fields
- Department-wise filtering
- Advanced data grid filtering and sorting

### UI/UX Features
- Responsive layout for all screen sizes
- Interactive cards with hover effects
- Loading states and error handling
- Success/error notifications
- Form validation with error messages

## API Integration

The dashboard integrates with JSONPlaceholder API for:
- Fetching employee data (`GET /users`)
- Adding new employees (`POST /users`)
- Simulated edit/delete operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
