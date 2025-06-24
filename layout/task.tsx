"use client";

import { useDrop } from "react-dnd";
import { useRef, useEffect } from "react";
import { FormCard } from "./form";
import { Plus } from "lucide-react";
import useStore from "@/helpers/store";
import { TaskCard } from "./card";

type Props = {
  columnId: string;
  title: string;
};

export const TaskColumn: React.FC<Props> = ({ columnId, title }) => {
  const openCardColumn = useStore((s) => s.openCardColumn);
  const setOpenCardColumn = useStore((s) => s.setOpenCardColumn);
  const moveTask = useStore((s) => s.moveTask);
  const tasks = useStore((s) => s.tasks);

  const columnTasks = tasks.filter((t) => t.columnId === columnId);

  const ref = useRef<HTMLElement | null>(null);

  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== columnId) {
        moveTask(item.id, columnId);
      }
    },
  });

  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [ref.current]);

  return (
    <section
      ref={ref}
      className=" p-4 rounded w-96 space-y-4  min-h-[300px]"
    >
      <p className="text-white font-semibold">{title}</p>

      <div className="space-y-2">
        {columnTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      {openCardColumn === columnId ? (
        <FormCard columnId={columnId} />
      ) : (
        <div
          onClick={() => setOpenCardColumn(columnId)}
          className="text-sm flex items-center gap-2 cursor-pointer text-gray-300 hover:text-gray-400"
        >
          <Plus size={16} /> Add New Card
        </div>
      )}
    </section>
  );
};
