import styled from 'styled-components';

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ItemName = styled.div<{ $highlight?: boolean }>`
    padding-left: 10px;
    font-weight: 600;
    text-decoration: ${(props) => (props.$highlight ? 'underline' : 'auto')};
`;

export const ItemDescription = styled.div`
    padding-left: 10px;
`;

const Items = ({ items, highlightNames }: any) => {
    return (
        <ItemsDiv>
            {items?.map((item: any) => {
                return (
                    <div key={item.name}>
                        <ItemName $highlight={highlightNames}>
                            {item.name}
                        </ItemName>
                        <ItemDescription>{item.description}</ItemDescription>
                    </div>
                );
            })}
        </ItemsDiv>
    );
};

export default Items;
