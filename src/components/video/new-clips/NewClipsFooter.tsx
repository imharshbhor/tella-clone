import React from 'react'
import NewClipButton from './NewClipButton'
import { EmptyClips } from './EmptyClips'
import { useClipsStore } from '@/lib/clipStore'
import Confetti from './Confetti'

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

const ClipButton = ({ clip, isNew, listeners, attributes, setNodeRef, style }: any) => (
    <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
      group rounded-t-xl outline-none h-15 p-1 border-b-2 mx-1 relative cursor-pointer
    `}
        tabIndex={0}
    >
        <div className="flex relative items-center px-2 h-10 bg-white rounded-lg w-36.5 border py-1.75">
            <div className="flex flex-shrink-0 justify-center items-center rounded-sm w-11.5 h-6.5">
                <video
                    src={clip.url}
                    width={46}
                    height={24}
                    className="rounded"
                    style={{ objectFit: 'cover', background: '#eee', height: '24px' }}
                    muted
                    autoPlay
                    loop
                />
            </div>
            <div className="p-2 text-xs font-medium leading-4 text-slate-900 break-words truncate select-none focus:outline-none overflow-none">
                Clip {clip.label || ''}
            </div>
            {isNew && <Confetti trigger={true} />}
        </div>
    </div>
);

function SortableClip({ clip, isNew }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: clip.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto',
    };

    return (
        <ClipButton
            clip={clip}
            isNew={isNew}
            listeners={listeners}
            attributes={attributes}
            setNodeRef={setNodeRef}
            style={style}
        />
    );
}

const NewClipsFooter = () => {
    const clips = useClipsStore((state) => state.clips);
    const lastAddedClipId = useClipsStore((state) => state.lastAddedClipId);
    const clearLastAdded = useClipsStore((state) => state.clearLastAdded);
    const reorderClips = useClipsStore((state) => state.reorderClips);

    React.useEffect(() => {
        if (lastAddedClipId) {
            const t = setTimeout(() => clearLastAdded(), 2000);
            return () => clearTimeout(t);
        }
    }, [lastAddedClipId, clearLastAdded]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = clips.findIndex((c) => c.id === active.id);
            const newIndex = clips.findIndex((c) => c.id === over.id);
            reorderClips(arrayMove(clips, oldIndex, newIndex));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToHorizontalAxis]}
        >
            <SortableContext items={clips.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
                <div className='flex flex-row pl-4 pt-0.5 justify-between items-center'>
                    {clips.map((clip) => (
                        <SortableClip
                            key={clip.id}
                            clip={clip}
                            isNew={clip.id === lastAddedClipId}
                        />
                    ))}
                    <NewClipButton />
                    <EmptyClips n={Math.max(0, 9 - clips.length)} />
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default NewClipsFooter;
