import { useState } from "react";
import { MdClose, MdExpandLess, MdExpandMore, MdDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ProductManagement({ products, discountAmount, discountType, removeProduct, updateVariants }) {
    const [showVariants, setShowVariants] = useState(false);

    const toggleVariants = () => setShowVariants(prev => !prev);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedVariants = Array.from(products);
        const [movedVariant] = reorderedVariants.splice(result.source.index, 1);
        reorderedVariants.splice(result.destination.index, 0, movedVariant);
        updateVariants(reorderedVariants);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h6 className="text-sm font-semibold">Product Variants</h6>
                    <button onClick={toggleVariants} className="text-blue-500 text-sm flex items-center">
                        {showVariants ? 'Hide variants' : 'Show variants'}
                        {showVariants ? <MdExpandLess className="ml-1" /> : <MdExpandMore className="ml-1" />}
                    </button>
                </div>
                {showVariants && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="variants">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="mt-2 space-y-2">
                                    {products.length === 0 ? (
                                        <p className="text-gray-500">No products selected.</p>
                                    ) : (
                                        products.map((product, index) => (
                                            <Draggable key={index} draggableId={`variant-${index}`} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center justify-between mb-2 border-b pb-2"
                                                    >
                                                        <div className="flex items-center">
                                                            <MdDragIndicator className="mr-2 cursor-pointer" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={product.variant?.option1 || ''}
                                                            readOnly
                                                            className="flex-grow px-5 py-2 border border-gray-300 rounded-md focus:outline-none"
                                                        />
                                                        <input
                                                            type="number"
                                                            value={discountAmount}
                                                            readOnly
                                                            className="w-20 px-5 py-2 border border-gray-300 rounded-md focus:outline-none ml-2"
                                                        />
                                                        <select
                                                            value={discountType}
                                                            readOnly
                                                            className="w-30 px-5 py-2 border border-gray-300 rounded-md focus:outline-none ml-2"
                                                        >
                                                            <option value="percent"> % Off </option>
                                                            <option value="flat"> Flat Off </option>
                                                        </select>
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600"
                                                            onClick={() => removeProduct(index)}
                                                        >
                                                            <MdClose size={20} />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
}
