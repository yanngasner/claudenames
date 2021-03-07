import React, {FC} from 'react';
import {GameModel, PlayerModel, WordModel} from "../types/gameTypes";
import styled from 'styled-components';
import {getColor, getBorderColor} from "../resources/colors";
import {usePlayer} from "../services/usePlayer";

interface WordCardProps {
    word: WordModel;
    isLeader: boolean;
}

interface WordComponentProps {
    game: GameModel;
    word: WordModel;
    player : PlayerModel | undefined;
    changeWordSelected: (isSelected: boolean) => void
}


const WordCard = styled.button`
    color: ${(props: WordCardProps) => props.isLeader || props.word.isUnveiled
    ? getColor(props.word.wordType)
    : "black"};
    width : 80%;
    height : 80%;
    margin : auto;
    border-radius : 10px;
    font-size : ${(props: WordCardProps) => props.word.isUnveiled ? '1rem' : '2rem'};
    border: 5px solid ${(props: WordCardProps) =>
    props.word.isSelected
        ? 'black'
        : (props.word.isUnveiled ? getBorderColor(props.word.wordType) : 'white')};
    background-color: whitesmoke;
        
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
                  isLeader={isLeader}>
            {word.text}</WordCard>
    </div>
}

export default WordComponent;