"use client"

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddField from '../../component/AddField';

type FieldData = {
    name: string;
    type: string;
    required: string;
    addLabel: string;
    value: string;
    helpText: string
}

const Poc: React.FC = () => {
    const [fields, setFields] = useState<React.ReactNode[]>([]);
    const [formData, setFormData] = useState<FieldData[]>([]);

    const addField = () => {
        const newFieldId = fields.length;
        setFields([...fields, <AddField key={newFieldId} time={newFieldId} onDataChange={handleFieldDataChange} />]);
    };

    const handleFieldDataChange = (fieldData: FieldData, fieldId: number) => {
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[fieldId] = fieldData;
            return updatedFormData;
        });
    };

    // console.log('dada', JSON.stringify(formData, null, 2))

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const draggedIndex = result.source.index;
        const droppedIndex = result.destination.index;
        const updatedFields = [...fields];
        const [draggedField] = updatedFields.splice(draggedIndex, 1);
        updatedFields.splice(droppedIndex, 0, draggedField);

        setFields(updatedFields);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div className="flex items-end justify-end mt-3 mr-36 p-4">
                    <button
                        className="btn bg-gradient-to-t from-indigo-700 to-blue-800 text-white w-24"
                    >
                        Advance
                    </button>
                    <button
                        className="btn bg-gradient-to-r from-green-500 to-green-600 mx-2 text-white w-24"
                    >
                        Save
                    </button>
                    <button
                        className="btn bg-gradient-to-r from-pink-400 to-violet-600 text-white"
                        onClick={addField}
                    >
                        Add Fields
                    </button>
                </div>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {fields.map((field, index) => (
                                <div key={index}>{field}</div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default Poc;



