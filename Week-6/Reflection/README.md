# CS-465 Week 6 Reflection (Module 6)
## Travlr Getaways Admin SPA (Angular 17)

### What I built
This week I created the **admin Single Page Application (SPA)** for Travlr Getaways using **Angular 17**. The SPA connects to the existing **Express + MongoDB API** and supports full **CRUD** operations for trips.

Key results:
- Trip **card listing** loads from the API and displays trips in a clean layout.
- Admin can **Add** a new trip (POST).
- Admin can **Edit** an existing trip (GET by id + PUT).
- Admin can **Delete** an existing trip (DELETE).
- Updates are confirmed in the UI and persist to MongoDB.

---

### Architecture summary
The admin app lives in the `/admin` folder and uses Angular components + a service layer:

- **Trip List Component**
  - Retrieves all trips from the API and renders the list of trip cards.
- **Trip Card Component**
  - Displays a single trip’s details and provides Edit/Delete actions.
- **Trip Data Service**
  - Centralizes HTTP calls to the Express API endpoints (GET/POST/PUT/DELETE).
- **Forms**
  - Add Trip form creates new trips in MongoDB.
  - Edit Trip form loads one trip by ID and updates it.

The Express server exposes REST endpoints under `/api` and uses Mongoose models to read/write trips in MongoDB.

---

### API endpoints used (CRUD)
The admin SPA consumes these endpoints:

- **GET** `/api/trips`  
  Returns the full list of trips.

- **GET** `/api/trips/:tripId`  
  Returns one trip by ObjectId.

- **POST** `/api/trips`  
  Creates a new trip (validated fields required).

- **PUT** `/api/trips/:tripId`  
  Updates an existing trip.

- **DELETE** `/api/trips/:tripId`  
  Deletes an existing trip.

---

### Testing and verification
I verified the REST API and the Angular SPA behavior using:
- **Postman** to manually send GET/POST/PUT/DELETE requests and confirm JSON responses + HTTP status codes.
- The **browser UI** to confirm that trips display correctly and CRUD actions update the list.
- **MongoDB** (Compass) to confirm documents are created/updated/deleted in the `trips` collection.

---

### Screenshots submitted for Module 6
I captured and submitted the required screenshots:
1. **Card Listing** showing the additional trip added (Tokyo)
2. **Edit screen** showing the edit form for a trip
3. **Update screen** showing a successful update confirmation message

---

### Challenges I ran into (and how I solved them)
- **API requests failing / wrong responses**
  - Verified the server was running and confirmed the correct endpoints in Postman.
- **Validation errors on POST**
  - The Mongoose schema requires fields like `perPerson`, `image`, and `description`, so the request body must include them.
- **CORS / browser request blocking**
  - Ensured the Express API supports requests from the Angular dev server (localhost:4200) so the SPA can call the API successfully.
- **Field naming mismatch (`price` vs `perPerson`)**
  - Confirmed the database and UI were aligned to display `perPerson` consistently.

---

### How to run locally (for reference)
**Backend (Express + MongoDB):**
1. Start MongoDB (via Compass or MongoDB service)
2. In the Travlr root folder:
   - `npm install`
   - `npm start`
3. Backend runs at: `http://localhost:3000`

**Admin SPA (Angular):**
1. In `/admin`:
   - `npm install`
   - `ng serve`
2. Admin runs at: `http://localhost:4200`

---

### Branch note
- **module6** contains the working Angular admin SPA code for Week 6.
- **main** is used for course reflections and documentation.
