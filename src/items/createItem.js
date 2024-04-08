
import weapons from "./weapons.js"

const list = {
  weapons
}

export default function createItem({ type = "weapons", name = "bow" } = {}) {

  //Aca buscaria en la base de datos de los items predefinidos.
  //Este enfoque nos ayuda a centralizar la creacion de items.

  const search = list[type][name]

  return search

}

