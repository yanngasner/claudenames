import React, {FC} from 'react';
import {WordModel} from "../types/gameTypes";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {WordType} from "../types/enums";

interface WordComponentProps {
    word : WordModel,
    changeWordSelected :(isSelected : boolean) => void
}

const WordComponent : FC<WordComponentProps> = ({word, changeWordSelected}) => {

    const handleSelectedChange = (checked: boolean) => changeWordSelected(checked);

    const getWordTypeStyle = () : string => {
        switch (word.wordType) {
            case WordType.Blue : return "blue-word-component";
            case WordType.Red : return "red-word-component";
            case WordType.Unassigned : return "unassigned-word-component";
            case WordType.Forbidden : return "forbidden-word-component";
        }
    }

    return (
        <div className={`word-component ${word.isUnveiled ? 'unveiled-word-component' : ''} ${getWordTypeStyle()}`}>
            <p>{word.text}</p>
            <Checkbox checked={word.isSelected} onChange={(event) => handleSelectedChange(event.target.checked)} />
        </div>
    );
}

export default WordComponent;