import { useCallback } from "react";
import { deleteTaskInDb, saveTaskInDb, updateTaskInDb } from "../services/indexDB";
import { TaskId, useTasksStore } from "../stores/tasksStore";

export const useUpdateTaskHook = () => {
    const addTaskInStore = useTasksStore((state) => state.addTask);
    const checkTaskInStore = useTasksStore((state) => state.handleTaskCheck);
    const uncheckTaskInStore = useTasksStore((state) => state.handleTaskUncheck);
    const removeTaskInStore = useTasksStore((state) => state.removeTask);

    const handleAddTask = ({ title }: { title: string }) => {
        const createdAt = new Date();
        saveTaskInDb({ title, createdAt, done: false })
            .then(id => addTaskInStore({ id: `${id}`, title, done: false, createdAt }));
    }

    const handleRemoveTask = useCallback((id: TaskId) => {
        deleteTaskInDb({ id: +id }).then(() => removeTaskInStore(id));
    }, [removeTaskInStore]);

    const handleTaskCheck = useCallback((id: TaskId) => {
        updateTaskInDb({ done: true, id: +id }).then(() => checkTaskInStore(id))
    }, [checkTaskInStore]);

    const handleTaskUncheck = useCallback((id: TaskId) => {
        updateTaskInDb({ done: false, id: +id }).then(() => uncheckTaskInStore(id))
    }, [uncheckTaskInStore]);

    return {
        handleAddTask,
        handleTaskCheck,
        handleTaskUncheck,
        handleRemoveTask
    }
}