import { create } from 'zustand';

interface IGeoLocationRegion {
    latitude: number;
    longitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
}

interface IAddress {
    address: string,
    pincode: string,
    city: string,
    state: string,
    houseFlat: string,
    buildingNo: string,
    roadName: string,
}

interface IUserDetails {
    receiverName: string,
    receiverPhone: string,
    petName: string,
}

interface IStore {
    location: IGeoLocationRegion | null;
    address: any | null;
    deliveryAddress: {
        address: IAddress,
        user: IUserDetails
    }
    isLocationPermissionGranted: boolean;
    setLocation: (location: IGeoLocationRegion) => void;
    clearLocation: () => void;
    setAddress: (address: any) => void;
    clearAddress: () => void;
    setLocationAndAddress: (location: IGeoLocationRegion, address: any) => void;
    clearLocationAndAddress: () => void;
    setIsLocationPermissionGranted: (isLocationPermissionGranted: boolean) => void;
    setDeliveryAddress: (address: IAddress, user: IUserDetails) => void,
    reset: () => void
}

const useStore = create<IStore>((set) => ({
    location: null, // rename to region
    address: null,
    isLocationPermissionGranted: false,
    deliveryAddress: {
        address: {
            address: '',
            pincode: '',
            city: '',
            state: '',
            houseFlat: '',
            buildingNo: '',
            roadName: ''
        },
        user: {
            receiverName: '',
            receiverPhone: '',
            petName: ''
        }
    },
    setLocation: (location: IGeoLocationRegion) => set({ location }),
    setAddress: (address: any) => set({ address }),
    clearLocation: () => set({ location: null }),
    clearAddress: () => set({ address: null }),
    setLocationAndAddress: (location: IGeoLocationRegion, address: any) => set({ location, address }),
    clearLocationAndAddress: () => set({ location: null, address: null }),
    setIsLocationPermissionGranted: (isLocationPermissionGranted: boolean) => set({ isLocationPermissionGranted }),
    setDeliveryAddress: (address: IAddress, user: IUserDetails) => set({ deliveryAddress: { address, user } }),
    reset: () => set((state) => ({
        location: null, // rename to region
        address: null,
        isLocationPermissionGranted: false,
        deliveryAddress: {
            address: {
                address: '',
                pincode: '',
                city: '',
                state: '',
                houseFlat: '',
                buildingNo: '',
                roadName: ''
            },
            user: {
                receiverName: '',
                receiverPhone: '',
                petName: ''
            }
        }
    }))
}));

export default useStore;