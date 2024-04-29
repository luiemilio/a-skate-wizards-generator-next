import { CharacterContext, getRandomStats, textFont } from '../_lib/utils';
import { useContext, useState } from 'react';
import { BailOutButton } from './Buttons';

const BailOut = () => {
    const { updateLevelHistory, setLevel, setLevelling } = useContext(CharacterContext);
    const [rotate, setRotate] = useState(false);

    const bailOut = () => {
        setRotate(true);
        setLevelling(false);
        setLevel(1);
        const initialStats = getRandomStats();
        updateLevelHistory(1, initialStats);
    };

    return (
        <>
            <BailOutButton
                className={textFont.className}
                onClick={bailOut}
                $rotate={rotate}
                onAnimationEnd={() => setRotate(false)}
            >
                Bail out!
            </BailOutButton>
        </>
    );
};

export default BailOut;
