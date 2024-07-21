import PWABadge from './PWABadge.tsx'

import { CenterContent } from "./shared/ui";
import { AddTaskForm, TaskItem } from "./components";
import { TaskItemState, useTasksStore } from './stores/tasksStore.ts';
import { v4 as uuidv4 } from 'uuid';

type TasksListProps = {
  tasks: TaskItemState[];
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;
}

const TasksList = ({ tasks, onCheck, onUncheck }: TasksListProps) => {
  return (
    <div className="h-[40svh] w-lvw overflow-y-auto">
      {tasks.map(t => (
        <TaskItem key={t.id} id={t.id} title={t.title} done={t.done} onCheck={onCheck} onUncheck={onUncheck} />
      ))}
    </div>
  )
}

const TasksContainer = () => {
  const tasks = useTasksStore((state) => state.tasks.sort((a, b) => +b.createdAt - +a.createdAt).sort((a,b) => +a.done - +b.done));
  const addTask = useTasksStore((state) => state.addTask);
  const handleTaskCheck = useTasksStore((state) => state.handleTaskCheck);
  const handleTaskUncheck = useTasksStore((state) => state.handleTaskUncheck);

  // Это перенесу в экшен после выполнения api запроса на добавление задачи
  const handleAddTask = ({ title }: { title: string }) => {
    addTask({ id: uuidv4(), title, done: false, createdAt: new Date() })
  }

  return <div>
    <TasksList tasks={tasks} onCheck={handleTaskCheck} onUncheck={handleTaskUncheck} />
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
