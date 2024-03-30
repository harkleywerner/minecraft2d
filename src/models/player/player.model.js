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


    return {
        hit_box: {
            x: 1,
            y: 2,
            height: 50,
            width: 75
        },
        frames: {
            run,
            idle,
            attack,
            idleAttack
        },
        actions_coldown: {
            "run": 0,
            "idle": 0,
            "attack": 1000
        }
    }

};