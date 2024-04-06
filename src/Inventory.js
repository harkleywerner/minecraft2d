
import range from "./items/range/range.js"

const types = {
    ...range
}

class Inventory { //Definimos el inventario, el cual va ir agregando items de una entidad en especifico.
    constructor() {
        this.inventoryList = []
    }

    addItem({ durability = 0, id, name = "bow" }) {

        const type = types[name]
        console.log(type)
        this.item = { ...type, durability }

    }
}


export default Items