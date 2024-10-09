import { useState } from "react";
import ProductInput from "./ProductInput";
import DiscountInput from "./DiscountInput";
import ProductManagement from "./ProductManagement";
import ProductSelectorModal from "../modal/ProductSelectorModal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ProductAdder() {
    const [productSets, setProductSets] = useState([{ selectedProducts: [], discountAmount: 0, discountType: 'percent' }]);
    const [showDiscount, setShowDiscount] = useState([false]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState("");

    const openModal = (index) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleAddProducts = (newProducts) => {
        setProductSets(prev => {
            const updatedSets = [...prev];
            if (editingIndex !== null) {
                updatedSets[editingIndex].selectedProducts = [
                    ...updatedSets[editingIndex].selectedProducts,
                    ...newProducts
                ];
            } else {
                updatedSets.push({ selectedProducts: newProducts, discountAmount: 0, discountType: 'percent' });
            }
            return updatedSets;
        });
        closeModal();
    };


    const toggleDiscountInput = (index) => {
        setShowDiscount(prev => {
            const newShowDiscount = [...prev];
            newShowDiscount[index] = !newShowDiscount[index];
            return newShowDiscount;
        });
    };

    const addProductSet = () => {
        if (productSets.length >= 4) {
            setError("You can only add up to 4 product fields.");
            return;
        }
        setProductSets(prev => [...prev, { selectedProducts: [], discountAmount: 0, discountType: 'percent' }]);
        setShowDiscount(prev => [...prev, false]);
        setError("");
    };

    const removeProduct = (setIndex, productIndex) => {
        setProductSets(prev => {
            const updatedSets = [...prev];
            updatedSets[setIndex].selectedProducts.splice(productIndex, 1);
            return updatedSets;
        });
    };

    const removeItem = (setIndex) => {
        setProductSets(prev => prev.filter((_, index) => index !== setIndex));
        setShowDiscount(prev => prev.filter((_, index) => index !== setIndex));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedProductSets = Array.from(productSets);
        const [movedItem] = reorderedProductSets.splice(result.source.index, 1);
        reorderedProductSets.splice(result.destination.index, 0, movedItem);
        setProductSets(reorderedProductSets);
    };

    const updateProductSet = (index, newValues) => {
        setProductSets(prev => {
            const updatedSets = [...prev];
            updatedSets[index] = { ...updatedSets[index], ...newValues };
            return updatedSets;
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Add Products</h2>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="productSets">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {productSets.map((set, index) => (
                                <Draggable key={index} draggableId={`set-${index}`} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-6">
                                            <div className="flex justify-between space-x-4">
                                                <ProductInput
                                                    index={index}
                                                    selectedProducts={set.selectedProducts}
                                                    openModal={() => openModal(index)}
                                                />
                                                <DiscountInput
                                                    index={index}
                                                    showDiscount={showDiscount[index]}
                                                    toggleDiscountInput={() => toggleDiscountInput(index)}
                                                    discountAmount={set.discountAmount}
                                                    setDiscountAmount={(amount) => updateProductSet(index, { discountAmount: amount })}
                                                    discountType={set.discountType}
                                                    setDiscountType={(type) => updateProductSet(index, { discountType: type })}
                                                    removeItem={() => removeItem(index)}
                                                />
                                            </div>
                                            <ProductManagement
                                                products={set.selectedProducts}
                                                setProducts={(newProducts) => updateProductSet(index, { selectedProducts: newProducts })}
                                                discountAmount={set.discountAmount}
                                                discountType={set.discountType}
                                                removeProduct={(productIndex) => removeProduct(index, productIndex)}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="flex justify-end mt-4">
                <button
                    className="w-[193px] h-[48px] text-[#008060] border-2 border-[#008060] rounded-[4px] hover:bg-[#008060] hover:text-white"
                    onClick={addProductSet}
                >
                    Add Product
                </button>
            </div>
            {isModalOpen && (
                <ProductSelectorModal
                    closeModal={closeModal}
                    onAddProducts={handleAddProducts}
                />
            )}
        </div>
    );
}
