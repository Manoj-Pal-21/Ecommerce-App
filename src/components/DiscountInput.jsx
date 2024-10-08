import { MdClose } from "react-icons/md";

export default function DiscountInput({
    showDiscount,
    toggleDiscountInput,
    discountAmount,
    setDiscountAmount,
    discountType,
    setDiscountType,
    removeItem,
}) {
    return (
        <div className="flex flex-col relative">
            <label className="text-gray-700 mb-2 font-semibold">Discount</label>
            {showDiscount ? (
                <div className="flex items-center space-x-3">
                    <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Amount"
                    />
                    <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="percent"> % Off </option>
                        <option value="flat"> Flat Off </option>
                    </select>
                    <button
                        onClick={toggleDiscountInput}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <MdClose size={20} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center space-x-3">
                    <button
                        onClick={toggleDiscountInput}
                        className="bg-[#008060] text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Apply Discount
                    </button>
                    <button
                        onClick={removeItem}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <MdClose size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
