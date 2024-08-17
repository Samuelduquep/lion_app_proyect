import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Button, Input, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Todo } from '../../global/types';
import { useTheme } from '../../global/hooks/useTheme';

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
                backgroundColor: ['#Fef3c7', '#Dbeafe', '#D1FAE5'],
                borderWidth: 0,
            },
        ],
    };

    const { darkMode } = useTheme();

    return (
        <div className="flex justify-between h-full item-center flex-col h-100 p-2 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-md shadow-xl text-white dark:text-gray-200">
            {/* Parte Superior */}
            <div className="flex-1 flex flex-col lg:flex-row gap-2 h-1/2">
                {/* Todo List */}
                <div className="w-1/2 h-full lg:w-1/2 bg-white text-gray-900 p-3 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 lg:mb-0">
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
                        className='overflow-auto h-full max-h-72 pb-20 dark:bg-gray-800 dark:border-gray-600'
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
                <div className="flex w-full h-full lg:w-2/3 bg-white p-3 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-600">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                    labels: {
                                        generateLabels: (chart) => {
                                            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
                                            const labels = original.call(this, chart);
                                            return labels;
                                        },
                                    },
                                    title: {
                                        display: true,
                                        text: 'Task Statistics',
                                        font: {
                                            size: 16,
                                        },
                                        color: darkMode ? 'white' : 'black',
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
            <div className="flex-1 lg:mt-2 flex h-1/2 gap-2">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {['todo', 'doing', 'done'].map(status => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="p-5 pb-10 w-1/3  bg-white rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
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
                                                        className={`rounded-md mt-1 flex items-center justify-between border-b border-gray-200 hover:bg-gray-50 transition duration-200 ${todo.status === 'done' ? 'line-through bg-green-100' : todo.status === 'doing' ? 'bg-blue-100' : 'bg-yellow-100'}`}
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
