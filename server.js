import express from "express";
import bodyParser from "body-parser";

// Route dosyalarını import ediyoruz
import createJobListing from "./routes/createJobListing.js";
import createPost from "./routes/createPost.js";
import createUser from "./routes/createUser.js";
import deleteJobListing from "./routes/deleteJobListing.js";

import deletePost from "./routes/deletePost.js";
import deleteUser from "./routes/deleteUser.js";
import getCV from "./routes/getCV.js";
import getJobListing from "./routes/getJobListing.js";
import getJobListingById from "./routes/getJobListingById.js";
import getPostById from "./routes/getPostById.js";
import getPosts from "./routes/getPosts.js";
import getUser from "./routes/getUser.js";
import getUserById from "./routes/getUserById.js";
import updateCV from "./routes/updateCV.js";
import updateJobListing from "./routes/updateJobListing.js";
import updatePost from "./routes/updatePost.js";
import updateUser from "./routes/updateUser.js";

const app = express();
const port = 3001;

app.use(bodyParser.json()); // JSON body'leri işlemek için

// Her bir API fonksiyonunu bir route olarak ekliyoruz
app.post("/api/create-job-listing", createJobListing);
app.post("/api/create-post", createPost);
app.post("/api/create-user", createUser);

app.delete("/api/delete-job-listing", deleteJobListing);
app.delete("/api/delete-post", deletePost);
app.delete("/api/delete-user", deleteUser);

app.get("/api/get-cv", getCV);
app.get("/api/get-job-listing", getJobListing);
app.get("/api/get-job-listing/:id", getJobListingById);
app.get("/api/get-post/:id", getPostById);
app.get("/api/get-posts", getPosts);
app.get("/api/get-user", getUser);
app.get("/api/get-user/:id", getUserById);

app.put("/api/update-cv", updateCV);
app.put("/api/update-job-listing", updateJobListing);
app.put("/api/update-post", updatePost);
app.put("/api/update-user", updateUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
