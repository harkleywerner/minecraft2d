import EntityMovents from "./EntityMovents.js";
import Map from "./Map.js";
import Player from "./Player.js";


const map = new Map()

const test = (x, y) => {
    const entity = new EntityMovents(map)
    entity.generateEntity(entity, x, y)
}

test(99, 48)
test(68, 48)
test(30, 48)
test(130, 48)
test(99, 72)
test(99, 16)



const player = new Player(map)
player.generateEntity(player)


const animate = () => {

    map.ctx.clearRect(0, 0, map.width, map.heigth)
    map.ctx.fillRect(0, 0, map.width, map.heigth);

    Object.values(map.entityList).forEach(entity => {


        if (!entity.jump && !entity.pause && !entity.fly) {
            entity.gravityEntity()
        }

        map.ctx.save()
        map.ctx.fillStyle = entity.color || "white"
        map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)

        map.ctx.strokeStyle = 'green';
        map.ctx.lineWidth = 2;
        map.ctx.strokeRect(entity.x, entity.y, entity.width, entity.heigth);
        map.ctx.restore()

    })
    requestAnimationFrame(animate)
}
animate()
