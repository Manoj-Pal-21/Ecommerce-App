import React from 'react';

const Header = () => {
    return (
        <nav className="bg-white border-b border-gray-300">
            <div className="flex justify-between p-4">
                <div className="flex items-center space-x-2">
                    <img src="/Images/monk-logo.png" alt="Monk Logo" className="h-8 w-auto" />
                    <span className="text-[#7E8185] font-semibold text-[16px] leading-[24px]">
                        Monk Upsell & Cross-sell
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Header;
