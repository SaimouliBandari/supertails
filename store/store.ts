import { create } from 'zustand';

interface IGeoLocationRegion {
    latitude: number;
    longitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
}

interface IStore {
    location: IGeoLocationRegion | null;
    address: any | null;
    isLocationPermissionGranted: boolean;
    setLocation: (location: IGeoLocationRegion) => void;
    clearLocation: () => void;
    setAddress: (address: any) => void;
    clearAddress: () => void;
    setLocationAndAddress: (location: IGeoLocationRegion, address: any) => void;
    clearLocationAndAddress: () => void;
    setIsLocationPermissionGranted: (isLocationPermissionGranted: boolean) => void;
}

const useStore = create<IStore>((set) => ({
    location: null,
    address: null,
    isLocationPermissionGranted: false,
    setLocation: (location: IGeoLocationRegion) => set({ location }),
    setAddress: (address: any) => set({ address }),
    clearLocation: () => set({ location: null }),
    clearAddress: () => set({ address: null }),
    setLocationAndAddress: (location: IGeoLocationRegion, address: any) => set({ location, address }),
    clearLocationAndAddress: () => set({ location: null, address: null }),
    setIsLocationPermissionGranted: (isLocationPermissionGranted: boolean) => set({ isLocationPermissionGranted }),
}));

export default useStore;