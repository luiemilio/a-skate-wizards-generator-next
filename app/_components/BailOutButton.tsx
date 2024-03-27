import styled from 'styled-components';
import { CharacterContext, getInitialStatus, textFont } from '../_lib/utils';
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
    const { setStatsMap, setLevel } = useContext(CharacterContext);

    const bailOut = () => {
        setStatsMap(getInitialStatus());
        setLevel(1);
    }

    return (
        <>
            <BailOutButton className={textFont.className} onClick={bailOut}>Bail Out!</BailOutButton>
        </>
    );
};

export default BailOut;
