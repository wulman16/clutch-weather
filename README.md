# Clutch Weather App

![GIF of Clutch Weather App demo](https://i.imgur.com/waorLhx.gif)

## Running locally
1. Clone down this repository. You will need `node` and `yarn` installed globally on your machine.
1. Create a `.env` file at the root level of the project directory with the contents `REACT_APP_WEATHER_API_KEY=12345`, where `12345` is the OpenWeather API key. To obtain an API key, either email me at will [dot] ulman [at] gmail [dot] com or sign up for your own key at https://openweathermap.org/home/sign_up. (Note that it may take up to two hours for your key to be activated.)
1. In the root level of the project directory, run `yarn install` to install dependencies and `yarn start` to start up a local server.
1. Navigate your browser to http://localhost:3000/ to use the application.

## Highlights

- Unknown ZIP codes and duplicate cities are handled gracefully.
- When you close your browser, your cities will be saved in `localStorage`. When you reload the page, the app fetches fresh weather data for your saved cities.
- Simple icons corresponding to the weather description are shown for each forecast.
- The app is responsive for mobile views.

## Wishlist (if I'd had more time)

- A test suite with unit tests for each component as well as integration tests using mock API responses
- Potential accessibility fixes from running a tool like Lighthouse
- Deployment to a service like Netlify
- Warning message before a city is deleted
- Error messages displayed in a custom div that can be dismissed rather than an alert popup
- Functions like API calls extracted into separate utility files
