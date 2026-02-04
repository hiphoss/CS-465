Travlr Getaways – Module 5 (RESTful API Refactor)
Overview

This module focuses on refactoring the Travlr Getaways application to separate database logic from the frontend by introducing a dedicated RESTful API. The goal was to improve separation of concerns and allow multiple clients (frontend views, future Angular SPA, and external tools) to access trip data through standardized endpoints.

The backend now exposes JSON data through /api routes while the website consumes the same data from the database using Mongoose models.

What Changed This Week

Created a separate app_api application layer

Moved database access logic out of frontend controllers

Implemented RESTful API routes

Connected API routes to MongoDB using Mongoose

Added JSON responses for trip data

Tested endpoints using Postman

Verified proper HTTP status codes and error handling

API Endpoints Implemented

GET all trips
/api/trips

GET single trip
/api/trips/:tripId

POST create trip
/api/trips

PUT update trip
/api/trips/:tripId

DELETE remove trip
/api/trips/:tripId

Testing

Endpoints were tested using:

Postman

Browser GET requests

MongoDB Compass for database verification

All routes successfully returned JSON data and connected to the MongoDB travlr database.

Skills Demonstrated

RESTful API design

Separation of concerns

Express routing

Mongoose models and queries

CRUD operations

Backend testing and debugging

Status

Module 5 complete
API fully functional and integrated with the database