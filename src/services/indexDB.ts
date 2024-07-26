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
        blocked(currentVersion, blockedVersion, event) {
            console.log('blocked: ', event);
        },
        blocking(currentVersion, blockedVersion, event) {
            console.log('blocking: ', event);
        },
        terminated() {
            console.log('terminated')
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

export async function updateTaskInDb({ title, createdAt, done, id }: Partial<DbTask>) {
    const db = await createStoresInDB();
    const transaction = db.transaction(DATABASE_STORES.TASKS, 'readwrite')
    const store = transaction.objectStore(DATABASE_STORES.TASKS);

    try {
        await store.put({ title, createdAt, done }, id);
        await transaction.done;
        return Promise.resolve({ message: 'Задача обновлена' })
    } catch(e) {
        return Promise.reject({ message: 'Не удалось обновить задачу' })
    }
}

export async function getTasksFromDb() {
    const db = await createStoresInDB();
    return await db.getAll(DATABASE_STORES.TASKS);
}
