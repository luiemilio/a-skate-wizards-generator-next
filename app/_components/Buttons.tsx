import { styled } from 'styled-components';
import { textFont } from '../_lib/utils';
import minus from '../_assets/minus.svg';
import plus from '../_assets/plus.svg';
import Image from 'next/image';

export const NewButton = styled.button.attrs({ className: textFont.className })`
    border-radius: 4px;
    border: none;
    background-color: black;
    cursor: pointer;
    color: white;
`;

export const LevelButton = styled(NewButton)<{
    $hidden?: boolean;
    $disabled?: boolean;
}>`
    pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
    background: ${(props) => (props.$hidden ? 'none' : 'show')};
    height: 25px;
    width: 25px;
`;

export const BailOutButton = styled(NewButton)<{ $rotate?: boolean }>`
    background-color: black;
    color: white;
    border-radius: 4px;
    text-align: center;
    padding: 5px;
    border: none;
    font-size: 0.9em;
    cursor: pointer;
    animation: ${(props) => (props.$rotate ? 'rotate 0.5s' : '')};

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const TrickButton = styled(NewButton)<{ $rotate?: boolean }>`
    background-color: black;
    color: white;
    border-radius: 4px;
    text-align: center;
    padding: 5px;
    border: none;
    font-size: 0.9em;
    cursor: pointer;
    height: 100%;

    animation: ${(props) => (props.$rotate ? 'rotate 0.5s' : '')};

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const LevelUpButton = (props: any) => {
    return (
        <LevelButton {...props}>
            <Image width={25} height={25} src={plus.src} alt=""></Image>
        </LevelButton>
    );
};

export const LevelDownButton = (props: any) => {
    return (
        <LevelButton {...props}>
            <Image width={25} height={25} src={minus.src} alt=""></Image>
        </LevelButton>
    );
};
