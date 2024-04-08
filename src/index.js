import Map from "./Map.js";
import Mob from "./models/Entity/Mob.js";
import Player from "./models/Entity/Player.js";

const map = new Map()

const player = new Player(map)

player.generateEntity()

const mob = new Mob(map)
mob.generateEntity()


const img = new Image()
img.src = "src/images/sky.jpg"

const animate = () => {

    map.ctx.clearRect(0, 0, map.width, map.heigth)

    Object.values(map.entityList).forEach(entity => {
        
        entity.render()

        map.ctx.save()

        if (entity.sprite) {
            map.ctx.strokeStyle = "red"; // Color del borde
            map.ctx.lineWidth = 2;
            map.ctx.strokeRect(entity.x, entity.y, entity.width, entity.heigth)
            entity.sprite.injectSprite({ dx: entity.x, dy: entity.y })
        } else {
            map.ctx.globalCompositeOperation = "destination-over";
            map.ctx.fillStyle = entity.color || "red"
            map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)
        }

        map.ctx.restore()



    })


    map.ctx.save()
    map.ctx.globalCompositeOperation = "destination-over";
    map.ctx.drawImage(img, 0, 0, map.width, map.heigth);
    map.ctx.restore()

    requestAnimationFrame(animate)
}
animate()
