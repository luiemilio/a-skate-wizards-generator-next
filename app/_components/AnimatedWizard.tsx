import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const AnimatedImage = styled(Image)<{ $doTrick: boolean; $trick: string; animationid: string }>`
    animation: ${(props) => {
        if (props.$trick === 'front-flip' && props.$doTrick) {
            return `front-flip-${props.animationid} 2000ms`;
        }

        if (props.$trick === 'blast-off' && props.$doTrick) {
            return `blast-off-${props.animationid} 5000ms`;
        }

        return '';
    }};

    @keyframes ${(props) => `front-flip-${props.animationid}`} {
        0% {
            transform: translateX(0%) translateY(0%) rotate(0turn);
        }

        10% {
            transform: translateX(100%) translateY(-50%) rotate(1turn);
        }

        20% {
            transform: translateX(200%) translateY(-75%) rotate(2turn);
        }

        30% {
            transform: translateX(300%) translateY(-50%) rotate(3turn);
        }

        40% {
            transform: translateX(400%) translateY(-0%) rotate(0turn);
        }

        50% {
            transform: translateX(400%) translateY(-0%) rotate(0turn);
        }
    }

    @keyframes ${(props) => `blast-off-${props.animationid}`} {
        0% {
            transform: translateX(0%) translateY(0%) rotate(0turn);
        }

        50% {
            transform: translateX(0%) translateY(-1000%) rotate(2.5turn);
        }

        100% {
            transform: translateX(0%) translateY(0%) rotate(5turn);
        }
    }
`;

export const AnimatedWizard = ({ animationid, src, alt, width, height, trick }: any) => {
    const [doTrick, setDoTrick] = useState(false);

    const onClick = () => {
        setDoTrick(true);
    };

    const onAnimationEnd = () => {
        setDoTrick(false);
    };

    return (
        <AnimatedImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            onClick={onClick}
            $trick={trick}
            $doTrick={doTrick}
            onAnimationEnd={onAnimationEnd}
            animationid={animationid}
        />
    );
};
