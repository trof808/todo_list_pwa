import RemoveImg from '../../../assets/remove.svg';
import classNames from "classnames";

import './TaskItem.css';
import { TaskId } from '../../../stores/tasksStore';
import { useCallback } from 'react';
import { useMakeTaskTouchable } from './hooks/useMakeTaskTouchable';

export type TaskItemData = {
    id: TaskId;
    title: string;
    done: boolean;
}

export type TaskItemEvents = {
    onCheck: (id: TaskId) => void;
    onUncheck: (id: TaskId) => void;
    onRemove: (id: TaskId) => void;
}

type TaskItemProps = TaskItemData & TaskItemEvents;

export const TaskItem = ({ id, title, done, onCheck, onUncheck, onRemove }: TaskItemProps) => {

    const {
        titleRef,
        imgRef,
        handleTouchEnd,
        handleTouchMove,
        handleTouchStart
    } = useMakeTaskTouchable({ id, done, onCheck, onUncheck, onRemove });

    const handleRemove = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);

    return <div
        className="py-1 px-12 flex justify-between taskItem"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
        <span ref={titleRef} className={classNames('title', { 'done': done })}>{title}</span>
        <img ref={imgRef} className="removeImg" src={RemoveImg} alt="" onClick={handleRemove} />
    </div>
}