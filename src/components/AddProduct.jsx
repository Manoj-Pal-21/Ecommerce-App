import { useState } from "react";
import ProductManagement from "./Products";
import { MdClose, MdEdit } from "react-icons/md";
import ProductSelectorModal from "../modal/ProductSelectorModal";

export default function ProductAdder() {
    const [showDiscount, setShowDiscount] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountType, setDiscountType] = useState('percent');
    const [productName, setProductName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleDiscountInput = () => {
        setShowDiscount(!showDiscount);
    };

    const openModal = async () => {
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
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch product data:", error);
        }
    };

    const closeModal = () => setIsModalOpen(false);

    const handleAddProducts = (newProducts) => {
        setSelectedProducts(prev => [...prev, ...newProducts]);
        closeModal();
    };

    return (
        <div className="w-full max-w-xl mx-auto p-4 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-left leading-6">Add Products</h2>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-col flex-grow relative">
                    <label className="text-gray-700 mb-1 font-semibold">Product</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={selectedProducts.length > 0 ? selectedProducts[0].title : ''}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            placeholder="Select Product"
                        />
                        <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none" aria-label="Edit product name">
                            <MdEdit size={20} onClick={openModal} />
                        </button>
                    </div>
                </div>


                <div className="flex flex-col relative">
                    <label className="text-gray-700 mb-1 font-semibold">Discount</label>
                    {showDiscount ? (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={discountAmount}
                                onChange={(e) => setDiscountAmount(e.target.value)}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Dis..."
                                aria-label="Discount amount"
                            />
                            <select
                                value={discountType}
                                onChange={(e) => setDiscountType(e.target.value)}
                                className="w-30 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Discount type"
                            >
                                <option value="percent"> % Off </option>
                                <option value="flat"> Flat Off </option>
                            </select>
                            <button
                                onClick={toggleDiscountInput}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Close discount input"
                            >
                                <MdClose size={20} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={toggleDiscountInput}
                            className="bg-[#008060] text-white px-4 py-2 rounded-md hover:bg-green-600"
                            aria-label="Apply discount"
                        >
                            Apply Discount
                        </button>
                    )}
                </div>
            </div>
            <ProductManagement products={selectedProducts} discountAmount={discountAmount} discountType={discountType} />
            <div className="flex flex-col mt-4">
                <div className="flex justify-end">
                    <button className="w-[193px] h-[48px] px-4 py-2 text-[#008060] border-2 border-[#008060] rounded-[4px] bg-transparent hover:bg-[#008060] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#008060] focus:ring-opacity-50 transition-colors duration-200">
                        Add Product
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <ProductSelectorModal
                    closeModal={closeModal}
                    productData={productData}
                    onAddProducts={handleAddProducts}
                />
            )}
        </div>
    );
}
