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

type Photo = {
    id: number,
    sol: number,
    camera: {
        id: number,
        name: string,
        rover_id: number,
        full_name: string
    },
    img_src: string,
    earth_date: string,
    rover: {
        id: number,
        name: string,
        landing_date: string,
        launch_date: string,
        status: string
    }
}

type PhotoList = {
    FHAZ: Photo
    RHAZ: Photo
    MAST: Photo
    CHEMCAM: Photo
    MAHLI: Photo
    MARDI: Photo
    NAVCAM: Photo
    PANCAM: Photo
}

const cameras = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM", "PANCAM"]

const router = express.Router()

router.get("/", async (req, res) => {
    const manifestResponse = await fetch("http://localhost:1337/rover/manifest")
    const manifest = await manifestResponse.json() as Manifest

    const result = {} as PhotoList

    console.log("Collecting photos...")

    for await (const [key, value] of Object.entries(manifest)) {
        let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + value.sol + "&api_key=" + apiKey
        const photosResponse = await fetch(url)
        const photosJson = await photosResponse.json() as any
        const photos = photosJson["photos"] as Photo[]

        photos.forEach((photo) => {
            result[photo.camera.name] = photo
        })
    }

    console.log(result)

    res.send(result)

})

export default router