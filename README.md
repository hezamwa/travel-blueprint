# Travel Blueprint 🌍

A comprehensive multilingual travel application built with React and Firebase, providing detailed information about countries, cities, and attractions worldwide.

## Features ✨

- **Multilingual Support**: Available in Arabic (RTL) and English (LTR)
- **Comprehensive Database**: 59 countries, 214 cities, and 3,691 attractions
- **Smart Search**: Search cities by name with real-time filtering
- **Continent Filtering**: Browse countries by continent
- **Detailed Information**: Visa requirements, currencies, telecom providers, and more
- **Attraction Details**: Comprehensive attraction information with descriptions
- **Responsive Design**: Modern UI built with Material-UI
- **Real-time Data**: Powered by Firebase Firestore

## Technology Stack 🛠️

- **Frontend**: React 18, Material-UI, React Router
- **Backend**: Firebase Firestore
- **Internationalization**: react-i18next
- **Styling**: Material-UI with RTL/LTR support
- **State Management**: React Hooks

## Project Structure 📁

```
travel-blueprint/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Countries.js
│   │   ├── Cities.js
│   │   └── CityDetail.js
│   ├── services/
│   │   └── firebaseService.js
│   ├── App.js
│   ├── firebase.js
│   ├── i18n.js
│   └── index.js
├── package.json
├── .env.example
├── .env (create from .env.example)
└── README.md
```

## Database Schema 📊

### Collections:

1. **countries**: Country information with visa requirements, currencies, languages
2. **cities**: City details with travel information, best time to visit, airports
3. **cities/{cityId}/attractions**: Subcollection of attractions for each city
4. **metadata**: Application metadata and statistics
5. **exchange_rates**: Currency exchange rate information

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hezamwa/travel-blueprint.git
cd travel-blueprint
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Firestore database
   - Copy `.env.example` to `.env` and update with your Firebase configuration
   - Set up Firestore security rules (see `firestore.rules`)

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Firebase Configuration 🔧

Copy the `.env.example` file to `.env` and update with your Firebase project credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_actual_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

**Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Available Scripts 📝

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (irreversible)

## Internationalization 🌐

The application supports:
- **Arabic** (العربية): RTL layout with Arabic typography
- **English**: LTR layout with standard typography

Language switching is available through the navigation bar.

## Data Sources 📊

The application contains comprehensive travel data including:
- Country information with visa requirements
- City details with best times to visit
- Attraction information with descriptions
- Currency and exchange rate data
- Telecom provider information

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Travel data compiled from various public sources
- Material-UI for the beautiful component library
- Firebase for the robust backend infrastructure
- React community for the excellent ecosystem

## Support 💬

If you have any questions or need help, please open an issue or contact the maintainers.

---

Made with ❤️ for travelers worldwide 