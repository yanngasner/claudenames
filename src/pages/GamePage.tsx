import React, {FC} from 'react';

interface GameProps {
    id : string
}

const GamePage:FC<GameProps> = ({...props}) => {
    return (
        <div><p>{`hola${props.id}`}</p></div>
    );
}

export default GamePage;