function waysToReturnChange(denominations: number[], numOfCoins: number, amount: number): number {
    if (numOfCoins < 0)
        return 0;
    if (amount === 0)
        return 1;
    if (amount < 0)
        return 0;
    if (numOfCoins < 0 && amount > 0)
        return 0;

    return (
        waysToReturnChange(denominations, numOfCoins, amount - denominations[numOfCoins])
        + waysToReturnChange(denominations, numOfCoins - 1, amount)
    );
}

function getCoins(moves: number[], sumsOfMoves: Set<number>): number[] {
    const allCoins: number[] = [...new Set([...moves, ...Array.from(sumsOfMoves)])].sort((a, b) => a - b);
    const reducedCoins: Set<number> = new Set(allCoins);
    allCoins.forEach((x) => {
        allCoins.forEach((y) => {
            if (x !== y && x % y === 0)
                reducedCoins.delete(x);
        });
    });
    return [...reducedCoins];
}

export function calculateSumsOfMoves(moves: number[], sumsOfMoves: Set<number>): Set<number> {
    moves.forEach(x => moves.forEach((n) => {
        if (n !== x)
            sumsOfMoves.add(x + n);
    }));
    return sumsOfMoves;
}

export function removeBadOptions(moves: number[], sumsOfMoves: Set<number>, possibleNumbers: boolean[]): boolean[] {
    const coins: number[] = getCoins(moves, sumsOfMoves); // named after the "Coin Problem"
    return possibleNumbers.map((available: boolean, n: number): boolean => {
        // no need to check an already invalidated option
        if (!available)
            return false;

        return waysToReturnChange(coins, coins.length - 1, n) === 0;
    });
}
