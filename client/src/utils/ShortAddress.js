export const shortenAddress = (address) => `${address.slice(0, 4)}...${address.slice(address.length - 7)}`;

export const currentAddress = (address) => `${address}`;