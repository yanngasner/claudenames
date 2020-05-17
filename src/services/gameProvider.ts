import {db} from '../services/firebase';
import {GameModel} from "../types/game";


export const getCurrentGame = () => {
    db.ref("game").on('value', snaphshot => {
        console.log(snaphshot.val().name)
    })
}

