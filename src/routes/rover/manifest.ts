import express from "express"
import { apiKey } from "../../index.js"
import fetch from "node-fetch";

type Photo = {
    sol: number,
    earth_date: string,
    total_photos: number,
    cameras: [string]
}

type Mainfest = {
    FHAZ: Photo
    RHAZ: Photo
    MAST: Photo
    CHEMCAM: Photo
    MAHLI: Photo
    MARDI: Photo
    NAVCAM: Photo
    PANCAM: Photo
    MINITES: Photo
}

const cameras = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM", "MINITES"]

const router = express.Router()

router.get("/", async (req, res) => {
    let url = "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=" + apiKey

    const response = await fetch(url)
    const json = await response.json() as any
    const photos = json.photo_manifest.photos as [Photo]

    const result = {} as Mainfest

    photos.forEach((data) => {
        cameras.forEach((value) => {
            if(data.cameras.includes(value)) {
                result[value] = data
            }
        })
    })

    res.send(result)
})

export default router