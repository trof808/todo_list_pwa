import { create } from 'zustand'

export type TaskId = string;

export type TaskItemState = {
    id: TaskId;
    topicId?: string | null;
    title: string;
    done: boolean;
    createdAt: Date;
    todoDate?: Date;
}

type TasksState = {
    tasks: TaskItemState[];
}

type TasksActions = {
    handleTaskCheck: (id: TaskId) => void;
    handleTaskUncheck: (id: TaskId) => void;
    addTask: (payload: TaskItemState) => void;
    setTasks: (payload: TaskItemState[]) => void;
    removeTask: (id: TaskId) => void;
}

export const useTasksStore = create<TasksState & TasksActions>((set) => ({
    tasks: [],
    handleTaskCheck: (id) => set((state) => ({
        tasks: state.tasks.map(t => ({
            ...t,
            done: t.id === id ? true : t.done
        }))
    })),
    handleTaskUncheck: (id) => set((state) => ({
        tasks: state.tasks.map(t => ({
            ...t,
            done: t.id === id ? false : t.done
        }))
    })),
    addTask: (payload) => set((state) => ({
        tasks: [...state.tasks, payload],
    })),
    setTasks: (payload) => set(() => ({
        tasks: payload
    })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
    })),
}))