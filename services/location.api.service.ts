import { GOOGLE_API_KEY } from "@/constants/variables";

export const reverseGeocode = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const address = data.results[0].formatted_address;
            console.log("Address:", address);
            return address;
        } else {
            console.log("No address found for the given coordinates.");
        }
    } catch (error) {
        console.warn("Error in reverse geocoding:", error);
    }
};


export const getPlaceName = async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const place = data.results[0]; // Closest place
            console.log("Place Name:", place.name); // Name of the place
            console.log("Address:", place.vicinity); // Vicinity (general area)
            return place.name;
        } else {
            console.log("No places found nearby.");
        }
    } catch (error) {
        console.warn("Error fetching place name:", error);
    }
};

export const getPlaceDetails = async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result) {
            console.log("Place Name:", data.result.name);
            console.log("Full Address:", data.result.formatted_address);
        }
    } catch (error) {
        console.warn("Error fetching place details:", error);
    }
};


