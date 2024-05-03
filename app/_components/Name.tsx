import { useContext } from 'react';
import styled from 'styled-components';
import { CharacterContext } from '../_lib/utils';

const NameDiv = styled.div`
    display: flex;
    font-size: 1em;
    align-items: center;
    align-self: flex-start;
    gap: 5px;
`;

const NameLabel = styled.p`
    font-size: 1.3em;
    font-weight: 600;
`;

const NameP = styled.p``;

const Name = () => {
    const { name } = useContext(CharacterContext);

    return (
        <NameDiv>
            <NameLabel>Name:</NameLabel>
            <NameP>{name}</NameP>
        </NameDiv>
    );
};

export default Name;
