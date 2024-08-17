import { create } from 'zustand'

interface GlobalState {
    title: string;
    setTitle: (newTitle: string) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
    title: 'Lion App',
    setTitle: (newTitle) => set({ title: newTitle }),
}));

export default useGlobalStore;
