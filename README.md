# Podcaster

This is a project that enables users to browse and listen to different podcasts. The project is built using Vite, React and Tailwind.

## Installation

To get started with the project, clone the repository to your local machine, and then install the dependencies:

```
https://github.com/RobertoCastanheira/podcaster-react.git
cd podcaster-react
npm install
```

## Running the Application

Visit `https://cors-anywhere.herokuapp.com/` and click on "Request temporary access to the demo server".

You can run the application in development mode using the `dev` script:

```
npm run dev
```
This will start a development server and the application will be available at `http://localhost:5173`.

## Building the Application

To build the application for production, run the `build` script:

```
npm run build
```

This will create an optimized production build of the application in the `dist` directory.

## Previewing the Production Build

To preview the production build, run the `preview` script:

```
npm run preview
```

This will start a preview server and the production build of the application will be available at `http://localhost:5173`.

## Testing

### Cypress

To run the Cypress end-to-end tests, run the following commands:

```
npm run cypress-open
```

This will open the Cypress test runner, where you can choose to run the tests interactively.

Alternatively, you can run the tests in headless mode using the following command:

```
npm run cypress-run
```

### Jest

To run the Jest unit tests, run the following command:

```
npm run jest-run
```

## Dependencies

- `react`: A library for building user interfaces.
- `react-dom`: A library for rendering React components in the browser.
- `react-router-dom`: A library for handling client-side routing in React applications.
- `cross-fetch`: A library for making HTTP requests in the browser and Node.js.
- `dayjs`: A library for parsing, validating, manipulating, and formatting dates.
- `fast-xml-parser`: A library for parsing XML data quickly and efficiently.

## Dev Dependencies

- `@babel/core`: The core Babel compiler.
- `@babel/preset-env`: A Babel preset for compiling modern JavaScript to a compatible format.
- `@types/react`: TypeScript type definitions for React.
- `@types/react-dom`: TypeScript type definitions for ReactDOM.
- `@vitejs/plugin-react`: A Vite plugin for compiling React components.
- `autoprefixer`: A PostCSS plugin for adding vendor prefixes to CSS properties.
- `babel-jest`: A Jest plugin for using Babel to compile JavaScript files.
- `cypress`: A testing framework for end-to-end testing web applications.
- `jest`: A testing framework for unit testing JavaScript code.
- `mock-local-storage`: A library for mocking the localStorage API in tests.
- `postcss`: A tool for transforming CSS with JavaScript.
- `prettier`: A code formatter for JavaScript and other languages.
- `tailwindcss`: A CSS framework for building responsive and customizable user interfaces.
- `vite`: A build tool and development server for modern web applications.

## License

This project is licensed under the MIT license.
