import { styled } from 'styled-components';
import { textFont } from '../_lib/utils';
import minus from '../_assets/minus.svg';
import plus from '../_assets/plus.svg';
import Image from 'next/image';

export const Button = styled.button.attrs({ className: textFont.className })`
    border-radius: 4px;
    border: none;
    background-color: black;
    cursor: pointer;
    color: white;
`;

export const LevelButton = styled(Button)<{
    $hidden?: boolean;
    $disabled?: boolean;
}>`
    pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
    opacity: ${(props) => (props.$hidden ? 0 : 1)};
    height: 25px;
    width: 25px;
`;

export const GnarlyButton = styled(Button)<{ $rotate?: boolean }>`
    text-align: center;
    padding: 5px;
    font-size: 0.9em;
    height: 100%;
`;

export const BailOutButton = styled(GnarlyButton)<{ $rotate?: boolean }>`
    animation: ${(props) => (props.$rotate ? 'rotateBailOut 0.5s' : '')};

    @keyframes rotateBailOut {
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const TrickButton = styled(GnarlyButton)<{ $rotate?: boolean }>`
    animation: ${(props) => (props.$rotate ? 'rotateTrick 0.5s' : '')};

    @keyframes rotateTrick {
        100% {
            transform: rotate(-360deg);
        }
    }
`;

export const LevelUpButton = ({ imageWidth, imageHeight, ...props }: any) => {
    return (
        <LevelButton {...props}>
            <Image
                width={imageWidth || 25}
                height={imageHeight || 25}
                src={plus.src}
                alt=''
            ></Image>
        </LevelButton>
    );
};

export const LevelDownButton = ({ imageWidth, imageHeight, ...props }: any) => {
    return (
        <LevelButton {...props}>
            <Image
                width={imageWidth || 25}
                height={imageHeight || 25}
                src={minus.src}
                alt=''
            ></Image>
        </LevelButton>
    );
};

export const StyledLevelDownButton = styled(LevelDownButton)`
    width: 20px;
    height: 20px;
`;

export const RemoveItemButton = (props: any) => {
    return (
        <StyledLevelDownButton {...props} imageHeight={20} imageWidth={20}></StyledLevelDownButton>
    );
};
