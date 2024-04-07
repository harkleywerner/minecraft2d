
import weapons from "./weapons.js"

const list = {
  weapons
}

export default function createItem({ type = "weapons", name = "bow" } = {}) {

  const generateId = Math.random() * 50000

  //Aca buscaria en la base de datos de los items predefinidos.
  //Este enfoque nos ayuda a centralizar la creacion de items.

  const search = list[type][name]

  return { ...search, id: generateId }

}

