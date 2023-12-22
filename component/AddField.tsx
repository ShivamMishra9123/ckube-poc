import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

type FieldData = {
  name: string;
  type: string;
  required: string;
  addLabel: string;
  value: string;
  helpText: string;
  minValue?: string;
  maxValue?: string;
  minDate?: string;
  maxDate?: string;
}

export default function AddField({ time, onDataChange }: { time: number, onDataChange: (fieldData: FieldData, fieldId: number) => void }) {

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [isRequiredOpen, setIsRequiredOpen] = useState(false)
  const [fieldData, setFieldData] = useState<FieldData>({
    name: '',
    type: '',
    required: '',
    addLabel: '',
    value: '',
    helpText: '',

  });

  const handleInputChange = (value: string, field: string) => {
    setFieldData((prevData) => ({ ...prevData, [field]: value }));
    setIsTypeOpen(false);
    onDataChange({ ...fieldData, [field]: value }, time);
    setIsRequiredOpen(false)
  };

  return (
    <Droppable droppableId={`droppable-${time}`} type="FIELD">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Draggable draggableId={`draggable-${time}`} index={time}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="flex justify-center items-center w-full bg-white mx-auto ">
                  <div className="container mx-auto border-2 border-slate-200 rounded-md mb-8">
                    <div className="flex items-center bg-gray-100 h-12 rounded-t-md" onClick={() => setIsFormOpen(!isFormOpen)}>
                      <div className="flex flex-col items-center ml-4">
                        <div className="flex">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full ml-1"></div>
                        </div>

                        <div className="flex mt-1">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full ml-1"></div>
                        </div>

                        <div className="flex mt-1">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full ml-1"></div>
                        </div>
                      </div>
                      <p className="text-2xl w-1/2 ml-6">
                        {fieldData.name ?
                          <> {fieldData.name}</> :
                          <> Field Name {time + 1}</>
                        }
                      </p>
                      <div className="flex justify-end w-full mr-6">
                        <span className={`text-gray-500 text-4xl pb-3    ${isFormOpen ? "" : "-rotate-180"} duration-300`}>&#8964;</span>
                      </div>
                    </div>
                    {isFormOpen && (
                      <div className="w-full p-6  mx-auto rounded-2xl">

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-1">
                          <div className='mb-2'>
                            <label className='flex text-gray-500'>Name <p className='flex text-red-500 ml-2'>*</p></label>
                            <input className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                              type="text" placeholder="Name"
                              onChange={(e) => handleInputChange(e.currentTarget.value, 'name')}
                            />
                          </div>
                          <div className="relative w-300">
                            <label className='flex text-gray-500'>Type <p className='flex text-red-500 ml-2'>*</p></label>
                            <div className="details custom-select">
                              <div
                                className={`flex items-center w-full shadow-sm ${fieldData.type ? 'text-gray-700' : 'text-gray-500'} mt-3 p-2 rounded-lg border-2 border-slate-200 bg-white`}
                                onClick={() => setIsTypeOpen(!isTypeOpen)}
                              >
                                {fieldData.type ? fieldData.type : "Type"}
                                <h1 className='flex items-center ml-auto text-2xl'>&#8964;</h1>
                              </div>
                              {isTypeOpen && (
                                <ul className="z-10 list absolute w-full bg-white border-slate-200 border top-full left-0 px-0 box-border rounded-md max-h-200 overflow-y-auto">
                                  <li className="px-4 py-3 border-b border-gray-300" onClick={() => handleInputChange('Text', 'type')}>
                                    Text
                                  </li>
                                  <li className="px-4 py-3 border-b border-gray-300" onClick={() => handleInputChange('Long Text', 'type')}>
                                    Long Text
                                  </li>
                                  <li className="px-4 py-3 border-b border-gray-200" onClick={() => handleInputChange('Select', 'type')}>
                                    Select
                                  </li>
                                  <li className="px-4 py-3 border-b border-gray-200" onClick={() => handleInputChange('Object', 'type')}>
                                    Object
                                  </li>
                                  <li className="px-4 py-3 border-b border-gray-200" onClick={() => handleInputChange('Toogle', 'type')}>
                                    Toogle
                                  </li>
                                  <li className="px-4 py-3 border-b border-gray-200" onClick={() => handleInputChange('Number', 'type')}>
                                    Number
                                  </li>
                                  <li className="px-4 py-3" onClick={() => handleInputChange('Date', 'type')}>
                                    Date
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>

                          <div className="relative w-300">
                            <label className='flex text-gray-500'>Required <p className='flex text-red-500 ml-2'>*</p></label>
                            <div className="details custom-select">
                              <div
                                className={`flex items-center w-full shadow-sm ${fieldData.required ? 'text-gray-700' : 'text-gray-500'} mt-3 p-2 rounded-lg border-2 border-slate-200 bg-white`}
                                onClick={() => setIsRequiredOpen(!isRequiredOpen)}
                              >
                                {fieldData.required ? fieldData.required : "Required"}
                                <p className='flex items-center ml-auto text-2xl'>&#8964;</p>
                              </div>
                              {isRequiredOpen && (
                                <ul className="list absolute w-full bg-white border-slate-200 border top-full left-0 px-0 box-border rounded-md max-h-200 overflow-y-auto">
                                  <li className="px-4 py-3 border-b border-gray-300" onClick={() => handleInputChange('Yes', 'required')}>
                                    Yes
                                  </li>
                                  <li className="px-4 py-3" onClick={() => handleInputChange('No', 'required')}>
                                    No
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>
                          {fieldData.type === 'Text' || fieldData.type === 'Long Text' || fieldData.type === '' ? (
                            <>
                              <div>
                                <label className='flex text-gray-500'>Label <p className='flex text-red-500 ml-2'>*</p></label>
                                <input className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="text" placeholder="Add Label"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'addLabel')}
                                />
                              </div>
                              <div>
                                <label className='text-gray-500'>Value</label>
                                <input className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="text" placeholder="Value"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'value')}
                                />
                              </div>
                              <div>
                                <label className='text-gray-500'>Help Text</label>
                                <input className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="text" placeholder="Help Text"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'helpText')}
                                />
                              </div>
                            </>
                          ) : fieldData.type === 'Number' ? (
                            <>
                              <div>
                                <label className="flex text-gray-500">Min Value <p className='flex text-red-500 ml-2'>*</p></label>
                                <input
                                  className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="number"
                                  placeholder="Min Value"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'minValue')}
                                />
                              </div>
                              <div>
                                <label className="flex text-gray-500">Max Value <p className='flex text-red-500 ml-2'>*</p></label>
                                <input
                                  className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="number"
                                  placeholder="Max Value"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'maxValue')}
                                />
                              </div>
                            </>
                          ) : fieldData.type === 'Date' ? (
                            <>
                              <div>
                                <label className="flex text-gray-500">Min Date <p className='flex text-red-500 ml-2'>*</p></label>
                                <input
                                  className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="date"
                                  placeholder="Min Date"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'minDate')}
                                />
                              </div>
                              <div>
                                <label className="flex text-gray-500">Max Date <p className='flex text-red-500 ml-2'>*</p></label>
                                <input
                                  className="w-full shadow-sm text-gray-700 mt-3 p-3 rounded-lg border-2 border-slate-200"
                                  type="date"
                                  placeholder="Max Date"
                                  onChange={(e) => handleInputChange(e.currentTarget.value, 'maxDate')}
                                />
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Draggable>
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  )
}