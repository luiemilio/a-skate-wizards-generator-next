import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 380px;

    @media all and (max-width: 1349px) {
    }

    @media all and (max-width: 899px) {
        height: 100%;
        padding-bottom: 10px;
        margin-bottom: 5px;
    }
`;

export const SectionName = styled.div`
    align-self: center;
    font-weight: 600;
    font-size: 1.2em;
    padding-bottom: 10px;
`;
