import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  columnId: string;
};

type Store = {
  tasks: TaskType[];
  openCardColumn: string | null;
  editingTaskId: string | null;
  isHydrated: boolean;

  // Actions
  addTask: (task: TaskType) => void;
  updateTask: (task: TaskType) => void;
  moveTask: (taskId: string, newColumnId: string) => void;
  deleteTask: (id: string) => void;
  setOpenCardColumn: (columnId: string | null) => void;
  setEditingTaskId: (taskId: string | null) => void;
  setIsHydrated: (value: boolean) => void;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      tasks: [],
      openCardColumn: null,
      editingTaskId: null,
      isHydrated: false,

      addTask: (task) => set({ tasks: [...get().tasks, task] }),

      updateTask: (updatedTask) =>
        set({
          tasks: get().tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }),

      deleteTask: (id) =>
        set({ tasks: get().tasks.filter((task) => task.id !== id) }),
      moveTask: (taskId, newColumnId) =>
        set({
          tasks: get().tasks.map((task) =>
            task.id === taskId ? { ...task, columnId: newColumnId } : task
          ),
        }),
      setOpenCardColumn: (columnId) => set({ openCardColumn: columnId }),
      setEditingTaskId: (taskId) => set({ editingTaskId: taskId }),
      setIsHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "task-board-store",
      partialize: (state) => ({
        tasks: state.tasks,
      }),
      onRehydrateStorage: () => {
        console.log("🔄 Hydration started");

        return (state, error) => {
          if (error) {
            console.error(" Hydration error:", error);
          } else {
            console.log("Hydration finished");
            state?.setIsHydrated(true);
          }
        };
      },
    }
  )
);

export default useStore;
