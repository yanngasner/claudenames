import {PlayerModel, RoundModel} from "../types/gameTypes";
import {RoundStatus, Team} from "../types/enums";

const usePlayer = (player: PlayerModel | undefined, currentRound: RoundModel): [boolean, boolean, boolean] => {
    if (player === undefined)
        return [false, false, false]

    const hasTeamLeader = (player === undefined)
        ? false
        : (player.team === Team.Green ? currentRound.greenLeaderId : currentRound.redLeaderId) !== undefined;

    const isGreenLeader = player !== undefined && player.userId === currentRound.greenLeaderId;
    const isRedLeader = player !== undefined && player.userId === currentRound.redLeaderId;
    const isLeader = isGreenLeader || isRedLeader;

    const isGreenPlaying = isGreenLeader && currentRound.roundStatus === RoundStatus.GreenPlaying;
    const isRedPlaying = isRedLeader && currentRound.roundStatus === RoundStatus.RedPlaying;
    const isPlaying = isGreenPlaying || isRedPlaying;

    return [hasTeamLeader, isLeader, isPlaying]
}

export {usePlayer}