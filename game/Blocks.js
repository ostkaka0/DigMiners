
BlockTypes = {
    FOREGROUND: 0,
    BACKGROUND: 1
}

Blocks = {};

Blocks.Null = {
    name: "Air",
    isSolid: false,
    hardness: 0,
    type: -1
}

Blocks.StoneWall = {
    name: "Stone Wall",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
};

Blocks.WoodCrate = {
    name: "Wood Crate",
    isSolid: true,
    hardness: 1.0,
    type: BlockTypes.FOREGROUND
};

Blocks.StoneFloor = {
    name: "Stone Floor",
    isSolid: false,
    hardness: 1.0,
    type: BlockTypes.BACKGROUND
};
