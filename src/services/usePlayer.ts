import {PlayerModel, RoundModel} from "../types/gameTypes";
import {RoundStatus, Team} from "../types/enums";

const usePlayer = (player: PlayerModel | undefined, currentRound: RoundModel): [boolean, boolean, boolean] => {
    if (player === undefined)
        return [false, false, false]

    const hasTeamLeader = (player === undefined)
        ? false
        : (player.team === Team.Blue ? currentRound.blueLeaderId : currentRound.redLeaderId) !== undefined;

    const isBlueLeader = player !== undefined && player.userId === currentRound.blueLeaderId;
    const isRedLeader = player !== undefined && player.userId === currentRound.redLeaderId;
    const isLeader = isBlueLeader || isRedLeader;

    const isBluePlaying = isBlueLeader && currentRound.roundStatus === RoundStatus.BluePlaying;
    const isRedPlaying = isRedLeader && currentRound.roundStatus === RoundStatus.RedPlaying;
    const isPlaying = isBluePlaying || isRedPlaying;

    return [hasTeamLeader, isLeader, isPlaying]
}

export {usePlayer}