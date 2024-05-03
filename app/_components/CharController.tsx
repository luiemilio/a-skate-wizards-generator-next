import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ClickTrick from './TrickClick';
import BailOut from './BailOutButton';
import TrickModal from './TrickModal';
import Warehouse from './Warehouse';
import { Button } from './Buttons';

const CharButtons = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    button {
        height: 35px;
    }
`;

const WarehouseButton = styled(Button)`
    text-align: center;
    padding: 5px;
    font-size: 0.9em;
    height: 100%;
`;

const CharController = () => {
    const [showTrickModal, setShowTrickModal] = useState(false);
    const [showWarehouse, setShowWarehouse] = useState(false);
    {
        showTrickModal && <TrickModal onClose={() => setShowTrickModal(false)}></TrickModal>;
    }

    return (
        <CharButtons>
            {showTrickModal && <TrickModal onClose={() => setShowTrickModal(false)}></TrickModal>}
            {showWarehouse && <Warehouse onClose={() => setShowWarehouse(false)}></Warehouse>}
            <ClickTrick setShowTrickModal={setShowTrickModal}></ClickTrick>
            <BailOut></BailOut>
            <WarehouseButton onClick={() => setShowWarehouse(true)}>
                Wizard Warehouse
            </WarehouseButton>
        </CharButtons>
    );
};

export default CharController;
