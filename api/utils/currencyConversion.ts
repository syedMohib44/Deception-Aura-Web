
export const DollarToCents = (dollar: number) => {
    if (dollar === null || dollar === undefined)
        throw new Error('Dollar cannot be null or undefined');

    return dollar *= 100;
}