import React, {FC} from 'react';
import {WordModel} from "../types/gameTypes";
import {Checkbox, FormControlLabel} from "@material-ui/core";

interface WordComponentProps {
    word : WordModel,
    changeWordSelected :(isSelected : boolean) => void
}

const WordComponent : FC<WordComponentProps> = ({word, changeWordSelected}) => {

    const handleSelectedChange = (checked: boolean) => changeWordSelected(checked);

    return (
        <div className='word-component'>
            <p style={word.isUnveiled ? {fontWeight:"bold"} : {}}>{word.id}</p>
            <FormControlLabel
                control={<Checkbox checked={word.isSelected} onChange={(event) => handleSelectedChange(event.target.checked)} name="selected" />}
                label="Selected"
            />
        </div>
    );
}

export default WordComponent;