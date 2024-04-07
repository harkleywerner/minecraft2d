
import Entity from "../models/Entity/Entity.js"
import weapons from "./weapons/weapons.js"

const list = {
  weapons
}

function createItem({ type = "weapons", name = "bow" } = {}) {

  const generateId = Math.random() * 50000

  //Aca buscaria en la base de datos de los items predefinidos.
  //Este enfoque nos ayuda a centralizar la creacion de items.

  const search = list[type][name]

  return { ...search, id: generateId }

}


export default class Items extends Entity {
  constructor(map){
    super(map)
    this.item = createItem()
  }
}