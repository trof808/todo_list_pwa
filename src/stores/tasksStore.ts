import { create } from 'zustand'

export type TaskItemState = {
    id: string;
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
    toggleTaskDone: (id: TaskItemState['id']) => void;
    addTask: (payload: TaskItemState) => void;
    removeTask: (id: TaskItemState['id']) => void;
}

export const useTasksStore = create<TasksState & TasksActions>((set) => ({
    tasks: [
        {
            id: '1',
            topicId: 'topic1',
            title: 'Buy groceries',
            done: false,
            createdAt: new Date('2023-05-01T10:00:00'),
        },
        {
            id: '2',
            topicId: 'topic2',
            title: 'Walk the dog',
            done: true,
            createdAt: new Date('2023-05-02T14:30:00'),
        },
        {
            id: '3',
            topicId: 'topic1',
            title: 'Finish project report',
            done: false,
            createdAt: new Date('2023-05-03T08:45:00'),
        },
        {
            id: '4',
            topicId: null,
            title: 'Read a book',
            done: true,
            createdAt: new Date('2023-05-04T16:20:00'),
        },
        {
            id: '5',
            topicId: 'topic3',
            title: 'Clean the house',
            done: false,
            createdAt: new Date('2023-05-05T11:15:00'),
        },
        {
            id: '6',
            topicId: null,
            title: 'Prepare for meeting',
            done: true,
            createdAt: new Date('2023-05-06T09:00:00'),
        },
        {
            id: '7',
            topicId: 'topic2',
            title: 'Call mom',
            done: false,
            createdAt: new Date('2023-05-07T13:40:00'),
        },
        {
            id: '8',
            topicId: 'topic1',
            title: 'Write blog post',
            done: true,
            createdAt: new Date('2023-05-08T15:50:00'),
        },
        {
            id: '9',
            topicId: null,
            title: 'Learn TypeScript',
            done: false,
            createdAt: new Date('2023-05-09T10:30:00'),
        },
        {
            id: '10',
            topicId: 'topic3',
            title: 'Exercise for 30 minutes',
            done: true,
            createdAt: new Date('2023-05-10T07:00:00'),
        },
        {
            id: '11',
            topicId: 'topic1',
            title: 'Plan vacation',
            done: false,
            createdAt: new Date('2023-05-11T14:00:00'),
        },
        {
            id: '12',
            topicId: null,
            title: 'Organize files',
            done: true,
            createdAt: new Date('2023-05-12T11:45:00'),
        },
        {
            id: '13',
            topicId: 'topic2',
            title: 'Attend workshop',
            done: false,
            createdAt: new Date('2023-05-13T09:30:00'),
        },
        {
            id: '14',
            topicId: 'topic3',
            title: 'Grocery shopping',
            done: true,
            createdAt: new Date('2023-05-14T16:10:00'),
        },
        {
            id: '15',
            topicId: null,
            title: 'Update resume',
            done: false,
            createdAt: new Date('2023-05-15T13:20:00'),
        },
        {
            id: '16',
            topicId: 'topic1',
            title: 'Watch a movie',
            done: true,
            createdAt: new Date('2023-05-16T19:00:00'),
        },
        {
            id: '17',
            topicId: 'topic2',
            title: 'Visit the dentist',
            done: false,
            createdAt: new Date('2023-05-17T10:45:00'),
        },
        {
            id: '18',
            topicId: null,
            title: 'Prepare dinner',
            done: true,
            createdAt: new Date('2023-05-18T18:30:00'),
        },
        {
            id: '19',
            topicId: 'topic3',
            title: 'Clean the garage',
            done: false,
            createdAt: new Date('2023-05-19T14:15:00'),
        },
        {
            id: '20',
            topicId: null,
            title: 'Finish reading article',
            done: true,
            createdAt: new Date('2023-05-20T11:00:00'),
        },
    ],
    toggleTaskDone: (id) => set((state) => ({
        tasks: state.tasks.map(t => ({
            ...t,
            done: t.id === id ? !t.done : t.done
        }))
    })),
    addTask: (payload) => set((state) => ({
        tasks: [...state.tasks, payload],
    })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
    })),
}))