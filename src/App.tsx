import PWABadge from './PWABadge.tsx'

import { CenterContent } from "./shared/ui";
import { AddTaskForm, TasksList } from "./components";
import { useTasksStore } from './stores/tasksStore.ts';
import { v4 as uuidv4 } from 'uuid';
const TasksContainer = () => {
  const tasks = useTasksStore((state) => state.tasks.sort((a, b) => +b.createdAt - +a.createdAt).sort((a,b) => +a.done - +b.done));
  const addTask = useTasksStore((state) => state.addTask);
  const handleTaskCheck = useTasksStore((state) => state.handleTaskCheck);
  const handleTaskUncheck = useTasksStore((state) => state.handleTaskUncheck);
  const handleRemoveTask = useTasksStore((state) => state.removeTask);

  // Это перенесу в экшен после выполнения api запроса на добавление задачи
  const handleAddTask = ({ title }: { title: string }) => {
    addTask({ id: uuidv4(), title, done: false, createdAt: new Date() })
  }

  return <div>
    <TasksList
      tasks={tasks}
      onCheck={handleTaskCheck}
      onUncheck={handleTaskUncheck}
      onRemove={handleRemoveTask}
    />
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
