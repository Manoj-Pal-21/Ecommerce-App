import { useState } from "react";
import { MdClose, MdExpandLess, MdExpandMore } from "react-icons/md";

export default function ProductManagement({ products, discountAmount, discountType, removeProduct }) {
    const [showVariants, setShowVariants] = useState(false);

    const toggleVariants = () => {
        setShowVariants(!showVariants);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold"></h2>
                    <button onClick={toggleVariants} className="text-blue-500 text-sm flex items-center">
                        {showVariants ? 'Hide variants' : 'Show variants'}
                        {showVariants ? <MdExpandLess className="ml-1" /> : <MdExpandMore className="ml-1" />}
                    </button>
                </div>
                {showVariants && (
                    <div className="mt-2 space-y-2">
                        {products.length === 0 ? (
                            <p className="text-gray-500">No products selected.</p>
                        ) : (
                            products.map((product, index) => (
                                <div key={index} className="flex items-center justify-between mb-2 border-b pb-2">
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
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
