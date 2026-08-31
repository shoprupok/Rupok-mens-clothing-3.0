import React from 'react';
import { Home, ShoppingBag, LayoutGrid, ClipboardList, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  ordersCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  ordersCount,
}) => {
  const navItems: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, badge: cartCount },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ClipboardList, badge: ordersCount },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[520px] lg:max-w-[1100px] h-[68px] bg-white/95 backdrop-blur-md border-t border-zinc-200 grid grid-cols-5 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            id={`nav-item-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center transition-all relative group cursor-pointer ${
              isActive ? 'text-[#f45b16]' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <span className="absolute top-0 w-8 h-1 bg-[#f45b16] rounded-b-full shadow-sm" />
            )}

            <div className="relative">
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              {item.badge && item.badge > 0 ? (
                <span className="absolute -top-1.5 -right-2.5 bg-[#f45b16] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              ) : null}
            </div>

            <span className="text-[11px] font-bold mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
