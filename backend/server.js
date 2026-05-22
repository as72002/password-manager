import express from "express";
import { encrypt, decrypt } from "./cryptoUtils.js";
const app = express();
const port = 3000;
import dotenv from "dotenv";
import bodyParser from "body-parser";
app.use(bodyParser.json());
import { MongoClient } from "mongodb";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);
// Connection URL
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

// Database Name
const dbName = "password-manager";

dotenv.config();

// middleware

const encryptPasswordMiddleware = (req, res, next) => {
  if (req.body.password) {
    req.body.password = encrypt(req.body.password);
    console.log("Encrypted Password:", req.body.password);
  }
  next();
};

const decryptPasswordMiddleware = async (req, res,next) => {
  if (!req.data) {
    return res
      .status(400)
      .send({ success: false, message: "No data to decrypt" });
  }
   console.log("Inside Decrypt Middleware")
  // Decrypting passwords while keeping other fields unchanged
  req.data = req.data.map((doc) => ({
    ...doc, // Spread all existing fields
    password: decrypt(doc.password), // Decrypt the password
  }));
  console.log("Done")
 next()
};

await client.connect();
console.log("Connected successfully to server");

//Get all Passwords
app.get(
  "/",
  async (req, res,next) => {
    const db = client.db(dbName);
    const collection = db.collection("All_Passwords");
    try {
      req.data = await collection.find().toArray(); // Store data in req.data
      console.log("Inside Get")
      next(); // Move to decryption middleware
    } catch (error) {
      console.error("Error fetching passwords:", error);
      res.status(500).send({ success: false, message: "Server error" });
    }
    console.log("End of Get")
    
  },
  decryptPasswordMiddleware,
  (req, res) => {
    res.send({ success: true, data: req.data });
  }
);

//Save a password
app.post("/", encryptPasswordMiddleware, async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("All_Passwords");

  const reqObject = req.body;
  console.log("POST : ", reqObject);
  console.log("Real Password=", reqObject.password);

  await collection.insertOne(reqObject);

  res.send({ success: true, message: "Password saved successfully" });

  console.log("Found documents =>", reqObject);
});

app.put("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("All_Passwords");

  const password = req.body;

  const { _id, ...updatedPassword } = password;

  console.log("PUT", password);
  const filter = { id: updatedPassword.id }; // Assuming `id` is unique
  const update = { $set: updatedPassword }; // `$set` is used to update the document with the new data

  console.log("PUT : ", password);
  await collection.updateOne(filter, update);

  res.send({ success: true, message: "Password saved successfully" });

  // console.log("Found documents =>", password);
});

//delete a password
app.delete("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("All_Passwords");

  const password = req.body;
  console.log("req =", req);
  console.log("req.body =", req.body);

  const filter = { id: password.id };

  await collection.deleteOne(filter);

  res.send({ success: true, message: "Password Deleted successfully" });

  console.log("DELETE Found documents =>", password);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("secret is", process.env.MONGODB_URI);
});

//2:05:00
