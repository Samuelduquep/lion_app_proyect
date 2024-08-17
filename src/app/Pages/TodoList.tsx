import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Button, Input, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Todo } from '../../global/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            const newTodoItem: Todo = {
                id: Date.now(),
                text: newTodo,
                status: 'todo',
            };
            setTodos([...todos, newTodoItem]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTodos = Array.from(todos);
        const movedTodo = newTodos.find(todo => todo.id === Number(draggableId))!;
        newTodos.splice(source.index, 1);
        movedTodo.status = destination.droppableId as Todo['status'];
        newTodos.splice(destination.index, 0, movedTodo);

        setTodos(newTodos);
    };

    const getStatusList = (status: Todo['status']) =>
        todos.filter(todo => todo.status === status);

    // Calculate statistics
    const totalTodos = todos.length;
    const todoCount = getStatusList('todo').length;
    const doingCount = getStatusList('doing').length;
    const doneCount = getStatusList('done').length;

    const chartData = {
        labels: ['To Do', 'Doing', 'Done'],
        datasets: [
            {
                label: 'Tasks',
                data: [todoCount, doingCount, doneCount],
                backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex justify-between flex-col h-full p-3 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-md shadow-xl text-white dark:text-gray-200">
            {/* Parte Superior */}
            <div className="flex-1 flex flex-col lg:flex-row lg:space-x-3 h-1-2">
                {/* Todo List */}
                <div className="w-full h-auto lg:w-1/2 bg-white text-gray-900 p-3 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 lg:mb-0">
                    <h1 className="text-3xl font-bold mb-3">Todo List</h1>
                    <div className="mb-4">
                        <Input
                            type="text"
                            value={newTodo}
                            onChange={handleNewTodoChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Add a new task..."
                            className="mb-2 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-blue-400"
                            suffix={<PlusOutlined className="text-blue-500 dark:text-blue-300" />}
                        />
                        <Button
                            onClick={handleAddTodo}
                            type="primary"
                            icon={<PlusOutlined />}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white border border-transparent rounded-lg shadow-sm dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Add
                        </Button>
                    </div>
                    <List
                        bordered
                        className='overflow-auto max-h-64 pb-20 dark:bg-gray-800 dark:border-gray-600'
                        dataSource={getStatusList('todo')}
                        renderItem={todo => (
                            <List.Item
                                key={todo.id}
                                className="flex items-center justify-between bg-white border-b border-gray-200 hover:bg-gray-50 transition duration-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                <div
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="flex-1 cursor-pointer text-gray-800 dark:text-gray-200"
                                >
                                    {todo.text}
                                </div>
                                <Button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    type="text"
                                    icon={<DeleteOutlined className="text-red-500 dark:text-red-400" />}
                                />
                            </List.Item>
                        )}
                    />

                </div>

                {/* Chart */}
                <div className="w-full h-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold mb-2">Task Statistics</h2>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                    labels: {
                                        color: 'white', // Change legend text color in dark mode
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            let label = context.dataset.label || '';
                                            if (label) {
                                                label += ': ';
                                            }
                                            if (context.parsed.y !== null) {
                                                label += `${context.parsed.y} (${(
                                                    (context.parsed.y / totalTodos) * 100
                                                ).toFixed(2)}%)`;
                                            }
                                            return label;
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Parte Inferior: Kanban */}
            <div className="flex-1 lg:mt-3 flex h-1/2 space-x-3">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {['todo', 'doing', 'done'].map(status => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="p-5 pb-10 w-1/3 h-1-4 bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-300">
                                            {status === 'todo' ? 'To Do' : status === 'doing' ? 'Doing' : 'Done'}
                                        </h3>

                                    </div>
                                    <List
                                        bordered
                                        size='small'
                                        className='overflow-auto h-full p-2 dark:bg-gray-800 dark:border-gray-600'
                                        dataSource={getStatusList(status as Todo['status'])}
                                        renderItem={(todo) => (
                                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={todos.indexOf(todo)}>
                                                {(provided) => (
                                                    <List.Item
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`rounded-md mt-1 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50 transition duration-200 ${todo.status === 'done' ? 'line-through bg-green-100 dark:bg-green-800' : todo.status === 'doing' ? 'bg-blue-100 dark:bg-blue-800' : 'bg-yellow-100 dark:bg-yellow-800'}`}
                                                    >
                                                        <div
                                                            className="flex-1 cursor-pointer"
                                                            onClick={() => handleDeleteTodo(todo.id)}
                                                        >
                                                            {todo.text}
                                                        </div>
                                                        <Button
                                                            onClick={() => handleDeleteTodo(todo.id)}
                                                            type="text"
                                                            icon={<DeleteOutlined className="text-red-500 dark:text-red-400" />}
                                                        />
                                                    </List.Item>
                                                )}
                                            </Draggable>
                                        )}
                                    />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default TodoList;
