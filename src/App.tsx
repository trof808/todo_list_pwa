import PWABadge from './PWABadge.tsx'

import { CenterContent } from "./shared/ui";
import { AddTaskForm, TasksList } from "./components";
import { useGetTasksHook } from './hooks/useGetTasksHook.tsx';
import { useUpdateTaskHook } from './hooks/useUpdateTaskHook.tsx';


const TasksContainer = () => {
  const { tasks } = useGetTasksHook();
  const { handleAddTask, handleRemoveTask, handleTaskCheck, handleTaskUncheck } = useUpdateTaskHook();

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
