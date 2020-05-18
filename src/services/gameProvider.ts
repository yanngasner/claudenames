import {db} from '../services/firebase';
import {GameModel} from "../types/gameTypes";


export const getCurrentGame = () => {
    db.ref("game").on('value', snaphshot => {
        console.log(snaphshot.val().name)
    })
}

