import { playerIdleModel } from "./Models/Player/idle/playerIdle.models.js";
import { playerRunModels } from "./Models/Player/run/playerRun.models.js";

export const player_variants = {
    "player": {
        hit_box: {
            x: 1,
            y: 2,
            height: 50,
            width: 25
        },
        animations: {
            run: playerRunModels(),
            idle: playerIdleModel()
        }
    }

}