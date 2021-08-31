import express from "express"
import { apiKey } from "../../index.js"
import fetch from "node-fetch";

type ManifestPhoto = {
    sol: number,
    earth_date: string,
    total_photos: number,
    cameras: [string]
}

type Manifest = {
    FHAZ: ManifestPhoto
    RHAZ: ManifestPhoto
    MAST: ManifestPhoto
    CHEMCAM: ManifestPhoto
    MAHLI: ManifestPhoto
    MARDI: ManifestPhoto
    NAVCAM: ManifestPhoto
    PANCAM: ManifestPhoto
}

const cameras = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM"]

const router = express.Router()

router.get("/", async (req, res) => {
    let url = "https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=" + apiKey

    const response = await fetch(url)
    const json = await response.json() as any
    const photos = json.photo_manifest.photos as ManifestPhoto[]

    const result = {} as Manifest

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