"use strict"

import EntityActions from "./EntityActions.js"

export default class Mob extends EntityActions {
    constructor(map) {
        super(map)
        this.x = 12 * 20
        this.y = (3 * 500)
        this.width = this.map.pixel * 1
        this.heigth = this.map.pixel * 3
        this.hit_box = {
            x: 1,
            y: 3
        }
        this.stats = {
            health: 2000,
            level: 0
        }
        this.isCollapse = false
        this.name = "mob"
        this.color = "yellow"
        this.skills = {}
    }

    render() {
        this.freeFall()
    }
}