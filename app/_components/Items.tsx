import styled from 'styled-components';
import { SavedItem, Item } from '../_lib/utils';
import { RemoveItemButton } from './Buttons';

export interface ItemsProps {
    items: SavedItem[];
    highlightNames?: boolean;
    onItemDeletion?: (item: SavedItem) => void;
    $removableItems?: boolean;
}

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const ItemNameDiv = styled.div<{ $highlight?: boolean; $bold?: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;
    padding-left: 10px;
    font-weight: ${(props) => (props.$bold ? '600' : 'auto')};
    text-decoration: ${(props) => (props.$highlight ? 'underline' : 'auto')};
`;

export const ItemName = ({
    $highlight,
    name,
    $removableItems,
    $bold,
    deleteItem,
    children
}: {
    $highlight?: boolean;
    name: string;
    $removableItems?: boolean;
    deleteItem?: () => void;
    $bold?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <ItemNameDiv $bold={$bold} $highlight={$highlight}>
            {$removableItems && (
                <RemoveItemButton
                    onClick={() => (deleteItem ? deleteItem() : undefined)}
                ></RemoveItemButton>
            )}
            <p>{name}</p>
            {children}
        </ItemNameDiv>
    );
};

export const ItemDescription = styled.div`
    padding-left: 10px;
`;

export const Items = ({ items, highlightNames, onItemDeletion, $removableItems }: ItemsProps) => {
    return (
        <ItemsDiv>
            {items?.map((item) => {
                return (
                    <div key={`${item.name + Math.random() * 10000}`}>
                        <div>
                            <ItemName
                                $highlight={highlightNames}
                                name={item.name}
                                $removableItems={$removableItems}
                                deleteItem={() =>
                                    onItemDeletion ? onItemDeletion(item) : undefined
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
