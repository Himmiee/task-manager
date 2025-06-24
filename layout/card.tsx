"use client";
import { useDrag } from "react-dnd";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore from "@/helpers/store";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  color?: string;
};

export const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  columnId,
  color = "bg-[#17181A]",
}) => {
  const deleteTask = useStore((s) => s.deleteTask);
  const setEditingTaskId = useStore((s) => s.setEditingTaskId);
  const setOpenCardColumn = useStore((s) => s.setOpenCardColumn);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (ref.current) {
      drag(ref);
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`rounded p-3 shadow-sm lg:mr-1 ${color}  text-white relative space-y-1 opacity-${
        isDragging ? "50" : "100"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="text-sm font-semibold truncate">{title}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-gray-400 hover:text-white border-0 ring-0 focus-visible:ring-0">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="w-32 bg-[#2c2d30] text-sm text-white"
          >
            <DropdownMenuItem
              onClick={() => {
                setEditingTaskId(id);
                setOpenCardColumn(columnId);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400"
              onClick={() => deleteTask(id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {description && (
        <p className="text-xs text-gray-300 whitespace-pre-wrap break-words">
          {description}
        </p>
      )}
    </div>
  );
};
