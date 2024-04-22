const mapIdLookup = {
    "inferno": "6625eef438ed4e24cfa8455b",
    "overpass": "6625dce68ef316288de58702",
    "dust2": "6625eebc38ed4e24cfa84555",
    "mirage": "6625eeab38ed4e24cfa84553",
    "nuke": "6625eed338ed4e24cfa84557",
    "train": "6625eee138ed4e24cfa84559"
};

export function getMapId(mapName) {
    return mapIdLookup[mapName.toLowerCase()] || null;
}