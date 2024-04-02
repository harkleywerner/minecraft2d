import EntityMovents from "./EntityMovents.js";
import Map from "./Map.js";
import Player from "./Player.js";


const map = new Map()

const test = (x, y) => {
    const entity = new EntityMovents(map)
    entity.generateEntity(entity, x, y)
}



// test(12 * 3, 12 * 6)

test(24 * 15, 24 * 3)
test(24 * 4, 24 * 3)
test(24 * 3, 24 * 3)
test(24 * 8, 24 * 3)
test(24 * 9, 24 * 3)
test(24 * 10, 24 * 3)
test(24 * 11, 24 * 3)

// test(12 * 6, 24 * 3)


const player = new Player(map)
player.generateEntity(player)


const animate = (e) => {
    map.ctx.clearRect(0, 0, map.width, map.heigth)

    Object.values(map.entityList).forEach(entity => {

        if (!entity.jump && !player.pause) {
            entity.gravityEntity()
        }
        
        map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)
    })
    requestAnimationFrame(animate)
}
animate()