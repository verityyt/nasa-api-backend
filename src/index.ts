import express from "express"
import roverManifestRoute from "./routes/rover/manifest.js"
import roverPhotosRoute from "./routes/rover/photos.js"

export const apiKey = "XogcQm5uHE2IuxjhVA2UXUk4ainZ5wgZaFyDgB8x"
const app = express()

app.get("/status", (req, res) => {
    res.send({ status: 200 })
})

app.use("/rover/manifest", roverManifestRoute)
app.use("/rover/photos", roverPhotosRoute)

app.listen(1337, () => {
    console.log(`nasa-api-backend app listening at http://localhost:1337`)
})