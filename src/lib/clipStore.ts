import { create } from 'zustand';

export interface Clip {
    id: string;
    url: string;
    createdAt: number;
    label: string;
}

interface ClipsState {
    clips: Clip[];
    lastAddedClipId: string | null;
    addClip: (clip: Clip) => void;
    clearLastAdded: () => void;w
    reorderClips: (newOrder: Clip[]) => void;
}

export const useClipsStore = create<ClipsState>((set, get) => ({
    clips: [],
    lastAddedClipId: null,
    addClip: (clip) => set((state) => {
        const label = (state.clips.length + 1).toString();
        return {
            clips: [...state.clips, { ...clip, label }],
            lastAddedClipId: clip.id
        }
    }),
    clearLastAdded: () => set({ lastAddedClipId: null }),
    reorderClips: (newOrder) => set({ clips: newOrder }),
}));
