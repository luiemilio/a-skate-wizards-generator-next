import styled from 'styled-components';
import { useState } from 'react';
import { Button } from './Buttons';
import type { Item } from '../_lib/utils';

interface ItemPickerProps {
    items: Item[];
    onItemAdd: (item: Item) => void;
    title: string;
}

const ItemPickerDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 5px;
    gap: 5px;
    /* height: 330px; */
`;

const Header = styled.div`
    align-self: center;
    font-size: 1.5em;
    font-weight: 600;
`;

const AddButton = styled(Button)`
    width: fit-content;
    align-self: center;
    padding: 5px;
    font-size: 1em;
`;

const Spells = styled.div`
    display: flex;
`;

const SpellsUl = styled.ul`
    max-height: 180px;
    max-width: 160px;
    border: 1px solid black;
    border-radius: 4px;
    list-style-type: none;
    overflow-x: scroll;
`;

const SpellLi = styled.li<{ $selected?: boolean }>`
    cursor: pointer;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        background-color: ${(props) => (props.$selected ? 'gray' : 'lightgray')};
    }

    background-color: ${(props) => (props.$selected ? 'gray' : 'none')};
`;

const Description = styled.div`
    width: 270px;
    height: 180px;
    padding: 0px 0px 0px 10px;
`;

const ItemPicker = ({ items, onItemAdd, title }: ItemPickerProps) => {
    const [selectedItem, setSelectedItem] = useState<Item>(items[0]);

    const onClick = (item: Item) => {
        setSelectedItem(item);
    };

    return (
        <ItemPickerDiv>
            <Header>{title}</Header>
            <Spells>
                <SpellsUl>
                    {items.map((item) => {
                        const { name } = item;
                        const key = `${name}-${Math.random() * 1000}`;

                        return (
                            <SpellLi
                                $selected={item?.name === selectedItem.name}
                                onClick={(e: any) => onClick(item)}
                                key={key}
                                value={name}
                            >
                                {name}
                            </SpellLi>
                        );
                    })}
                </SpellsUl>
                <Description>{selectedItem.description}</Description>
            </Spells>
            <AddButton
                onClick={() => {
                    onItemAdd(selectedItem);
                }}
            >
                Add
            </AddButton>
        </ItemPickerDiv>
    );
};

export default ItemPicker;
