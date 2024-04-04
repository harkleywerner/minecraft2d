import EntityMovents from "./EntityMovents.js";
import Map from "./Map.js";
import Player from "./Player.js";


const map = new Map()

const player = new Player(map)

player.generateEntity(player)

const test = (x, y) => {

    let max = 15

    const pixel = map.pixel
    while (max > 0) {

        const newX = Math.floor(Math.random() * (map.width / pixel))
        const newY = Math.floor(Math.random() * (map.heigth / pixel))

        if (map.matriz[newY] && map.matriz[newY][newX] == 0) {
            const entity = new EntityMovents(map)
            entity.generateEntity(entity, newX * pixel, newY * pixel)

            max -= 1
        }


    }


}
const entity = new EntityMovents(map)
entity.generateEntity(entity, 24,24)


const animate = () => {

    map.ctx.clearRect(0, 0, map.width, map.heigth)
    map.ctx.fillRect(0, 0, map.width, map.heigth);

    Object.values(map.entityList).forEach(entity => {

        if (!entity.jump && !player.pause && !entity.fly) {
            // entity.freeFall()
        }

        map.ctx.save()
        map.ctx.fillStyle = entity.color || "white"
        map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)

        map.ctx.restore()

    })
    requestAnimationFrame(animate)
}
animate()



