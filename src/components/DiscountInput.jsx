import { MdClose } from "react-icons/md";

export default function DiscountInput({ showDiscount, toggleDiscountInput, discountAmount, setDiscountAmount, discountType, setDiscountType }) {
    return (
        <div className="flex flex-col relative">
            <label className="text-gray-700 mb-1 font-semibold">Discount</label>
            {showDiscount ? (
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Dis..."
                    />
                    <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="w-30 px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="percent"> % Off </option>
                        <option value="flat"> Flat Off </option>
                    </select>
                    <button onClick={toggleDiscountInput} className="text-gray-400 hover:text-gray-600">
                        <MdClose size={20} />
                    </button>
                </div>
            ) : (
                <button onClick={toggleDiscountInput} className="bg-[#008060] text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Apply Discount
                </button>
            )}
        </div>
    );
}