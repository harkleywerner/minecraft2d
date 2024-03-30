export const blocksModel = () => {

    return {
        hit_box: {
            x: 1,
            y: 1,
            height: 35,
            width: 35
        },
        frames: {
            grass: ["src/models/blocks/dirt_grass.png"],
            stone: ["src/models/blocks/stone.png"],
            dirt: ["src/models/blocks/dirt.png"]
        }
    }
};