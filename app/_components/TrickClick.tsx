import { TrickButton } from './Buttons';
import { textFont } from '../_lib/utils';
import { useState } from 'react';

const ClickTrick = ({
    setShowModal
}: {
    setShowModal: (boolean: boolean) => void;
}) => {
    const [rotate, setRotate] = useState(false);

    const trickClick = () => {
        setShowModal(true);
    };

    return (
        <TrickButton
            className={textFont.className}
            onClick={trickClick}
            $rotate={rotate}
            onAnimationEnd={() => setRotate(false)}
        >
            Click 4 Trick
        </TrickButton>
    );
};

export default ClickTrick;
