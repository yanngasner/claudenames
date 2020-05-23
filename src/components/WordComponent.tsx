import React, {FC} from 'react';
import {WordModel} from "../types/gameTypes";

interface WordComponentProps {
    word : WordModel
}

const WordComponent : FC<WordComponentProps> = ({word}) => {
    return (
        <div><p>{word.id}</p></div>
    );
}

export default WordComponent;