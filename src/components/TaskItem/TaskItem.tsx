import RemoveImg from '../../assets/remove.svg';
import classNames from "classnames";

import './TaskItem.css';

type TaskItemProps = {
    title: string;
    done: boolean;
}

export const TaskItem = ({ title, done }: TaskItemProps) => {
    return <div className="py-1 px-12 flex justify-between">
        <span className={classNames('title', { 'done': done })}>{title}</span>
        <img src={RemoveImg} alt="" />
    </div>
}