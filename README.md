# postReview

## Instructions to Run This Project in Development Environment

-   Create `.env` file with following contents

        DB_URL='mongodb://127.0.0.1:27017/postReview'

-   Go to `client` Folder and run
    -   `npm install`
    -   `npm start`
-   In the root Folder and run
    -   `npm install`
    -   `npm start`
-   Although it should open automatically, if not open

    `http://localhost:4000/`

---

## Sample Data

-   If you want to get some sample data quickly, from the root of the project, run

    `npm run restore`

-   There's a dump command available too, so for backing up updated database, you can run

    `npm run dump`
