function addressExtractorForGeocoding({ address_components }: any) {
    let address: any = {};
    address_components.forEach((component: any) => {
        if (component.types.includes("street_number")) {
            address.buildingNo = component.long_name;
        } else if (component.types.includes("route")) {
            address.roadName = component.long_name;
        } else if (component.types.includes("locality")) {
            address.city = component.long_name;
        } else if (component.types.includes("administrative_area_level_1")) {
            address.state = component.long_name;
        } else if (component.types.includes("country")) {
            address.country = component.long_name;
        } else if (component.types.includes("postal_code")) {
            address.pincode = component.long_name;
        }
    });
    return address;
}

export function reduceGeocodingData(data: any[]) {
    const addresses = data.map(addrs => addressExtractorForGeocoding(addrs));
    return addresses
}