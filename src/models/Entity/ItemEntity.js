import Entity from "./Entity.js";

export default class ItemEntity extends Entity{ //Recibimos el item y lo tratamos como entidad.

    constructor(map,item){
        super(map)
        this.item = item
    }

}