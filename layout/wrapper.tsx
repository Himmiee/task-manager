"use client";

import React from "react";
import { columns } from "@/helpers/contants";
import { TaskColumn } from "./task";
import useStore from "@/helpers/store";
import { motion, AnimatePresence } from "framer-motion";

export const TaskManagerWrapperSection: React.FC = () => {
  const isHydrated = useStore((state) => state.isHydrated);

  return (
    <AnimatePresence mode="wait">
      {!isHydrated ? (
        <motion.div
          key="loader"
          className="min-h-screen flex items-center justify-center bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-dashed border-gray-400 rounded-full animate-spin" />
            <p className="text-lg text-teal-200">Loading board...</p>
          </div>
        </motion.div>
      ) : (
        <motion.section
          key="board"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-black min-h-screen text-white"
        >
          <div className="max-w-screen-2xl mx-auto px-4  py-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-semibold"
            >
              Task Management Board
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  "
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {columns.map((col) => (
                <motion.div
                  key={col.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <TaskColumn columnId={col.id} title={col.title} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
