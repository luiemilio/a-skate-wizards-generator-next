import styled from 'styled-components';
import { CharacterContext, getRandomStats, textFont } from '../_lib/utils';
import { useContext } from 'react';

const BailOutButton = styled.button`
    background-color: black;
    color: white;
    border-radius: 4px;
    text-align: center;
    padding: 8px;
    border: none;
    font-size: 1.2em;
`;

const BailOut = () => {
    const { updateLevelHistory, setLevel } = useContext(CharacterContext);

    const bailOut = () => {
        setLevel(1);
        const initialStats = getRandomStats();
        updateLevelHistory(1, initialStats);
    };

    return (
        <>
            <BailOutButton className={textFont.className} onClick={bailOut}>
                Bail Out!
            </BailOutButton>
        </>
    );
};

export default BailOut;
