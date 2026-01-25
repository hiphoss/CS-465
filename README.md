# CS-465 Module Three: Dynamic Data Rendering

This branch contains the completed work for Module Three of CS-465 Full Stack Development.

## Module Focus
The goal of Module Three was to transition the Travlr Getaways application from static content to dynamic data rendering using JSON and Handlebars within an Express MVC architecture.

## Key Features Implemented
- Dynamic rendering of travel packages using Handlebars templates
- Travel data sourced from a JSON file
- MVC pattern enforced using routes, controllers, and views
- Customer-facing Travel page updated to display dynamic trip data

## Technical Details
- Handlebars is used as the view engine
- Travel data is stored in `app_server/data/trips.json`
- The Travel controller reads JSON data and passes it to the view
- The Travel view (`travel.hbs`) renders data using `{{#each}}`

## How to Run
1. Install dependencies:
  npm install
2. Start the server:
   npm start
3. Open a browser and navigate to:
   http://localhost:3000/travel
