import { useState } from "react";
import ProductInput from "./ProductInput";
import DiscountInput from "./DiscountInput";
import ProductManagement from "./ProductManagement";
import ProductSelectorModal from "../modal/ProductSelectorModal";
import Loader from "../loader";

export default function ProductAdder() {
    const [showDiscount, setShowDiscount] = useState([false]);
    const [productSets, setProductSets] = useState([{ selectedProducts: [], discountAmount: 0, discountType: 'percent' }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = async (index) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://stageapi.monkcommerce.app/task/products/search?search=Hat&page=2&limit=1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '72njgfa948d9aS7gs5',
                },
            });
            const data = await response.json();
            setProductData(data);
            setEditingIndex(index);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch product data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleAddProducts = (newProducts) => {
        if (editingIndex !== null) {
            setProductSets(prev => {
                const updatedSets = [...prev];
                updatedSets[editingIndex].selectedProducts = newProducts;
                return updatedSets;
            });
        } else {
            setProductSets(prev => [...prev, { selectedProducts: newProducts, discountAmount: 0, discountType: 'percent' }]);
        }
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
        setProductSets(prev => [...prev, { selectedProducts: [], discountAmount: 0, discountType: 'percent' }]);
        setShowDiscount(prev => [...prev, false]);
    };

    const removeProduct = (setIndex, productIndex) => {
        setProductSets(prev => {
            const updatedSets = [...prev];
            updatedSets[setIndex].selectedProducts.splice(productIndex, 1);
            return updatedSets;
        });
    };

    const removeItem = (setIndex) => {
        setProductSets(prev => {
            const updatedSets = [...prev];
            updatedSets.splice(setIndex, 1);
            return updatedSets;
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Add Products</h2>
            {productSets.map((set, index) => (
                <div key={index} className="mb-6">
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
                            setDiscountAmount={(amount) => {
                                const updatedSets = [...productSets];
                                updatedSets[index].discountAmount = amount;
                                setProductSets(updatedSets);
                            }}
                            discountType={set.discountType}
                            setDiscountType={(type) => {
                                const updatedSets = [...productSets];
                                updatedSets[index].discountType = type;
                                setProductSets(updatedSets);
                            }}
                            removeItem={() => removeItem(index)}
                        />
                    </div>
                    <ProductManagement
                        products={set.selectedProducts}
                        discountAmount={set.discountAmount}
                        discountType={set.discountType}
                        removeProduct={(productIndex) => removeProduct(index, productIndex)}
                    />
                </div>
            ))}
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
                    productData={productData}
                    onAddProducts={handleAddProducts}
                >
                    {isLoading && (
                        <Loader />
                    )}
                </ProductSelectorModal>
            )}
        </div>
    );
}
