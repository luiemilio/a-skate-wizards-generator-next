import { styled } from "styled-components";
import minus from '../../../assets/minus.svg';
import plus from '../../../assets/plus.svg';
import Image from "next/image";

const Button = styled.button<{ $hidden?: boolean, $disabled?: boolean }>`
    border-radius: 4px;
    border: none;
    background-color: black;
    height: 25px;
    width: 25px;
    pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
    background: ${props => props.$hidden ? 'none' : 'show'};;
`;

export const LevelUpButton = (props: any) => {
    return (
        <Button {...props}>
            <Image width={25} height={25} src={plus.src} alt=''></Image>
        </Button>
    )
};

export const LevelDownButton = (props: any) => {
    return (
        <Button {...props}>
            <Image width={25} height={25} src={minus.src} alt=''></Image>
        </Button>
    )
};