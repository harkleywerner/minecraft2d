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




    return {
            hit_box: {
                x: 1,
                y: 2,
                height: 50,
                width: 75
            },
            animations: {
                run,
                idle
            }
    }

};