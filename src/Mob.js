"use strict"
import EntityMovents from "./EntityMovents.js";

export default class Mob extends EntityMovents {
    constructor(map) {
        super(map)
        this.x = 48
        this.y = (3 * 24)
        this.width = this.map.pixel * 1
        this.heigth = this.map.pixel * 3
        this.hit_box = {
            x: 1,
            y: 3
        }
        this.stats = {
            health: 5000,
            level: 0
        }
        this.isCollapse = false
        this.id = 1
        this.name = "mob"
        this.color = "yellow"
        this.skills = {}
    }
}