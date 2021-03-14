import React, {FC} from 'react';
import {GameModel, PlayerModel, WordModel} from "../types/gameTypes";
import styled from 'styled-components';
import {getFontColor, getImage} from "../services/colorsProvider";
import {usePlayer} from "../services/usePlayer";
import {RoundStatus} from "../types/enums";

interface WordCardProps {
    word: WordModel;
    isLeader: boolean;
    roundStatus: RoundStatus;
}

interface WordComponentProps {
    game: GameModel;
    word: WordModel;
    player : PlayerModel | undefined;
    changeWordSelected: (isSelected: boolean) => void
}


const WordCard = styled.button`
    color: ${(props: WordCardProps) => getFontColor(props.word, props.isLeader)};
    width : 90%;
    height : 90%;
    margin : auto;
    border : none;
    background-image: url(${(props: WordCardProps) => getImage(props.word, props.roundStatus)});
    background-size: 100% 100%;
    font-size : ${(props: WordCardProps) => '2rem'};
    
        
    &:focus, &:active {
        outline: 0;
    }
    
    &:hover {
        cursor:${(props: WordCardProps) => props.word.isUnveiled || !props.isLeader ? 'initial' : 'pointer'};
`;

const WordComponent: FC<WordComponentProps> = ({game, word, player, changeWordSelected}) => {

    const currentRound = game.rounds[game.roundId];
    const [, isLeader, isPlaying] = usePlayer(player, currentRound);

    const handleSelectedChange = () => {
        if (!word.isUnveiled)
            changeWordSelected(!word.isSelected);
    }

    return <div className={`word-component`}>
        <WordCard disabled={word.isUnveiled || !isPlaying} onClick={() => handleSelectedChange()}
                  word={word}
                  isLeader={isLeader}
                  roundStatus={currentRound.roundStatus}
        >
            {word.text}</WordCard>
    </div>
}

export default WordComponent;