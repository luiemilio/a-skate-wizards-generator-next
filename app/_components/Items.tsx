import styled from 'styled-components';

const ItemsDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 450px;
`;

export const ItemName = styled.div`
    padding-left: 10px;    
    font-weight: 600;
`;

export const ItemDescription = styled.div`
    padding-left: 10px;
`;

const Items = ({ items }: any) => {
    return (
        <ItemsDiv>
            {items?.map((item: any) => {
                return (
                    <div key={item.name}>
                        <ItemName>{item.name}</ItemName>
                        <ItemDescription>{item.description}</ItemDescription>
                    </div>
                );
            })}
        </ItemsDiv>
    );
};

export default Items;
