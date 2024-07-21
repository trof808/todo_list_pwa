import { FormEvent, useRef, useState } from "react";

import './TaskForm.css';

type AddTaskFormProp = {
    onSubmit: ({ title }: { title: string }) => void;
}

export const AddTaskForm = ({ onSubmit }: AddTaskFormProp) => {
    const [title, setTitle] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        if (inputRef.current) {
            inputRef.current.value = ''
            inputRef.current?.blur()
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ title });
        resetForm();
    }

    return <form onSubmit={handleSubmit} className='px-12 mt-5 addTaskForm'>
        <input type="text" onChange={(e) => setTitle(e.target.value)} ref={inputRef} placeholder="Что сделать..?" />
    </form>
}