export const shortenAddress = (address) => {
    if (!address) return ''; 
    return `${address.slice(0, 4)}...${address.slice(address.length - 7)}`;
  };

export const currentAddress = (address) =>{
    if (!address) return ''; 
    return `${address}`;
    
} 