import React, {FC} from 'react';
import {PlayerModel, WordModel} from "../types/gameTypes";
import styled from 'styled-components';
import {getColor, getBorderColor} from "../resources/colors";

interface WordCardProps {
    word: WordModel;
    player : PlayerModel;
}

interface WordComponentProps extends WordCardProps {
    changeWordSelected: (isSelected: boolean) => void
}


const WordCard = styled.button`
    color: ${(props: WordCardProps) => props.player.isLeader || props.word.isUnveiled
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
        
    &:focus, &:active {
        outline: 0;
    }
    
    &:hover {
        cursor:${(props: WordCardProps) => props.word.isUnveiled || !props.player.isLeader ? 'initial' : 'pointer'};
`;

const WordComponent: FC<WordComponentProps> = ({word, player, changeWordSelected}) => {

    const handleSelectedChange = () => {
        if (!word.isUnveiled)
            changeWordSelected(!word.isSelected);
    }

    return <div className={`word-component`}>
        <WordCard disabled={word.isUnveiled || !player.isLeader} onClick={() => handleSelectedChange()}
                  word={word}
                  player={player}>
            {word.text}</WordCard>
    </div>
}

export default WordComponent;