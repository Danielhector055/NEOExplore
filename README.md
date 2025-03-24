# Near-Earth Objects (NEO) Explorer

## Overview
NEO Explorer is a React Native application that provides information about near-Earth objects (NEOs) using NASA's API. It helps users track potentially hazardous asteroids and view their speed, diameter, and miss distance.

## Features
- Fetches real-time data on near-Earth objects from NASA API.
- Displays key attributes such as diameter, velocity, and miss distance.
- Identifies potentially hazardous objects.
- Implements best practices for API calls and UI rendering.

## Installation
### Prerequisites
- Node.js (>= 16.x recommended)
- npm or yarn
- Expo CLI

### Steps
```sh
# Clone the repository
git clone https://github.com/Danielhector055/NEOExplore
cd NEOExplore

# Install dependencies
npm install  # or yarn install

# Start the Expo development server
npm start  # or expo start
```

## Environment Variables
To configure your NASA API key, create a `.env` file in the root of your project:
```env
NASA_API_KEY=your_api_key_here
```

## Running Tests
This project uses **@testing-library/react-native** for testing.
```sh
npm test
```
To fix `act()` warnings, ensure that tests use `waitFor` where necessary.

## Folder Structure
```
├── app/
│   ├── index.tsx      # Entry point of the app
│  
├── components/
│   ├── NEOCard.tsx    # Component displaying asteroid details
├── services/
│   ├── NEONasa.ts  # API service for fetching NEO data
├── __test__/              # Dedicated folder for integration/additional tests
├── .env               # Environment variables
├── README.md          # Documentation
└── package.json       # Project dependencies and scripts
```

## AI Disclosure
### 1. AI Usage
AI tools were used during this project, including OpenAI's ChatGPT, for:
- Code structure suggestions.
- Fixing TypeScript errors.
- Optimizing testing strategies.

### 2. Manual Work
The following parts were completed manually:
- Writing business logic for API calls.
- Ensuring best practices in state management and React Native UI rendering.
- Debugging and refining test cases.

### 3. Evaluating AI Suggestions
Some AI-generated code contained inefficiencies, such as:
- Improper API request handling.
- Overuse of `useEffect` hooks.
- Inefficient state updates.
These were manually reviewed and corrected.

### 4. Modifications
AI-generated code was refined by:
- Improving error handling.
- Enhancing test coverage.
- Replacing deprecated methods with recommended alternatives.

### 5. AI in Your Workflow
AI is a productivity enhancer but requires validation. This project illustrates an approach where AI suggestions were reviewed, refined, and tested to ensure optimal performance.

## License
This project is open-source.


