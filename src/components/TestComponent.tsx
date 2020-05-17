import React, {useState} from 'react';

interface Props {
    text: string;
    onClick : () => void
}

const TestComponent: React.FC<Props> = ({text, onClick}) => {
    const [s1, setS1] = useState(null)

    return (
        <div>
            <h1>{text}</h1>
            <input onClick={onClick} />
        </div>
    );
}

export default TestComponent;