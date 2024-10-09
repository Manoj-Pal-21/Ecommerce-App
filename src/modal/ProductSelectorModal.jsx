import { useState, useEffect, useCallback } from 'react';
import { MdClose, MdSearch, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../loader';

export default function ProductSelectorModal({ closeModal, onAddProducts }) {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://stageapi.monkcommerce.app/task/products/search?search=${searchTerm}&page=${currentPage}&limit=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '72njgfa948d9aS7gs5',
                },
            });
            const data = await response.json();

            setProducts(prev => [...prev, ...data]);
            setHasMore(data.length === 10); 
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentPage]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const toggleVariant = (variantId) => {
        setSelectedProducts(prev =>
            prev.includes(variantId) ? prev.filter(id => id !== variantId) : [...prev, variantId]
        );
    };

    const toggleAllVariants = (product) => {
        const variantIds = product.variants.map(variant => variant.id);
        setSelectedProducts(prev => {
            const allSelected = variantIds.every(id => prev.includes(id));
            return allSelected ? prev.filter(id => !variantIds.includes(id)) : [...prev, ...variantIds];
        });
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variants.some(variant => variant.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddClick = () => {
        const selectedVariants = filteredProducts.flatMap(product =>
            product.variants
                .filter(variant => selectedProducts.includes(variant.id))
                .map(variant => ({ ...product, variant }))
        );

        const uniqueProducts = selectedVariants.filter((item, index, self) =>
            index === self.findIndex(t => t.variant.id === item.variant.id)
        );

        onAddProducts(uniqueProducts);
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
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search product"
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                                setProducts([]);
                                setHasMore(true);
                            }}
                        />
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        <InfiniteScroll
                            dataLength={filteredProducts.length}
                            next={() => setCurrentPage(prev => prev + 1)}
                            hasMore={hasMore}
                            loader={loading ? <Loader /> : null}
                            endMessage={<p>No more products</p>}
                        >
                            {filteredProducts.map(product => (
                                <div key={product.id} className="mb-4 border-b last:border-b-0 pb-2">
                                    <div className="flex items-center py-2">
                                        <button onClick={() => toggleAllVariants(product)} className="mr-2 text-green-600">
                                            {product.variants.every(variant => selectedProducts.includes(variant.id))
                                                ? <MdCheckBox size={24} />
                                                : <MdCheckBoxOutlineBlank size={24} />}
                                        </button>
                                        {product.image && (
                                            <img src={product.image.src} alt={product.title} className="w-10 h-10 object-cover mr-2" />
                                        )}
                                        <div className="flex-grow">
                                            <p className="font-semibold">{product.title}</p>
                                        </div>
                                    </div>
                                    <div className="ml-8">
                                        {product.variants.map(variant => (
                                            <div key={variant.id} className="flex items-center py-2">
                                                <button onClick={() => toggleVariant(variant.id)} className="mr-2 text-green-600">
                                                    {selectedProducts.includes(variant.id)
                                                        ? <MdCheckBox size={24} />
                                                        : <MdCheckBoxOutlineBlank size={24} />}
                                                </button>
                                                <div className="flex-grow">
                                                    <p className="text-sm font-semibold">{variant.title}</p>
                                                </div>
                                                <div className="text-right px-6">
                                                    <p className="text-sm font-semibold">{variant.inventory_quantity} available</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold">${parseFloat(variant.price).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t">
                    <p>{selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected</p>
                    <div className="flex mt-2 md:mt-0">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 border border-black border-opacity-25 text-gray-600 hover:bg-gray-200 hover:text-gray-800 mr-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button onClick={handleAddClick} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
