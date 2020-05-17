import React, {useState} from 'react';
import {db} from '../services/firebase';

// interface GameDescription {
//     name : string,
//     isActive : boolean,
// }

function Game() {

    const [name, setName] = useState("");

    const handleSubmit = async () => {
        await db.ref("games").push({
            name : name,
            isActive : true
        })
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>New game</h1>
                    <input placeholder="Game name" name="name" type="name" onChange={handleNameChange}
                           value={name}></input>
                    <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Game;