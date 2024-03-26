import {
    ITEMS,
    RANDO_SPELLS,
    BOOTLEG_SPELLS,
    STARTING_STATS,
    PERMANENT_SPELLS,
} from "./constants";

export type Item = {
    uuid?: string;
    name: string;
    description?: string;
};

export type AbilityScores = {
    strength: number;
    dexterity: number;
    will: number;
};

export type Status = {
    level: number;
    hp: number;
    defense: number;
    attackBonus: number;
    abilityScores: AbilityScores;
    items: Item[];
    randoSpells: Item[];
    bootlegSpells: Item[];
    permSpells: Item[];
};

export type InfoBoxes = {
    abilities: Item[];
    randoSpells: Item[];
    permSpells: Item[];
    bootlegSpells: Item[];
    items: Item[];
    level: number;
    newLevel: number;
    status: Status;
    updateStatus: (status: Status) => void;
};

export type StatusOptions = Partial<Status>;

export const convertObjToItems = (obj: any): Item[] => {
    return Object.entries(obj).map(([key, value]) => {
        return {
            name: normalizePropName(key),
            description: `${value}`,
        };
    });
};

const getRandomElement = (arr: unknown[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getAbilityScores = () => {
    const abilityScores: number[][] = [
        [2, 1, 0],
        [2, 0, 1],
        [1, 2, 0],
        [0, 2, 1],
        [1, 0, 2],
        [0, 1, 2],
    ];

    const abilities = getRandomElement(abilityScores) as number[];

    return {
        strength: abilities[0],
        dexterity: abilities[1],
        will: abilities[2],
    };
};

export const getAbilityScoreAsItems = () => {
    const abilityScores = getAbilityScores();
    return convertObjToItems(abilityScores);
};

export const getItems = (): Item[] => {
    const selectedItems: Item[] = [];

    while (selectedItems.length < 3) {
        const rolledItem = getRandomElement(ITEMS) as Item;

        if (
            !selectedItems.some(
                (selectedItem) => selectedItem.name === rolledItem.name
            )
        ) {
            selectedItems.push(rolledItem);
        }
    }

    return selectedItems;
};

export const getRandoSpell = (): Item => {
    const name = RANDO_SPELLS.map((wordList) => getRandomElement(wordList)).join(
        " "
    );

    return {
        name,
    };
};

export const getBootlegSpell = (): Item => {
    return getRandomElement(BOOTLEG_SPELLS) as Item;
};

const normalizePropName = (str: string): string => {
    if (str.length <= 2) {
        return str.toUpperCase();
    }

    let finalWord = "";

    for (let i = 0; i < str.length; i++) {
        const letter = str.charAt(i);

        if (i === 0) {
            finalWord += letter.toUpperCase();
        } else if (letter === letter.toUpperCase()) {
            finalWord += ` ${letter}`;
        } else {
            finalWord += letter;
        }
    }

    return finalWord;
};

export const getStartingStatsAsItems = () => {
    return convertObjToItems(STARTING_STATS);
};

export const getInitialStatus = (): any => {
    const { hp, defense, attackBonus } = STARTING_STATS;
    const abilityScores = getAbilityScores();
    const randoSpell = getRandoSpell();
    const bootlegSpell = getBootlegSpell();
    const items = getItems();

    const levelMap = new Map();

    levelMap.set(1, {
        hp,
        defense,
        attackBonus,
        abilityScores,
        randoSpells: [randoSpell],
        bootlegSpells: [bootlegSpell],
        permSpells: PERMANENT_SPELLS,
        items
    });

    return levelMap;
};

export const generateRandomKey = (): string => {
    const uuid = crypto.randomUUID();
    return uuid;
};
