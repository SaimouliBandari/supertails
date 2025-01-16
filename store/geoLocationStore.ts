import { create } from 'zustand';

interface GeoLocation {
    latitude: number;
    longitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
}

interface GeoLocationStore {
    location: GeoLocation | null;
    address: any | null;
    setLocation: (location: GeoLocation) => void;
    clearLocation: () => void;
    setAddress: (address: any) => void;
    clearAddress: () => void;
    setLocationAndAddress: (location: GeoLocation, address: any) => void;
    clearLocationAndAddress: () => void;
}

const useGeoLocationStore = create<GeoLocationStore>((set) => ({
    location: null,
    address: null,
    setLocation: (location) => set({ location }),
    setAddress: (address) => set({ address }),
    clearLocation: () => set({ location: null }),
    clearAddress: () => set({ address: null }),
    setLocationAndAddress: (location, address) => set({ location, address }),
    clearLocationAndAddress: () => set({ location: null, address: null }),
}));

export default useGeoLocationStore;