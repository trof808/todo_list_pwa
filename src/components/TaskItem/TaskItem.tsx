import RemoveImg from '../../assets/remove.svg';
import classNames from "classnames";

import './TaskItem.css';
import { TouchEventHandler, useCallback, useRef, useState } from 'react';

type TaskItemProps = {
    id: string;
    title: string;
    done: boolean;
    onCheck: (id: string) => void;
    onUncheck: (id: string) => void;
    onRemove: (id: string) => void;
}

export const TaskItem = ({ id, title, done, onCheck, onUncheck, onRemove }: TaskItemProps) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const [touchXStart, setTouchXStart] = useState(0);
    const [touchYStart, setTouchYStart] = useState(0);

    const titleWidth = titleRef.current ? titleRef.current.clientWidth : 0;

    const handleSetLineThroughWidth = useCallback((value: number) => {
        if (titleRef.current) {
            titleRef.current.style.setProperty('--after-width', `${value}px`);
        }
    }, [titleRef]);

    const handleCheck = useCallback(() => {
        if (!done) {
            onCheck(id);
            handleSetLineThroughWidth(titleWidth);
        }
    }, [id, done, onCheck, handleSetLineThroughWidth, titleWidth]);

    const handleUncheck = useCallback(() => {
        if (done) {
            onUncheck(id);
            handleSetLineThroughWidth(0);
        }
    }, [id, done, onUncheck, handleSetLineThroughWidth]);

    const handleRemove = useCallback(() => {
        onRemove(id);
    }, [id, onRemove]);

    const handleGetLineThroughWidth = useCallback((deltaX: number) => {
        if (done && (titleWidth + deltaX >= 0) && (titleWidth + deltaX <= titleWidth))
            return titleWidth + deltaX;
        if (done && titleWidth + deltaX > titleWidth)
            return titleWidth;
        if (!done && deltaX <= titleWidth && deltaX >= 0)
            return deltaX;
        if (!done && deltaX > titleWidth)
            return titleWidth;
        return 0;
    }, [done, titleWidth]);

    const handleTouchStart = useCallback<TouchEventHandler>((e) => {
        setTouchXStart(e.touches[0].clientX);
        setTouchYStart(e.touches[0].clientY);
    }, []);

    const handleTouchMove = useCallback<TouchEventHandler>((e) => {
        const moveXValue = e.touches[0].clientX;
        const moveYValue = e.touches[0].clientY;

        const deltaX = moveXValue - touchXStart;
        const deltaY = moveYValue - touchYStart;
        const isHorizontalMove = Math.abs(deltaX) > Math.abs(deltaY);

        if (titleRef.current && isHorizontalMove) {
            const lineWidth = handleGetLineThroughWidth(deltaX);
            handleSetLineThroughWidth(lineWidth);
        }
    }, [titleRef, touchXStart, touchYStart, handleGetLineThroughWidth, handleSetLineThroughWidth]);

    const handleTouchEnd = useCallback<TouchEventHandler>((e) => {
        if (titleRef.current) {
            if (!done) {
                const lineTroughWidth = titleRef.current.style.getPropertyValue('--after-width');
                const movePercent = parseInt(lineTroughWidth) / titleWidth * 100;
                if (movePercent > 80) {
                    handleCheck();
                } else {
                    handleSetLineThroughWidth(0);
                }
            } else {
                const lineTroughWidth = titleRef.current.style.getPropertyValue('--after-width');
                const movePercent = parseInt(lineTroughWidth) / titleWidth * 100;
                if (movePercent < 20) {
                    handleUncheck();
                } else {
                    handleSetLineThroughWidth(titleWidth);
                }
            }
        }
    }, [titleRef, titleWidth, handleCheck, handleUncheck, done, handleSetLineThroughWidth]);

    return <div
        className="py-1 px-12 flex justify-between"
        draggable
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
        <span ref={titleRef} className={classNames('title', { 'done': done })}>{title}</span>
        <img src={RemoveImg} alt="" onClick={handleRemove} />
    </div>
}