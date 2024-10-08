// src/modal/ProductSelectorModal.js
import { useState } from 'react';
import { MdClose, MdSearch, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

export default function ProductSelectorModal({ closeModal, productData, onAddProducts }) {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleVariant = (variantId) => {
        setSelectedProducts((prev) =>
            prev.includes(variantId) ? prev.filter((p) => p !== variantId) : [...prev, variantId]
        );
    };

    const isAllVariantsSelected = (product) => {
        return product.variants.every((variant) => selectedProducts.includes(variant.id));
    };

    const toggleAllVariants = (product) => {
        const variantIds = product.variants.map(variant => variant.id);
        if (isAllVariantsSelected(product)) {
            setSelectedProducts((prev) => prev.filter(id => !variantIds.includes(id)));
        } else {
            setSelectedProducts((prev) => [...prev, ...variantIds]);
        }
    };

    const filteredProducts = productData.filter((product) => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddClick = () => {
        const productsToAdd = productData.filter(product => 
            selectedProducts.includes(product.id)
        );
        onAddProducts(productsToAdd);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Select Products</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        <MdClose size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    />
                    {filteredProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <div>
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="flex items-center justify-between p-2 border-b">
                                    <div>
                                        <h3 className="font-semibold">{product.title}</h3>
                                        <div>
                                            <button onClick={() => toggleAllVariants(product)}>
                                                {isAllVariantsSelected(product) ? (
                                                    <MdCheckBox size={20} />
                                                ) : (
                                                    <MdCheckBoxOutlineBlank size={20} />
                                                )}
                                            </button>
                                            {product.variants.map((variant) => (
                                                <span key={variant.id} className="ml-2">
                                                    {variant.option1}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => toggleVariant(product.id)}>
                                        {selectedProducts.includes(product.id) ? (
                                            <MdCheckBox size={20} />
                                        ) : (
                                            <MdCheckBoxOutlineBlank size={20} />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button onClick={handleAddClick} className="bg-[#008060] text-white px-4 py-2 rounded-md">
                        Add Selected Products
                    </button>
                </div>
            </div>
        </div>
    );
}
