import styled from 'styled-components';
import { Item } from '../_lib/utils';
import { RemoveItemButton } from './Buttons';

export interface ItemsProps {
    items: Item[];
    highlightNames?: boolean;
    onItemDeletion?: (item: Item) => void;
    $removableItems?: boolean;
}

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const ItemNameDiv = styled.div<{ $highlight?: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;
    padding-left: 10px;
    font-weight: 600;
    text-decoration: ${(props) => (props.$highlight ? 'underline' : 'auto')};
`;

export const ItemName = ({
    $highlight,
    name,
    $removableItems,
    deleteItem
}: {
    $highlight?: boolean;
    name: string;
    $removableItems?: boolean;
    deleteItem?: () => void;
}) => {
    return (
        <ItemNameDiv $highlight={$highlight}>
            {$removableItems && (
                <RemoveItemButton
                    onClick={() => (deleteItem ? deleteItem() : undefined)}
                ></RemoveItemButton>
            )}
            <p>{name}</p>
        </ItemNameDiv>
    );
};

export const ItemDescription = styled.div`
    padding-left: 10px;
`;

export const Items = ({
    items,
    highlightNames,
    onItemDeletion,
    $removableItems
}: ItemsProps) => {
    return (
        <ItemsDiv>
            {items?.map((item: Item) => {
                return (
                    <div key={`${item.name + Math.random() * 10000}`}>
                        <div>
                            <ItemName
                                $highlight={highlightNames}
                                name={item.name}
                                $removableItems={$removableItems}
                                deleteItem={() =>
                                    onItemDeletion
                                        ? onItemDeletion(item)
                                        : undefined
                                }
                            ></ItemName>
                        </div>
                        <ItemDescription>{item.description}</ItemDescription>
                    </div>
                );
            })}
        </ItemsDiv>
    );
};

export default Items;
