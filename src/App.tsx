import PWABadge from './PWABadge.tsx'

import { CenterContent } from "./shared/ui";
import { TaskItem } from "./components";
import { TaskItemState, useTasksStore } from './stores/tasksStore.ts';
import { FormEvent, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TasksListProps = {
  tasks: TaskItemState[];
}

type AddTaskFormProp = {
  onSubmit: ({ title }: { title: string }) => void;
}

const AddTaskForm = ({ onSubmit }: AddTaskFormProp) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current?.blur()
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title });
    resetForm();
  }

  return <form onSubmit={handleSubmit} className='px-12 mt-5 addTaskForm'>
    <input type="text" onChange={(e) => setTitle(e.target.value)} ref={inputRef} />
  </form>
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <div className="h-[40svh] w-lvw overflow-y-auto">
      {tasks.map(t => (
        <TaskItem key={t.id} title={t.title} done={t.done} />
      ))}
    </div>
  )
}

const TasksContainer = () => {
  const tasks = useTasksStore((state) => state.tasks.sort((a,b) => +a.done - +b.done));
  const addTask = useTasksStore((state) => state.addTask);

  // Это перенесу в экшен после выполнения api запроса на добавление задачи
  const handleAddTask = ({ title }: { title: string }) => {
    addTask({ id: uuidv4(), title, done: false, createdAt: new Date() })
  }

  return <div>
    <TasksList tasks={tasks} />
    <AddTaskForm onSubmit={handleAddTask} />
  </div>
}

function App() {
  return (
    <CenterContent>
      <TasksContainer />
      <PWABadge />
    </CenterContent>
  )
}

export default App
