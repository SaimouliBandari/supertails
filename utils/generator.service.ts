export function generateAddress(address: any) {
    let region = `${address?.subregion} ,${address?.region}`;
    if (address?.subregion == address?.region) {
        region = address?.region;
    }

    return `${address?.district}, ${address?.city}, ${region}, ${address?.country}`;
}