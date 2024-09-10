export const gridCells = n => {
    return n * 16;
}


export const isSpaceFree = (wall, x, y)=>{
    const str = `${x},${y}`;
    const isWall = wall.has(str);

    return !isWall;
}