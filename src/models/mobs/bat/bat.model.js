export const batModel = () => {


    const idle = [
        "src/models/mobs/bat/idle/bat_0.png",
        "src/models/mobs/bat/idle/bat_1.png",
        "src/models/mobs/bat/idle/bat_2.png",
        "src/models/mobs/bat/idle/bat_3.png",
    ]


    return {
        hit_box: {
            x: 1,
            y: 1,
            height: 35,
            width: 35
        },
        frames: {
            idle,
        },
        actions_coldown: {
            "attack": 700,
        }
    }


}