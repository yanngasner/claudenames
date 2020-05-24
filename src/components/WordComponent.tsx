import React, {FC} from 'react';
import {WordModel} from "../types/gameTypes";
import {WordType} from "../types/enums";
import './WordComponent.css'

interface WordComponentProps {
    word : WordModel,
    changeWordSelected :(isSelected : boolean) => void
}

const WordComponent : FC<WordComponentProps> = ({word, changeWordSelected}) => {

    const handleSelectedChange = (checked: boolean) => {
        if (!word.isUnveiled)
            changeWordSelected(checked);
    }

    const getWordTypeStyle = () : string => {
        const prefix = `${word.isSelected ? 'selected-' : ''}${word.isUnveiled ? 'unveiled-' : ''}`
        switch (word.wordType) {
            case WordType.Blue : return prefix+'blue-word-component';
            case WordType.Red : return prefix+'red-word-component';
            case WordType.Unassigned : return prefix+'unassigned-word-component';
            case WordType.Forbidden : return prefix+'forbidden-word-component';
        }
    }

    return (
        <div className={`word-component 
        ${word.isUnveiled ? 'unveiled-word-component' : 'active-word-component'} 
        ${word.isSelected ? 'selected-word-component' : ''} 
        ${getWordTypeStyle()}`}
        onClick={() => handleSelectedChange(!word.isSelected)}>
            <p unselectable="on">{word.text}</p>
        </div>
    );
}

export default WordComponent;