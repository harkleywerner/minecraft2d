export const blocksModel = () => {

    return {
        hit_box: {
            x: 1,
            y: 1,
            height: 25,
            width: 25
        },
        frames: {
            grass: ["src/models/blocks/dirt_grass.png"],
            stone: ["src/models/blocks/stone.png"],
            dirt: ["src/models/blocks/dirt.png"]
        }
    }
};