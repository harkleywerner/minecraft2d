"use strict"
import EntityMovents from "./EntityMovents.js";

export default class Mob extends EntityMovents {
    constructor(map) {
        super(map)
        this.x = 120
        this.y = 24 * 36
        this.width = this.map.pixel * 1
        this.heigth = this.map.pixel * 2
        this.hit_box = {
            x: 1,
            y: 2
        }
        this.stats = {
            health: 100,

            level: 0
        }
        this.isCollapse = false
        this.id = 1
        this.name = "mob"
        this.color = "yellow"
        this.skills = {}
    }
}