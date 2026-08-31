export type ProductCategory = 
  | 'all'
  | 'full-sleeve-shirt'
  | 'half-sleeve-shirt'
  | 't-shirt'
  | 'polo'
  | 'pant'
  | 'formal-shirt'
  | 'panjabi'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  banglaName?: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fabric: string;
  fit: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stock: number;
}

export interface CartItem {
  id: string; // unique item id combining product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type DeliveryArea = 'inside_dhaka' | 'outside_dhaka';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export type OrderStatus = 'Processing' | 'Packed' | 'Dispatched' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  deliveryArea: DeliveryArea;
  deliveryFee: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  courier: 'Pathao Courier' | 'Steadfast Courier';
  trackingNumber: string;
  notes?: string;
}

export type ActiveTab = 'home' | 'shop' | 'categories' | 'orders' | 'account' | 'wishlist';
