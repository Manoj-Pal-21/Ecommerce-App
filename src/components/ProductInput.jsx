import { MdEdit, MdDragIndicator } from "react-icons/md";

export default function ProductInput({ index, selectedProducts, openModal }) {
    return (
        <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-700 mb-1 font-semibold">Product</label>
            <div className="relative flex items-center">
                <span className="mr-2 font-semibold text-gray-700 flex items-center">
                    <MdDragIndicator size={20} className="mr-1 cursor-move" /> 
                    {index + 1}.
                </span>
                <input
                    type="text"
                    value={selectedProducts.length > 0 ? selectedProducts[0].title : ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                    placeholder="Select Product"
                    readOnly
                />
                <button
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    onClick={openModal}
                >
                    <MdEdit size={20} />
                </button>
            </div>
        </div>
    );
}
