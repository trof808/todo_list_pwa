import { TaskId } from "../../../stores/tasksStore";
import { TaskItem, TaskItemData } from "../TaskItem/TaskItem";

type TasksListProps = {
    tasks: TaskItemData[];
    onCheck: (id: TaskId) => void;
    onUncheck: (id: TaskId) => void;
    onRemove: (id: TaskId) => void;
}

export const TasksList = ({ tasks, onCheck, onUncheck, onRemove }: TasksListProps) => {
    return (
        <div className="max-h-[40svh] w-lvw overflow-y-auto overflow-x-hidden">
            {tasks.map(t => (
                <TaskItem
                    key={t.id}
                    id={t.id}
                    title={t.title}
                    done={t.done}
                    onCheck={onCheck}
                    onUncheck={onUncheck}
                    onRemove={onRemove}
                />
            ))}
        </div>
    )
}
