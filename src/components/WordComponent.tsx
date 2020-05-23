import React, {FC} from 'react';
import {WordModel} from "../types/gameTypes";
import {Checkbox, FormControlLabel} from "@material-ui/core";

interface WordComponentProps {
    word : WordModel,
    changeWordSelected :(isSelected : boolean) => void
}

const WordComponent : FC<WordComponentProps> = ({word, changeWordSelected}) => {

    const [selected, setSelected] = React.useState(word.isSelected);

    function handleSelectedChange(checked: boolean) {
        setSelected(checked);
        changeWordSelected(checked);
    }

    return (
        <div>
            <p>{word.id}</p>
            <FormControlLabel
                control={<Checkbox checked={selected} onChange={(event) => handleSelectedChange(event.target.checked)} name="slected" />}
                label="Selected"
            />
        </div>
    );
}

export default WordComponent;