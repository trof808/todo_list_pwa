import { TouchEventHandler, useCallback, useRef, useState } from "react";
import { TaskItemData, TaskItemEvents } from "../TaskItem";

type Props = Omit<TaskItemData, 'title'> & TaskItemEvents;

const IMG_BASE_POSITION = -30;
const TASK_POSITION_TO_BE_REMOVED = -80;

export const useMakeTaskTouchable = ({ id, done, onCheck, onUncheck, onRemove }: Props) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [touchXStart, setTouchXStart] = useState(0);
    const [touchYStart, setTouchYStart] = useState(0);
    const [moveType, setMoveType] = useState<'remove' | 'check' | null>(null);

    const titleWidth = titleRef.current ? titleRef.current.clientWidth : 0;

    const handleSetLineThroughWidth = useCallback((value: number) => {
        if (titleRef.current) {
            titleRef.current.style.setProperty('--after-width', `${value}px`);
        }
    }, [titleRef]);

    const handleSetTaskXPostion = useCallback((value: number) => {
        if (titleRef.current && imgRef.current) {
            titleRef.current.classList.remove('smooth');
            imgRef.current.classList.remove('smooth');
            titleRef.current.style.setProperty('--task-x-position', `${value}px`);
            if (value < TASK_POSITION_TO_BE_REMOVED)
                imgRef.current.style.setProperty('--img-remove-x-position', `${IMG_BASE_POSITION - value * 1.2}px`);
            else
                imgRef.current.style.setProperty('--img-remove-x-position', `${IMG_BASE_POSITION - value}px`);
        }
    }, [titleRef, imgRef]);

    const handleResetTaskPosition = useCallback(() => {
        if (titleRef.current && imgRef.current) {
            titleRef.current.classList.add('smooth');
            imgRef.current.classList.add('smooth');
            titleRef.current.style.setProperty('--task-x-position', `$0px`);
            imgRef.current.style.setProperty('--img-remove-x-position', `-30px`);
        }
    }, [titleRef, imgRef]);

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

    const handleGetLineThroughWidth = useCallback((deltaX: number) => {
        if (done && (titleWidth - deltaX >= 0) && (titleWidth - deltaX <= titleWidth))
            return titleWidth - deltaX;
        if (done && titleWidth - deltaX > titleWidth)
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
        const isLeftMove = deltaX < 0;

        if (!isHorizontalMove) return;

        if (!isLeftMove) {
            setMoveType('check');
            const lineWidth = handleGetLineThroughWidth(deltaX);
            handleResetTaskPosition();
            handleSetLineThroughWidth(lineWidth);
        }
        if (isLeftMove) {
            setMoveType('remove');
            !done && handleSetLineThroughWidth(0);
            handleSetTaskXPostion(deltaX);
        }
    }, [touchXStart, touchYStart, handleGetLineThroughWidth, handleSetLineThroughWidth, handleSetTaskXPostion, done, handleResetTaskPosition]);

    const handleTouchEnd = useCallback<TouchEventHandler>(() => {
        if (!titleRef.current) return;
        if (moveType === 'check') {
            if (!done) {
                const lineTroughWidth = titleRef.current.style.getPropertyValue('--after-width');
                const movePercent = parseInt(lineTroughWidth) / titleWidth * 100;
                if (movePercent > 20) {
                    handleCheck();
                } else {
                    handleSetLineThroughWidth(0);
                }
            } else {
                const lineTroughWidth = titleRef.current.style.getPropertyValue('--after-width');
                const movePercent = parseInt(lineTroughWidth) / titleWidth * 100;
                if (movePercent < 80) {
                    handleUncheck();
                } else {
                    handleSetLineThroughWidth(titleWidth);
                }
            }
        }
        if (moveType === 'remove') {
            const taskMoveValue = titleRef.current.style.getPropertyValue('--task-x-position');
            const moveValue = parseInt(taskMoveValue);
            console.log(moveValue);
            if (moveValue < TASK_POSITION_TO_BE_REMOVED) {
                onRemove(id);
            } else {
                handleResetTaskPosition();
            }
        }
    }, [titleRef, titleWidth, handleCheck, handleUncheck, done, handleSetLineThroughWidth, moveType, onRemove, id, handleResetTaskPosition]);

    return {
        titleRef,
        imgRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    }
}