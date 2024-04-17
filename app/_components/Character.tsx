'use client';
import Abilities from './Abilities';
import RandoSpells from './RandoSpells';
import styled from 'styled-components';
import PermSpells from './PermSpells';
import Equipment from './Equipment';
import BootlegSpells from './BootlegSpells';

const CharacterMainDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;

const CharacterTopAndBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const Character = () => {
    return (
        <CharacterMainDiv>
            <CharacterTopAndBottom>
                <Abilities></Abilities>
                <PermSpells></PermSpells>
                <Equipment></Equipment>
            </CharacterTopAndBottom>
            <CharacterTopAndBottom>
                <RandoSpells></RandoSpells>
                <BootlegSpells></BootlegSpells>
            </CharacterTopAndBottom>
        </CharacterMainDiv>
    );
};

export default Character;
