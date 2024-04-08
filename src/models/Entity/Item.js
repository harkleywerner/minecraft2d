import createItem from "../../items/createItem.js";
import Entity from "./Entity.js";

export default class Item extends Entity { //Recibimos el item y lo tratamos como entidad.

    constructor(map, item) {
        super(map)
        this.item = (() => createItem(item))()
    }

}