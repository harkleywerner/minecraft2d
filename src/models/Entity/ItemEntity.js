import Entity from "./Entity.js";

export default class ItemEntity extends Entity{

    constructor(map,item){
        super(map)
        this.item = item
    }

}