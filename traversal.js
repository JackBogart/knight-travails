const DIRECTIONS = [
  [2, 1],
  [2, -1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [1, -2],
  [-1, -2],
];

function isValidPosition(position) {
  const [row, col] = position;
  return 0 <= row && row <= 7 && 0 <= col && col <= 7;
}

function getPath(key, parents) {
  if (parents[key] === null) {
    return [key];
  }

  const path = getPath(parents[key], parents);
  path.push(key);
  return path;
}

function knightMoves(start, end) {
  if (!isValidPosition(start) || !isValidPosition(end)) {
    throw new Error('Start or goal square is out of bounds');
  }
  const queue = [start];
  const parents = {};
  parents[`[${start}]`] = null;

  while (queue.length !== 0) {
    const [row, col] = queue.shift();

    if (row === end[0] && col === end[1]) {
      return getPath(`[${row},${col}]`, parents);
    }

    for (const [dRow, dCol] of DIRECTIONS) {
      const currRow = row + dRow;
      const currCol = col + dCol;

      if (
        isValidPosition([currRow, currCol]) &&
        !parents.hasOwnProperty(`[${currRow},${currCol}]`)
      ) {
        parents[`[${currRow},${currCol}]`] = `[${row},${col}]`;
        queue.push([currRow, currCol]);
      }
    }
  }

  throw new Error('No valid path found'); // This should never be reached
}

function printResults(path) {
  console.log(`You made it ${path.length} moves! Here's your path:`);
  path.forEach((vertex) => {
    console.log(`  ${vertex}`);
  });
}

export { knightMoves, printResults };
