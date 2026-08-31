import React, { useState, useEffect } from 'react';
import { Product, ProductCategory, CartItem, Order, DeliveryArea, ActiveTab } from './types';
import { PRODUCTS_DATA, INITIAL_ORDERS } from './data/products';
import { Header } from './components/Header';
import { CategoryStoryReels } from './components/CategoryStoryReels';
import { Hero } from './components/Hero';
import { FeatureHighlights } from './components/FeatureHighlights';
import { FlashDealsSection } from './components/FlashDealsSection';
import { CategorySectionRow } from './components/CategorySectionRow';
import { ShopTheLook } from './components/ShopTheLook';
import { CategoryGrid } from './components/CategoryGrid';
import { CuratedTabsSection } from './components/CuratedTabsSection';
import { DeliveryInfoBanner } from './components/DeliveryInfoBanner';
import { ShopByOccasion } from './components/ShopByOccasion';
import { WhyChooseRupok } from './components/WhyChooseRupok';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { FAQSection } from './components/FAQSection';
import { NewsletterVIP } from './components/NewsletterVIP';
import { ServiceInfoGrid } from './components/ServiceInfoGrid';
import { PromoOfferBar } from './components/PromoOfferBar';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { SideMenuDrawer } from './components/SideMenuDrawer';
import { SmartFitFinderModal } from './components/SmartFitFinderModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { ShopView } from './components/ShopView';
import { CategoryView } from './components/CategoryView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { AccountView } from './components/AccountView';
import { Footer } from './components/Footer';
import { Crown, Shirt, Tag, Scissors } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [products] = useState<Product[]>(PRODUCTS_DATA);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rupok_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('rupok_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['hero-zara-terracotta', 'hero-lacoste-blue']);
    } catch {
      return new Set(['hero-zara-terracotta', 'hero-lacoste-blue']);
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rupok_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Delivery & Coupon
  const [deliveryArea, setDeliveryArea] = useState<DeliveryArea>('inside_dhaka');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Modals and Drawers
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isFitAdvisorOpen, setIsFitAdvisorOpen] = useState<boolean>(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('rupok_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('rupok_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('rupok_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Apply Coupon logic
  const handleApplyCoupon = (code: string): boolean => {
    if (code.toUpperCase() === 'RUPOK10') {
      const discount = Math.round(subtotal * 0.10);
      setDiscountAmount(discount);
      setCouponCode('RUPOK10');
      return true;
    }
    return false;
  };

  // Recompute coupon if subtotal changes
  useEffect(() => {
    if (couponCode === 'RUPOK10') {
      setDiscountAmount(Math.round(subtotal * 0.10));
    }
  }, [subtotal, couponCode]);

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }
      return next;
    });
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    size: string = product.sizes[0] || 'M (38)',
    color: string = product.colors[0]?.name || 'Standard',
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  // Add multiple items (from Outfit Lookbook)
  const handleAddOutfitToCart = (
    items: { product: Product; size: string; color: string; quantity: number }[]
  ) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.size, item.color, item.quantity);
    });
  };

  // Buy Now handler
  const handleBuyNow = (
    product: Product,
    size: string = product.sizes[0] || 'M (38)',
    color: string = product.colors[0]?.name || 'Standard',
    quantity: number = 1
  ) => {
    handleAddToCart(product, size, color, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  // Cart quantity updater
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Order placed callback
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setDiscountAmount(0);
    setCouponCode('');
  };

  // Wishlist products array
  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  const handleViewCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#111111] antialiased selection:bg-[#f45b16] selection:text-white">
      {/* Centered Modern Container */}
      <div 
        id="app-container"
        className="max-w-[1280px] mx-auto min-h-screen bg-white shadow-2xl flex flex-col justify-between pb-[75px] relative transition-all border-x border-zinc-200/70"
      >
        {/* Header (LiveShopping BD Structure) */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveTab('shop');
          }}
          wishlistCount={wishlistIds.size}
          cartCount={cartCount}
          subtotal={subtotal}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenFitAdvisor={() => setIsFitAdvisorOpen(true)}
        />

        {/* Main Content Area based on active tab */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
              {/* TOP INSTAGRAM-STYLE CATEGORY STORIES / REELS */}
              <CategoryStoryReels
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('shop');
                }}
                onOpenFlashSale={() => {
                  const el = document.getElementById('flash-deals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* HERO SECTION */}
              <Hero
                onShopNow={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
                onSelectProduct={(productId) => {
                  const found = products.find((p) => p.id === productId);
                  if (found) {
                    setSelectedProductForModal(found);
                  } else {
                    setSelectedCategory('all');
                    setActiveTab('shop');
                  }
                }}
              />

              {/* 4-COLUMN TRUST & DELIVERY FEATURES (LiveShopping Style) */}
              <FeatureHighlights />

              {/* FLASH SALE WITH REAL-TIME COUNTDOWN TIMER */}
              <FlashDealsSection
                products={products}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                onQuickAdd={(p) => handleAddToCart(p)}
                onViewAll={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />

              {/* DEDICATED CATEGORY SHOWCASE ROWS (LiveShopping BD Signature Layout) */}
              {/* 1. PANJABI COLLECTION */}
              <CategorySectionRow
                title="ROYAL HERITAGE COLLECTION"
                banglaTitle="এক্সক্লুসিভ পাঞ্জাবি কালেকশন"
                subtitle="জ্যাকার্ড কটন, ডিজিটাল প্রিন্ট ও লাক্সারি ওয়াশ পাঞ্জাবি"
                category="panjabi"
                icon={<Crown size={18} />}
                badge="HOT DROP"
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p, s) => handleAddToCart(p, s)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
                onViewCategory={handleViewCategory}
                limit={4}
              />

              {/* 2. SHIRTS COLLECTION */}
              <CategorySectionRow
                title="PREMIUM EXPORT SHIRTS"
                banglaTitle="ফরমাল ও ক্যাজুয়াল শার্ট"
                subtitle="১০০% কটন টুইল, অক্সফোর্ড ও প্রিমিয়াম চেক শার্ট"
                category="shirt"
                icon={<Shirt size={18} />}
                badge="BESTSELLER"
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p, s) => handleAddToCart(p, s)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
                onViewCategory={handleViewCategory}
                limit={4}
              />

              {/* 3. POLO SHIRTS COLLECTION */}
              <CategorySectionRow
                title="CASUAL ESSENTIALS"
                banglaTitle="প্রিমিয়াম পোলো টি-শার্ট"
                subtitle="পিকে নিট ফেব্রিক, আরামদায়ক ফিটিং ও ভাইব্রেন্ট কালার"
                category="polo"
                icon={<Tag size={18} />}
                badge="NEW IN"
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p, s) => handleAddToCart(p, s)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
                onViewCategory={handleViewCategory}
                limit={4}
              />

              {/* 4. CHINOS & PANTS COLLECTION */}
              <CategorySectionRow
                title="BOTTOM WEAR"
                banglaTitle="স্ট্রেচ চিনো ও প্রিমিয়াম প্যান্ট"
                subtitle="স্লিম ফিট স্ট্রেচ কটন ও অল-ডে কমফোর্ট ফেব্রিক"
                category="pants"
                icon={<Scissors size={18} />}
                badge="TOP PICK"
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p, s) => handleAddToCart(p, s)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
                onViewCategory={handleViewCategory}
                limit={4}
              />

              {/* MODERN LOOKBOOK & OUTFIT BUNDLE BUILDER */}
              <ShopTheLook
                products={products}
                onAddOutfitToCart={handleAddOutfitToCart}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
              />

              {/* SHOP BY CATEGORY 8-GRID */}
              <CategoryGrid
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('shop');
                }}
                onViewAll={() => setActiveTab('categories')}
              />

              {/* CURATED TABS: BEST SELLERS, NEW DROPS, PREMIUM, UNDER 999 */}
              <CuratedTabsSection
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p) => handleAddToCart(p)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
                onViewAll={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />

              {/* SHOP BY OCCASION / LOOKBOOK */}
              <ShopByOccasion
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('shop');
                }}
              />

              {/* DELIVERY RATES & GUARANTEE BANNER */}
              <DeliveryInfoBanner />

              {/* WHY CHOOSE RUPOK - 4 PILLARS QUALITY SPOTLIGHT */}
              <WhyChooseRupok />

              {/* 70% OFF MEGA OFFER & VOUCHER CODE */}
              <PromoOfferBar
                onShopNow={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />

              {/* VERIFIED CUSTOMER REVIEWS & SOCIAL PROOF */}
              <CustomerReviewsSection />

              {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
              <FAQSection />

              {/* VIP CLUB VOUCHER & NEWSLETTER */}
              <NewsletterVIP />

              {/* SERVICE INFO BOX (6-Grid) */}
              <ServiceInfoGrid />
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="animate-in fade-in duration-300">
              <ShopView
                products={products}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onQuickAdd={(p) => handleAddToCart(p)}
                onSelectProduct={(p) => setSelectedProductForModal(p)}
                justAddedId={justAddedId}
              />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="animate-in fade-in duration-300">
              <CategoryView
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setActiveTab('shop');
                }}
              />
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="animate-in fade-in duration-300">
              <OrderTrackingView
                orders={orders}
                onShopNow={() => {
                  setSelectedCategory('all');
                  setActiveTab('shop');
                }}
              />
            </div>
          )}

          {activeTab === 'account' && (
            <div className="animate-in fade-in duration-300">
              <AccountView
                ordersCount={orders.length}
                wishlistCount={wishlistIds.size}
                setActiveTab={setActiveTab}
                onOpenWishlist={() => setIsWishlistOpen(true)}
              />
            </div>
          )}

          {/* GLOBAL FOOTER (LiveShopping BD Comprehensive Structure) */}
          <Footer
            setActiveTab={setActiveTab}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('shop');
            }}
          />
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartCount}
          ordersCount={orders.length}
        />

        {/* FLOATING ACTION BAR: Quick Bag Checkout & WhatsApp Concierge */}
        <FloatingActionBar
          cartCount={cartCount}
          subtotal={subtotal}
          onOpenCart={() => setIsCartOpen(true)}
          onQuickCheckout={() => setIsCheckoutOpen(true)}
        />

        {/* MODALS & DRAWERS */}
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={(p, s, c, q) => handleAddToCart(p, s, c, q)}
          onBuyNow={(p, s, c, q) => handleBuyNow(p, s, c, q)}
          isWishlisted={selectedProductForModal ? wishlistIds.has(selectedProductForModal.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          deliveryArea={deliveryArea}
          setDeliveryArea={setDeliveryArea}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountAmount={discountAmount}
          onApplyCoupon={handleApplyCoupon}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          deliveryArea={deliveryArea}
          setDeliveryArea={setDeliveryArea}
          discountAmount={discountAmount}
          onOrderPlaced={handleOrderPlaced}
          onViewOrders={() => setActiveTab('orders')}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          onRemoveWishlist={handleToggleWishlist}
          onAddToCart={(p) => {
            handleAddToCart(p);
            handleToggleWishlist(p);
          }}
          onSelectProduct={(p) => setSelectedProductForModal(p)}
        />

        <QuickSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
          onSelectProduct={(p) => setSelectedProductForModal(p)}
        />

        <SideMenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveTab('shop');
          }}
          setActiveTab={setActiveTab}
        />

        {/* SMART FIT & SIZE ADVISOR MODAL */}
        <SmartFitFinderModal
          isOpen={isFitAdvisorOpen}
          onClose={() => setIsFitAdvisorOpen(false)}
        />
      </div>
    </div>
  );
}

