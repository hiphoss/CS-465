# CS-465 Module Four: MongoDB Integration

This branch contains the completed work for Module Four of CS-465 Full Stack Development.

## Module Focus
The objective of Module Four was to integrate a NoSQL database into the Travlr Getaways application using MongoDB and Mongoose. This module replaces static JSON data as the runtime data source with a live database.

## Key Features Implemented
- MongoDB database connection using Mongoose
- Trip schema and model with validation
- Database access module for managing connections
- Seed script to populate the Trips collection
- Controller updated to retrieve data from MongoDB
- Data verified using MongoDB Compass

## Technical Details
- Database: MongoDB (local)
- ODM: Mongoose
- Schema: Trip
- Collection: trips
- Data retrieved using `Trip.find()` and rendered with Handlebars

## How to Run
1. Install dependencies:
npm install
2. Start MongoDB (service)
3. Start the server:
npm start
4. Visit:
http://localhost:3000/travel


