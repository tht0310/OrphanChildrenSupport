

  export const convertPublicAddressToString = (address) => {
    let tempAddress = [];
    if (address) {
      tempAddress = address.split("-");
      tempAddress.reverse();
    }
    return tempAddress[1];
  };
  
