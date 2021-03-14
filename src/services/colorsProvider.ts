import {RoundStatus, Team, WordType} from "../types/enums";
import green_full from '../resources/FOND_VERT.png'
import green_border from '../resources/BORD_VERT.png'
import red_full from '../resources/FOND_ROUGE.png'
import red_border from '../resources/BORD_ROUGE.png'
import yellow_full from '../resources/FOND_JAUNE.png'
import yellow_border from '../resources/BORD_JAUNE.png'
import grey_full from '../resources/FOND_GRIS.png'
import grey_border from '../resources/BORD_GRIS.png'
import green_button from '../resources/bouton_vert.png'
import red_button from '../resources/bouton_rouge.png'
import grey_button from '../resources/bouton_gris.png'

import {WordModel} from "../types/gameTypes";

export const gameGreen = '#97DABD';
export const gameRed = '#FF644F';
export const gameYellow = '#FFD93E';
export const gameGrey = '#424242';
export const gameWhite = '#FFFFFF'

export function getFontColor(word: WordModel, isLeader: boolean) {
    if (word.isUnveiled)
        return gameWhite;
    else if (!isLeader)
        return gameGrey;
    else
    {
        switch (word.wordType) {
            case WordType.Blue :
                return gameGreen;
            case WordType.Red :
                return gameRed;
            case WordType.Unassigned :
                return gameYellow;
            case WordType.Forbidden :
                return gameGrey;
        }
    }
}

export function getBackgroundColor(team: Team) {
    switch (team) {
        case Team.Blue :
            return gameGreen;
        case Team.Red :
            return gameRed;
    }
}

export function getButtonImage(team: Team | undefined) {
    switch (team) {
        case undefined:
            return grey_button;
        case Team.Blue :
            return green_button;
        case Team.Red :
            return red_button;
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