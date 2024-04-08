//Los sprites se generaran con la APP de sprite generator.
//Es decir que pasareos lo escencial para que pueda identificar y generar el nueva sprite.



import Sprites from "./Sprites.js";

const list = {
    "walkL": {
        row: 10,
        col: 6,
        offsetX: -10,
        offsetY: -5,
        start_col: 1
    },
    "walkR": {
        row: 12,
        col: 6,
        offsetX: -10,
        offsetY: -5,
        start_col: 1
    },
    "idleR": {
        row: 12,
        col: 1,
        offsetX: -10,
        offsetY: -5
    },
    "idleL": {
        row: 10,
        col: 1,
        offsetX: -10,
        offsetY: -5
    },
    "attackR": {
        row: 20,
        col: 12,
        offsetY: -2,
        offsetX: -10,
    }
}

const defaults =  { max_col: 18, max_row: 21, animations: list, scale: 0.7, img: "src/images/player.png" }

export default class SpritesProcedural extends Sprites {
    constructor(obj = defaults) {
        super(obj)
    }

    generateNewSprite(){

    }




}