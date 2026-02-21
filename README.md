# Travlr Getaways – Full Stack Reflection

## Architecture

I used two different types of frontend development: Express with server-rendered HTML (using Jade templates) and an Angular single-page application (SPA). The Express side followed the Model-View-Controller (MVC) pattern. Routes handled requests, models connected to MongoDB, and views rendered dynamic data for the customer-facing website. This approach reloads pages when navigating and relies on server-side rendering.

The Angular SPA was used for the administrator interface. Unlike the Express frontend, the SPA updates content dynamically without reloading the entire page. It communicates with the backend using RESTful API calls. This created a clearer separation between presentation logic and data handling. Using both approaches in one project helped me understand the difference between traditional server-rendered web apps and modern client-side applications.

The backend used a NoSQL MongoDB database because it stores data in flexible JSON-like documents. This works well with JavaScript-based frameworks like Express and Angular and integrates smoothly with Mongoose for schema definition and validation.

## Functionality

JSON is a lightweight data format used to transfer data between systems. It looks similar to JavaScript objects but is purely a data format. In this project, JSON connected the frontend and backend. The Angular SPA sent and received JSON data through API endpoints, and Express processed that data before interacting with MongoDB.

I refactored code several times during development. For example, I reorganized routes to clearly separate MVC routes from API routes under `/api`. I also implemented JWT authentication middleware to protect administrative endpoints and added an Angular HTTP interceptor to automatically attach authentication tokens to protected requests. Refactoring improved organization, security, and maintainability.

Reusable Angular components improved efficiency by allowing UI logic to be reused instead of rewritten for each screen.

## Testing

Different HTTP methods serve different purposes in a full stack application. GET retrieves data, POST creates new data, PUT updates existing data, and DELETE removes data. Each method corresponds to a RESTful endpoint.

After implementing JWT authentication, testing required additional steps. I had to log in first, retrieve a token, and include it in protected requests. I used Postman to test endpoints and verify that unauthorized requests returned 401 errors while authorized requests succeeded.

This process improved my understanding of how endpoints, middleware, and security interact in a full stack application.

## Reflection

This course strengthened my understanding of full stack development using the MEAN stack. I learned how to structure an application using MVC, build RESTful APIs, integrate MongoDB using Mongoose, and implement authentication with JWT.

One of the most valuable skills I developed was debugging across multiple layers of the stack. I became more comfortable tracing issues between the frontend, backend, and database. Completing a fully functional web application with authentication has increased my confidence and expanded my technical skill set, making me more marketable as a software developer.
