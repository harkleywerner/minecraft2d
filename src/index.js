import EntityMovents from "./EntityMovents.js";
import Map from "./Map.js";
import Mob from "./Mob.js";
import Player from "./Player.js";


const map = new Map()

const player = new Player(map)

player.generateEntity(player)

const mob = new Mob(map)
mob.generateEntity(mob)

const test = (x, y) => {

    let max = 0

    const pixel = map.pixel
    while (max > 0) {

        const newX = Math.floor(Math.random() * (map.width / pixel))
        const newY = Math.floor(Math.random() * (map.heigth / pixel))

        if (map.matriz[newY] && map.matriz[newY][newX] === 0) {
            const entity = new EntityMovents(map)
            entity.generateEntity(entity, newX * pixel, newY * pixel)
            max -= 1
        }


    }


}

const a = (x, y) => {
    const entity = new EntityMovents(map)
    entity.generateEntity(entity, x, y)
}

test()   
// a(84, 24 * 24)
// a(24, 48)
// a(24, 72)
// a(24, 96)
// a(48 * 2, 24 * 5)
// a(48 * 2, 24 * 6)







const animate = () => {

    map.ctx.clearRect(0, 0, map.width, map.heigth)
    map.ctx.fillRect(0, 0, map.width, map.heigth);

    Object.values(map.entityList).forEach(entity => {

        if (!entity.jumping && !player.pause && !entity.fly) {
            entity.freeFall()
        }

      
        map.ctx.save()
        map.ctx.fillStyle = entity.color || "white"
        map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)
        if(entity.artificalWidth){
            // map.ctx.fillRect(entity.x + 24, entity.y, 24, 24)  
        }
        // map.ctx.strokeStyle = "red"; // Color del borde
        // map.ctx.lineWidth = 2; // Ancho del borde
        // map.ctx.strokeRect(x, y, width, height);
        map.ctx.restore()

    })
    requestAnimationFrame(animate)
}
animate()



