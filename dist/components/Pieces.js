"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pieces = {
    ca: {
        name: 'Cathedral',
        size: 0,
        structure: [
            [null, null, null, null, null],
            [null, null, 0, null, null],
            [null, 0, 0, 0, null],
            [null, null, 0, null, null],
            [null, null, 0, null, null]
        ]
    },
    ta: {
        name: 'Tavern',
        size: 1,
        structure: [
            [null, null, null],
            [null, 1, null],
            [null, null, null]
        ]
    },
    st: {
        name: 'Stable',
        size: 2,
        structure: [
            [null, 1, null],
            [null, 1, null],
            [null, null, null]
        ]
    },
    in: {
        name: 'Inn',
        size: 3,
        structure: [
            [null, 1, null],
            [null, 1, 1],
            [null, null, null]
        ]
    },
    br: {
        name: 'Bridge',
        size: 3,
        structure: [
            [null, 1, null],
            [null, 1, null],
            [null, 1, null]
        ]
    },
    sq: {
        name: 'Square',
        size: 4,
        structure: [
            [null, 1, 1],
            [null, 1, 1],
            [null, null, null]
        ]
    },
    ma: {
        name: 'Manor',
        size: 4,
        structure: [
            [null, 1, null],
            [1, 1, 1],
            [null, null, null]
        ]
    },
    ab: {
        name: 'Abbey',
        size: 4,
        structure: [
            [null, 1, null],
            [null, 1, 1],
            [null, null, 1]
        ]
    },
    if: {
        name: 'Infirmary',
        size: 5,
        structure: [
            [null, 1, null],
            [1, 1, 1],
            [null, 1, null]
        ]
    },
    cs: {
        name: 'Castle',
        size: 5,
        structure: [
            [1, null, 1],
            [1, 1, 1],
            [null, null, null]
        ]
    },
    to: {
        name: 'Tower',
        size: 5,
        structure: [
            [null, null, 1],
            [null, 1, 1],
            [1, 1, null]
        ]
    },
    ac: {
        name: 'Academy',
        size: 5,
        structure: [
            [null, 1, null],
            [1, 1, null],
            [null, 1, 1]
        ]
    },
};
exports.getPiece = (notation = '', player = 0) => {
    if (!notation) {
        return {
            notation: '',
            rotation: 0,
            structure: [],
            location: [],
            name: '',
            size: 0,
            player,
        };
    }
    const structure = ((player === -1 && (notation === 'ab' || notation === 'ac'))
        ? Pieces[notation].structure.map((row) => [...row].reverse())
        : Pieces[notation].structure)
        .map((row) => row.map((block) => block ? player : block));
    return Object.assign({}, Pieces[notation], { notation, rotation: 0, location: [], structure, player: notation === 'ca' ? 0 : player });
};
