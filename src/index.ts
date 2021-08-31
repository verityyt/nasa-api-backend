import express from "express"
import roverManifestRoute from "./routes/rover/manifest.js"

export const apiKey = "DEMO_KEY"
const app = express()

app.get("/status", (req, res) => {
    res.send({ status: 200 })
})

app.use("/rover/manifest", roverManifestRoute)

app.listen(1337, () => {
    console.log(`nasa-api-wrapper app listening at http://localhost:1337`)
})