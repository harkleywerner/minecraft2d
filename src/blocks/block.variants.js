const block_variants = {
    0: {
        name: "grass",
        src: "./PNG/Tiles/dirt_grass.png",
        stats: {
            durability: 1
        }, floor: { min_floor: 15, max_floor: 15 }
    },
    1: {
        name: "dirt",
        src: "./PNG/Tiles/dirt.png",
        stats: {
            durability: 0.5
        }, floor: {
            min_floor: 16, max_floor: 19
        }
    },
    2: {
        name: "stone",
        src: "./PNG/Tiles/stone.png",
        stats: {
            durability: 2
        },
        floor: {
            min_floor: 18, max_floor: 19
        }
    }
}

export default block_variants