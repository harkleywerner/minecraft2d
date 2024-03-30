import { blocksModel } from "./models/blocks/blocks.model.js"
import { playerModel } from "./models/player/player.model.js"

export class MapGame {
    constructor() {
        this.ctx = document.getElementById("cavans").getContext("2d")
        this.max_width = 1500
        this.max_heigth = 700
        this.pixel = 35
        this.matriz = []
        this.models = {}
    }

    generateMatriz() {

        const pixel = this.pixel

        const heigth = Math.round(this.max_heigth / pixel)
        const width = Math.round(this.max_width / pixel)

        this.matriz = Array.from({ length: heigth },
            () => Array.from({ length: width }, () => 0)
        )

    }


    async loadAllImg() {

        const loaders = [
            { entity: "player", loader: playerModel },
            { entity : "blocks", loader : blocksModel}
        ]

        for (const e of loaders) {

            const { entity, loader } = e

            const entityLoader = loader()

            const frames = entityLoader.frames

            this.models[entity] = {...entityLoader} //=> Inicializa la entidad.

            for (const key in frames) {

                const loader_images = []

                const currentList = frames[key]

                for (let i = 0; i < currentList.length; i++) {

                    const img = new Image()

                    img.src = currentList[i]

                    await new Promise((res) => {
                        img.onload = () => {

                            loader_images.push(img)

                            res()
                        }
                    })
                }

                this.models[entity]["frames"][key] = loader_images
            }
        }

    }

}