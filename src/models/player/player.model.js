export const playerModel = () => {

    const run = [
        "src/Models/Player/run/adventurer-run-00.png",
        "src/Models/Player/run/adventurer-run-01.png",
        "src/Models/Player/run/adventurer-run-02.png",
        "src/Models/Player/run/adventurer-run-03.png",
        "src/Models/Player/run/adventurer-run-04.png",
        "src/Models/Player/run/adventurer-run-05.png"
    ]

    const idle = [
        "src/Models/Player/idle/adventurer-idle-00.png",
        "src/Models/Player/idle/adventurer-idle-01.png",
        "src/Models/Player/idle/adventurer-idle-02.png",
        "src/Models/Player/idle/adventurer-idle-03.png",
    ]

    const attack = [
        "src/Models/Player/attack/adventurer-attack1-00.png",
        "src/Models/Player/attack/adventurer-attack1-01.png",
        "src/Models/Player/attack/adventurer-attack1-02.png",
        "src/Models/Player/attack/adventurer-attack1-03.png",
        "src/Models/Player/attack/adventurer-attack1-04.png",
    ]

    const idleAttack = [
        "src/Models/Player/idleAttack/adventurer-idle-2-00.png",
        "src/Models/Player/idleAttack/adventurer-idle-2-01.png",
        "src/Models/Player/idleAttack/adventurer-idle-2-03.png",
        "src/Models/Player/idleAttack/adventurer-idle-2-03.png"
    ]

    const jump = [
        "src/models/player/jump/adventurer-jump-00.png",
        "src/models/player/jump/adventurer-jump-01.png",
        "src/models/player/jump/adventurer-jump-02.png",
        "src/models/player/jump/adventurer-jump-03.png",
    ]

    const fall = [
        "src/models/player/fall/adventurer-fall-00.png",
    ]


    return {
        hit_box: {
            x: 1,
            y: 2,
            height: 70,
            width: 35
        },
        frames: {
            run,
            idle,
            attack,
            idleAttack,
            jump,
            fall
        },
        actions_coldown: {
            "attack": 700,
        }
    }

};