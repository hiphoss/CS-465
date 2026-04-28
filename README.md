# CS-465: Travlr Getaways Full-Stack Web Application

## Overview

This repository contains my CS-465 Full Stack Development project, **Travlr Getaways**. The application is a travel website that allows users to view travel packages while providing administrative functionality for managing travel data.

The project demonstrates core full-stack development concepts, including server-side routing, view rendering, database interaction, authentication, and application organization. It was developed as part of my computer science coursework to show how front-end pages, backend routes, and database operations work together in a functional web application.

## Project Purpose

The purpose of this project was to build a full-stack web application that supports both public-facing travel content and administrator-managed travel data.

The Travlr Getaways application was designed to support:

- Public viewing of travel packages
- Administrator access for managing trip information
- Server-side routing with Node.js and Express
- Database interaction using MongoDB
- Structured views for displaying application content
- Organized project files for routes, views, models, and static assets

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JavaScript**
- **HTML**
- **CSS**
- **Jade/Pug templating**
- **RESTful routing concepts**

## Key Features

- Displays travel packages for users
- Provides backend routes for application navigation and data access
- Uses MongoDB to store and retrieve travel-related data
- Supports administrator functionality for managing trip information
- Uses structured templates and static assets to present content
- Organizes server-side logic using routes, models, and application configuration files

## QA / Testing Notes

This project supports my interest in QA and software testing because it required checking how different parts of the application worked together, including routes, views, database records, and administrator functionality.

Testing and quality-related review included:

- Verifying that travel package data displayed correctly
- Checking route behavior for public-facing pages
- Reviewing administrator workflows for managing trip information
- Confirming that database records could be retrieved and displayed
- Testing application startup and local server behavior
- Reviewing form and navigation behavior during development
- Debugging issues related to routing, data access, and application structure

Because this was an academic full-stack development project, testing was primarily manual and focused on confirming that the application worked as expected during development.

## Project Structure

```text
CS-465/
├── bin/                 # Server startup files
├── public/              # Static assets such as stylesheets, images, and scripts
├── routes/              # Express route files
├── views/               # Jade/Pug view templates
├── app.js               # Main Express application configuration
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Dependency lock file
└── README.md            # Project documentation
