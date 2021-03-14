import {RoundStatus, Team, WordType} from "../types/enums";
import green_full from '../resources/FOND_VERT.png'
import green_border from '../resources/BORD_VERT.png'
import red_full from '../resources/FOND_ROUGE.png'
import red_border from '../resources/BORD_ROUGE.png'
import yellow_full from '../resources/FOND_JAUNE.png'
import yellow_border from '../resources/BORD_JAUNE.png'
import grey_full from '../resources/FOND_GRIS.png'
import grey_border from '../resources/BORD_GRIS.png'
import {WordModel} from "../types/gameTypes";

export const green = '#97DABD';
export const red = '#FF644F';
export const yellow = '#FFD93E';
export const black = '#000000';
export const white = '#FFFFFF'

export function getFontColor(word: WordModel, isLeader: boolean) {
    if (word.isUnveiled)
        return white;
    else if (!isLeader)
        return black;
    else
    {
        switch (word.wordType) {
            case WordType.Blue :
                return green;
            case WordType.Red :
                return red;
            case WordType.Unassigned :
                return yellow;
            case WordType.Forbidden :
                return black;
        }
    }
}

export function getBackgroundColor(team: Team) {
    switch (team) {
        case Team.Blue :
            return green;
        case Team.Red :
            return red;
    }
}

export function getImage(word: WordModel, roundStatus: RoundStatus) {

    if (word.isSelected) {
        switch (roundStatus) {
            case RoundStatus.BluePlaying:
                return green_border;
            case RoundStatus.RedPlaying:
                return red_border;
            default:
                return grey_border;
        }
    }
    else if (word.isUnveiled) {
        switch (word.wordType) {
            case WordType.Blue :
                return green_full;
            case WordType.Red :
                return red_full;
            case WordType.Unassigned :
                return yellow_full;
            case WordType.Forbidden :
                return grey_full;
        }
    }
    else
        return yellow_border;

}