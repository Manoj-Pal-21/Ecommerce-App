import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess, MdClose } from 'react-icons/md';

export default function ProductManagement({ products, discountAmount, discountType }) {
    const [showVariants, setShowVariants] = useState(false);

    const toggleVariants = () => {
        setShowVariants(!showVariants);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center">
                        <div className="flex-grow">

                        </div>
                        <button
                            onClick={toggleVariants}
                            className="text-blue-500 text-sm"
                        >
                            {showVariants ? 'Hide variants' : 'Show variants'}
                            {showVariants ? <MdExpandLess className="inline" /> : <MdExpandMore className="inline" />}
                        </button>
                    </div>
                    {showVariants && (
                        <div className="ml-6 mt-2 space-y-2">
                            {products.length === 0 ? (
                                <p>No products selected.</p>
                            ) : (
                                products.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    value={product.variant?.option1 || ''}
                                                    placeholder="Variants Product"
                                                    readOnly
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                value={discountAmount}
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                placeholder="Dis..."
                                                aria-label="Discount amount"
                                                readOnly
                                            />
                                            <select
                                                value={discountType}
                                                className="w-30 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                aria-label="Discount type"
                                                readOnly
                                            >
                                                <option value="percent"> % Off </option>
                                                <option value="flat"> Flat Off </option>
                                            </select>
                                            <button
                                                onClick={() => { }}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                                aria-label="Close discount input"
                                            >
                                                <MdClose size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}