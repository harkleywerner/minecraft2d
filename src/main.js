import { blocksModel } from "./models/blocks/blocks.model.js"
import { playerModel } from "./models/player/player.model.js"

export class MapGame {
    constructor() {
        this.ctx = document.getElementById("cavans").getContext("2d")
        this.max_width = 1500
        this.max_heigth = 500
        this.pixel = 25
        this.matriz = []
        this.models = {}
    }

    generateMatriz() {

        const pixel = this.pixel

        const heigth = this.max_heigth / pixel
        const width = this.max_width / pixel

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

            const animations = entityLoader.animations

            this.models[entity] = {...entityLoader} //=> Inicializa la entidad.

            for (const key in animations) {

                const loader_images = []

                const currentList = animations[key]

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

                this.models[entity]["animations"][key] = loader_images
            }
        }

    }

}