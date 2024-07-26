import { openDB } from 'idb';

const DATABASE_STORES = {
    TASKS: 'tasks',
}

async function createStoresInDB() {
    const dbPromise = await openDB('store', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(DATABASE_STORES.TASKS)) {
                db.createObjectStore(DATABASE_STORES.TASKS, { keyPath: 'id', autoIncrement: true });
            }
        },
    });

    return dbPromise;
}

type DbTask = {
    id: number;
    title: string;
    createdAt: Date;
    done: boolean;
}

export async function saveTaskInDb({ title, createdAt, done }: Omit<DbTask, 'id'>) {
    const db = await createStoresInDB();
    const transaction = db.transaction(DATABASE_STORES.TASKS, 'readwrite')
    const store = transaction.objectStore(DATABASE_STORES.TASKS);

    const id = await store.add({ title, createdAt, done });
    await transaction.done;

    return id;
}

export async function deleteTaskInDb({ id }: Pick<DbTask, 'id'>) {
    const db = await createStoresInDB();
    const transaction = db.transaction(DATABASE_STORES.TASKS, 'readwrite')
    const store = transaction.objectStore(DATABASE_STORES.TASKS);
    
    try {
        await store.delete(id);
        await transaction.done;
        return Promise.resolve({ message: 'Задача удалена' })
    } catch(e) {
        return Promise.reject({ message: 'Не удалось удалить из indeDB' })
    }
}

type DbTaskUpdatePayload = Partial<Omit<DbTask, 'createdAt'>> & { id: DbTask['id'] };

export async function updateTaskInDb({ title, done, id }: DbTaskUpdatePayload) {
    const db = await createStoresInDB();
    const transaction = db.transaction(DATABASE_STORES.TASKS, 'readwrite')
    const store = transaction.objectStore(DATABASE_STORES.TASKS);

    const task = await store.get(id);

    const newTask = {
        ...task,
        title: title !== undefined ? title : task.title,
        done: done !== undefined ? done : task.done,
    }

    try {
        await store.put(newTask);
        await transaction.done;
        return Promise.resolve({ message: 'Задача обновлена' })
    } catch(e) {
        console.error(e);
        return Promise.reject({ message: 'Не удалось обновить задачу' })
    }
}

export async function getTasksFromDb() {
    const db = await createStoresInDB();
    return await db.getAll(DATABASE_STORES.TASKS);
}
