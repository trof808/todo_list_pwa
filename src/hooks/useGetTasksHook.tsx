import { useCallback, useEffect } from "react";
import { getTasksFromDb } from "../services/indexDB";
import { useTasksStore } from "../stores/tasksStore";

export const useGetTasksHook = () => {
    const tasks = useTasksStore((state) => state.tasks.sort((a, b) => +b.createdAt - +a.createdAt).sort((a,b) => +a.done - +b.done));
    const setTasks = useTasksStore((state) => state.setTasks);

    const updateTasksFromDb = useCallback(async () => {
        if (tasks.length === 0) {
            const dbTasks = await getTasksFromDb();
            setTasks(dbTasks);
        }
    }, [tasks, setTasks]);

    useEffect(() => {
        updateTasksFromDb();
    }, [updateTasksFromDb]);
    
    return {
        tasks,
    }
}