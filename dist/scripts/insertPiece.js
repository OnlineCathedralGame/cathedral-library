"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseBorders_1 = require("./parseBorders");
const territoryAssignment_1 = require("./territoryAssignment");
const insertInGrid = (grid, structure, location) => {
    const [centreY, centreX] = location;
    const deviation = Math.floor(structure.length / 2);
    return grid.map((row, gridY) => {
        if (gridY < centreY - deviation || gridY > centreY + deviation) {
            return row;
        }
        const pieceY = gridY - centreY + deviation;
        return row.map((block, gridX) => {
            if (gridX < centreX - deviation || gridX > centreX + deviation) {
                return block;
            }
            const pieceX = gridX - centreX + deviation;
            return structure[pieceY][pieceX] === null ? block : structure[pieceY][pieceX];
        });
    });
};
const insertPiece = (grids, piece) => {
    const { StructureGrid, PieceGrid, BorderGrid } = grids;
    const { structure, location, name } = piece;
    const borders = parseBorders_1.default(structure);
    if (!location || !name) {
        return grids;
    }
    const newStructureGrid = insertInGrid(StructureGrid, structure, location);
    const newPieceGrid = insertInGrid(PieceGrid, [[piece]], location);
    const newBorderGrid = insertInGrid(BorderGrid, borders, location);
    return {
        StructureGrid: territoryAssignment_1.default(newStructureGrid, newPieceGrid),
        PieceGrid: newPieceGrid,
        BorderGrid: newBorderGrid,
    };
};
exports.default = insertPiece;
