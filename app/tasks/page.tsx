'use client';

import { TASKS } from '@/lib/mockData';
import { useState, useMemo } from 'react';

export default function TasksPage() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newSet = new Set(completedTasks);
    if (newSet.has(taskId)) {
      newSet.delete(taskId);
    } else {
      newSet.add(taskId);
    }
    setCompletedTasks(newSet);
  };

  const tasksByCategory = useMemo(() => {
    return {
      daily: TASKS.filter(t => t.category === 'daily'),
      weekly: TASKS.filter(t => t.category === 'weekly'),
      monthly: TASKS.filter(t => t.category === 'monthly'),
    };
  }, []);

  const TaskSection = ({ title, icon, tasks }: { title: string; icon: string; tasks: typeof TASKS }) => {
    const completed = tasks.filter(t => completedTasks.has(t.id)).length;
    const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{icon} {title}</h2>
          <div className="text-sm text-gray-600">
            {completed}/{tasks.length} completed
          </div>
        </div>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">{progress}% complete</p>
          </div>
        )}

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No {title.toLowerCase()} tasks</p>
        ) : (
          <div className="space-y-2">
            {tasks.map(task => (
              <label
                key={task.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={completedTasks.has(task.id)}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium ${
                      completedTasks.has(task.id)
                        ? 'line-through text-gray-400'
                        : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    {task.assignee && (
                      <span>👤 {task.assignee}</span>
                    )}
                    <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const totalTasks = TASKS.length;
  const totalCompleted = completedTasks.size;

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-2">✅ Task Manager</h1>
      <p className="text-gray-600 mb-6">Manage daily, weekly, and monthly recurring tasks</p>

      {/* Overall Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow p-6 mb-8">
        <div className="text-center">
          <p className="text-lg opacity-90 mb-2">Overall Progress</p>
          <p className="text-5xl font-bold mb-2">
            {totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}%
          </p>
          <p className="opacity-90">
            {totalCompleted} of {totalTasks} tasks completed
          </p>
        </div>
      </div>

      {/* Task Sections */}
      <TaskSection
        title="Daily Tasks"
        icon="📆"
        tasks={tasksByCategory.daily}
      />

      <TaskSection
        title="Weekly Tasks"
        icon="📊"
        tasks={tasksByCategory.weekly}
      />

      <TaskSection
        title="Monthly Tasks"
        icon="📅"
        tasks={tasksByCategory.monthly}
      />

      {/* Tips */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <p className="font-semibold text-blue-900 mb-2">💡 Task Tracking Tips</p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Check off tasks as you complete them to track progress</li>
          <li>• Recurring tasks will reset at the start of each period</li>
          <li>• View task assignments and due dates at a glance</li>
          <li>• Note: Task state resets on page reload in this demo version</li>
        </ul>
      </div>
    </div>
  );
}
