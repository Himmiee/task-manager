import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormDataType, FormValidationSchema } from "@/helpers/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import useStore from "@/helpers/store";

type Props = {
  columnId: string;
};

export const FormCard: React.FC<Props> = ({ columnId }) => {
  const addTask = useStore((s) => s.addTask);
  const updateTask = useStore((s) => s.updateTask);
  const setOpenCardColumn = useStore((s) => s.setOpenCardColumn);
  const editingTaskId = useStore((s) => s.editingTaskId);
  const setEditingTaskId = useStore((s) => s.setEditingTaskId);
  const tasks = useStore((s) => s.tasks);

  const editingTask = tasks.find(
    (t) => t.id === editingTaskId && t.columnId === columnId
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(FormValidationSchema as any),
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,
        description: editingTask.description || "",
      });
    }
  }, [editingTask, reset]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
    }
  }, [errors]);

  const onSubmit = (data: FormDataType) => {
    if (editingTask) {
      updateTask({
        ...editingTask,
        title: data.title,
        description: data.description,
      });
    } else {
      addTask({
        id: uuidv4(),
        title: data.title,
        description: data.description,
        columnId,
      });
    }

    setOpenCardColumn(null);
    setEditingTaskId(null);
  };

  return (
    <section className="bg-[#17181A] min-h-40 max-w-88 rounded p-3 lg:mr-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          {...register("title")}
          type="text"
          id="title"
          placeholder="Task Title"
          className="border-0 focus-visible:border-0 ring-0 focus-visible:ring-0"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Task Description"
          className="border-0 focus-visible:border-0 ring-0 focus-visible:ring-0"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <div className="flex gap-2 items-center py-2">
          <Button
            type="button"
            onClick={() => {
              setOpenCardColumn(null);
              setEditingTaskId(null);
            }}
            variant="default"
          >
            Cancel
          </Button>
          <Button variant="outline" type="submit">
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </form>
    </section>
  );
};
