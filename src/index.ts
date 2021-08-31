import express from "express"
import roverManifestRoute from "./routes/rover/manifest.js"
import roverPhotosRoute from "./routes/rover/photos.js"
import dotenv from "dotenv"

const app = express()
dotenv.config()

export const apiKey = process.env.api_key

app.get("/status", (req, res) => {
    res.send({ status: 200 })
})

app.use("/rover/manifest", roverManifestRoute)
app.use("/rover/photos", roverPhotosRoute)

app.listen(1337, () => {
    console.log(`nasa-api-backend app listening at http://localhost:1337`)
    console.log("api_key=" + apiKey)
})