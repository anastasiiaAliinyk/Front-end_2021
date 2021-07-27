export const getUniqueString = () => {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return array.join('');
}

export const CUSTOMERS_PER_PAGE = 5;