import {Team, WordType} from "../types/enums";

export const darkBlue = '#0054d1';
export const lightBlue = '#5e9cff';
export const veryLightBlue = '#d1e3ff';
export const darkRed = '#c40000';
export const lightRed = '#ff887d';
export const veryLightRed = '#ffe1de';
export const darkUnassigned = '#a1a100';
export const lightUnassigned = '#fff27d';
export const darkForbidden = '#1a1a1a';
export const lightForbidden = '#999999';

export function getColor(wordType: WordType) {
    switch (wordType) {
        case WordType.Blue :
            return darkBlue;
        case WordType.Red :
            return darkRed;
        case WordType.Forbidden :
            return darkForbidden;
        case WordType.Unassigned :
            return darkUnassigned;
    }
}

export function getBorderColor(wordType: WordType) {
    switch (wordType) {
        case WordType.Blue :
            return lightBlue;
        case WordType.Red :
            return lightRed;
        case WordType.Forbidden :
            return lightForbidden;
        case WordType.Unassigned :
            return lightUnassigned;
    }
}

export function getBackgroundColor(team: Team) {
    switch (team) {
        case Team.Blue :
            return veryLightBlue;
        case Team.Red :
            return veryLightRed;
    }
}