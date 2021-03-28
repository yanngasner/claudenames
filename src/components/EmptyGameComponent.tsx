import React, {FC} from 'react';
import './GameComponent.css'
import '../App.css'
import {LeftBallButton, RightBallButton} from "./GameButtons";
import title from '../resources/CLAUDE_NAMES_title_v2.png';

interface EmptyGameComponentProps {
    changeMenuVisibility: () => void
    changeRulesVisibility: () => void
}

const EmptyGameComponent: FC<EmptyGameComponentProps> = ({changeMenuVisibility, changeRulesVisibility}) => {
        return (
        <div className={'game-component'}>
            <div className={'game-very-upper-container'}>
                <div className={'game-very-upper-title'}>
                    <img src={title} alt={'title'}/>
                </div>
            </div>
            <div className={'game-upper-container'}>
                <div className={'game-upper-left'}>
                    <LeftBallButton onClick={changeMenuVisibility}>Menu</LeftBallButton>
                </div>
                <div className={'game-upper-playing'}/>
                <div className={'game-upper-title'}>
                    <img src={title} alt={'title'}/>
                </div>
                <div className={'game-upper-players'}/>
                <div className={'game-upper-right'}>
                    <RightBallButton onClick={changeRulesVisibility}>Règles</RightBallButton>
                </div>
            </div>
            <div className='game-words-container'/>
            <div className={'game-lower-container'}/>
        </div>
    );
}

export default EmptyGameComponent;
