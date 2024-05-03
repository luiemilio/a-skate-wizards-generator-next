import styled from 'styled-components';
import { CharacterContext, Item, getNextId, textFont } from '../_lib/utils';
import Modal from './Modal';
import { useContext, useState } from 'react';
import { Button } from './Buttons';

interface AddItemModalProps {
    onClose: () => void;
    onItemAdd: (item: Item) => void;
    title: string;
}

const AddItemDiv = styled.div`
    border: 5px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    gap: 5px;
`;

const Header = styled.div`
    align-self: center;
    font-size: 1.5em;
    font-weight: 600;
`;

const AddButton = styled(Button)`
    width: fit-content;
    padding: 5px;
    font-size: 1em;
`;

const NameInput = styled.input`
    width: 200px;
    font-size: 0.8em;
    border: none;
    border: 1px solid black;
    border-radius: 4px;
`;

const DescriptionInput = styled.textarea`
    width: 100%;
    height: 200px;
    resize: none;
    font-size: 0.8em;
    border: none;
    border: 1px solid black;
    border-radius: 4px;
`;

const ItemAdder = ({ onItemAdd, title }: AddItemModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <AddItemDiv>
            <Header>{title}</Header>
            <label>Name</label>
            <NameInput
                className={textFont.className}
                type='text'
                name='item'
                onChange={(e) => setName(e.currentTarget.value)}
            />
            <label>Description</label>
            <DescriptionInput
                className={textFont.className}
                onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <AddButton onClick={() => onItemAdd({ name, description })}>Add</AddButton>
        </AddItemDiv>
    );
};

export default ItemAdder;
