'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Package, FileText, Settings, LogOut, Plus, Edit2, Trash2, X, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const { user, role, loading, login, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'homepage'>('dashboard');
  const router = useRouter();

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '', type: 'Black Opal', price: '', description: '', image: '', origin: 'Lightning Ridge'
  });
  const [savingProduct, setSavingProduct] = useState(false);

  // Home Page Content State
  const [homeContent, setHomeContent] = useState<any>({
    heroTitleLine1: 'Australian',
    heroTitleLine2: 'Opals',
    heroSubtitle: "Ethically sourced, masterfully cut. We bring the world's most magnificent black opals directly from Lightning Ridge to you.",
    heroBackgroundImage: 'https://picsum.photos/seed/blackopaldirect-hero/1920/1080',
    founderMessage: "\"My name is Justin, and I've been mining and cutting opals all my life. We're based in Lightning Ridge, the home of the Black Opal. When you buy from OpalSeeker, you're buying directly from the source. No middlemen, just beautiful, ethically sourced, solid Australian opals.\""
  });
  const [savingHomeContent, setSavingHomeContent] = useState(false);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const ordersQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const ordersSnap = await getDocs(ordersQ);
      setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const prodQ = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const prodSnap = await getDocs(prodQ);
      setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const { getDoc } = await import('firebase/firestore');
      const homeSnap = await getDoc(doc(db, 'content', 'homePage'));
      if (homeSnap.exists()) {
        setHomeContent(homeSnap.data());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchData();
    }
  }, [role]);

  const handleSaveHomeContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHomeContent(true);
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'content', 'homePage'), {
        ...homeContent,
        updatedAt: Date.now()
      });
      alert('Home page content updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update home page content');
    } finally {
      setSavingHomeContent(false);
    }
  };

  const handleOpenProductModal = (product?: any) => {
    if (product) {
      setEditingProductId(product.id);
      setProductForm({
        name: product.name,
        type: product.type,
        price: product.price.toString(),
        description: product.description,
        image: product.image,
        origin: product.origin || 'Lightning Ridge'
      });
    } else {
      setEditingProductId(null);
      setProductForm({
        name: '', type: 'Black Opal', price: '', description: '', image: '', origin: 'Lightning Ridge'
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const priceNum = parseFloat(productForm.price);
      if (isNaN(priceNum) || priceNum < 0) throw new Error("Invalid price");

      const productData = {
        name: productForm.name,
        type: productForm.type,
        price: priceNum,
        description: productForm.description,
        image: productForm.image,
        origin: productForm.origin,
        updatedAt: Date.now()
      };

      if (editingProductId) {
        const existingProd = products.find(p => p.id === editingProductId);
        await updateDoc(doc(db, 'products', editingProductId), {
          ...productData,
          createdAt: existingProd?.createdAt || Date.now()
        });
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: Date.now()
        });
      }
      setIsProductModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product.");
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, 'products', productId));
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
      fetchData();
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order status.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#fcfbf9] flex items-center justify-center text-[#1a1a1a]/50 text-[10px] uppercase tracking-[0.2em]">Loading...</div>;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center space-y-8 bg-white p-12 shadow-sm border border-[#1a1a1a]/10">
            <div>
              <h1 className="text-3xl font-serif font-light mb-4">Admin Portal</h1>
              <p className="text-[#1a1a1a]/60 text-sm font-light">Please sign in with your administrative account to access the control panel.</p>
            </div>
            <button 
              onClick={login}
              className="w-full inline-flex items-center justify-center bg-[#1a1a1a] text-white px-8 py-4 uppercase text-[10px] tracking-[0.2em] hover:bg-[#1a1a1a]/80 transition-colors"
            >
              Admin Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (role !== 'admin') {
    return (
      <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center space-y-8 bg-white p-12 shadow-sm border border-[#1a1a1a]/10">
            <div>
              <h1 className="text-3xl font-serif font-light mb-4">Access Denied</h1>
              <p className="text-[#1a1a1a]/60 text-sm font-light">Your account does not have administrative privileges.</p>
            </div>
            <Link 
              href="/profile"
              className="w-full inline-flex items-center justify-center border border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 uppercase text-[10px] tracking-[0.2em] hover:bg-gray-50 transition-colors"
            >
              Return to Profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'homepage', label: 'Content', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] flex flex-col text-[#fcfbf9] fixed h-full z-10 transition-transform duration-300">
        <div className="p-8 pb-12">
          <Link href="/" className="font-serif text-2xl font-light italic tracking-tight block mb-2">OpalSeeker</Link>
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[#fcfbf9]/50 block">Admin Portal</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-3 text-sm transition-all rounded-sm ${isActive ? 'bg-[#fcfbf9]/10 text-white' : 'text-[#fcfbf9]/60 hover:text-white hover:bg-[#fcfbf9]/5'}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span className="font-light">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#fcfbf9]/10">
          <button 
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 text-sm text-[#fcfbf9]/60 hover:text-white transition-colors w-full px-2"
          >
            <LogOut size={16} />
            <span className="font-light">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-[#1a1a1a]/5 h-20 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center text-sm text-[#1a1a1a]/50">
            <span className="font-medium text-[#1a1a1a]">Admin</span>
            <ChevronRight size={14} className="mx-2" />
            <span className="capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-[#f0f0f0] flex items-center justify-center overflow-hidden border border-[#1a1a1a]/10">
               {user?.photoURL ? (
                 <img src={user.photoURL} alt="Admin" className="h-full w-full object-cover" />
               ) : (
                 <span className="text-xs font-medium uppercase">{user?.email?.charAt(0) || 'A'}</span>
               )}
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-10 flex-1">
          <div className="max-w-6xl mx-auto">
            {dataLoading ? (
              <div className="h-[60vh] flex flex-col items-center justify-center text-[#1a1a1a]/40 space-y-4">
                <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] uppercase tracking-[0.2em]">Loading workspace...</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-serif font-light mb-2">Welcome back, {user?.displayName || 'Admin'}</h2>
                      <p className="text-[#1a1a1a]/60 text-sm">Here is what's happening with your store today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                         <div className="text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-4 flex items-center gap-2"><ShoppingBag size={14}/> Total Orders</div>
                         <div className="text-4xl font-serif font-light">{orders.length}</div>
                         <div className="text-xs text-green-600 mt-2 font-medium">+12% from last month</div>
                      </div>
                      <div className="bg-white p-6 border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                         <div className="text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-4 flex items-center gap-2"><Package size={14}/> Listed Products</div>
                         <div className="text-4xl font-serif font-light">{products.length}</div>
                         <div className="text-xs text-[#1a1a1a]/40 mt-2 font-medium">Available in catalog</div>
                      </div>
                      <div className="bg-white p-6 border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                         <div className="text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-4 flex items-center gap-2"><LayoutDashboard size={14}/> Total Revenue</div>
                         <div className="text-4xl font-serif font-light">
                           ${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString()}
                         </div>
                         <div className="text-xs text-green-600 mt-2 font-medium">All time</div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#1a1a1a]/5 shadow-sm rounded-sm p-8">
                      <h3 className="font-serif text-xl mb-6 font-light">Recent Activity</h3>
                      {orders.length === 0 ? (
                        <p className="text-[#1a1a1a]/50 text-sm">No recent activity.</p>
                      ) : (
                        <div className="divide-y divide-[#1a1a1a]/5">
                          {orders.slice(0, 5).map(order => (
                            <div key={order.id} className="py-4 flex justify-between items-center group">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#1a1a1a]/40">
                                  <ShoppingBag size={16} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
                                  <p className="text-xs text-[#1a1a1a]/50">Placed by {order.userId}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">${order.totalAmount?.toLocaleString()}</p>
                                <p className="text-xs text-[#1a1a1a]/50">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Orders Section */}
                {activeTab === 'orders' && (
                  <div className="space-y-8 bg-white border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                    <div className="flex justify-between items-center p-8 border-b border-[#1a1a1a]/5">
                      <div>
                        <h2 className="text-2xl font-serif font-light mb-1">Order Management</h2>
                        <p className="text-sm text-[#1a1a1a]/50">View and update customer orders.</p>
                      </div>
                    </div>
                    {orders.length === 0 ? (
                      <div className="p-16 text-center text-[#1a1a1a]/50">No orders found.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                          <thead className="bg-[#fcfbfc] text-[#1a1a1a]/50 text-[10px] uppercase tracking-[0.1em] border-y border-[#1a1a1a]/5">
                            <tr>
                              <th className="px-8 py-4 font-medium">Order ID</th>
                              <th className="px-8 py-4 font-medium">Date</th>
                              <th className="px-8 py-4 font-medium">Customer</th>
                              <th className="px-8 py-4 font-medium text-right">Amount</th>
                              <th className="px-8 py-4 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1a1a1a]/5 bg-white">
                            {orders.map((order) => (
                              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-4 font-medium text-[#1a1a1a]">#{order.id.slice(0, 8)}...</td>
                                <td className="px-8 py-4 text-[#1a1a1a]/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-8 py-4 text-[#1a1a1a]/60">{order.userId.slice(0, 15)}...</td>
                                <td className="px-8 py-4 text-right font-medium">${order.totalAmount?.toLocaleString()}</td>
                                <td className="px-8 py-4">
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                    className={`text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full font-medium border-0 cursor-pointer focus:ring-0 ${
                                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                      order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                      'bg-yellow-100 text-yellow-700'
                                    }`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Products Section */}
                {activeTab === 'products' && (
                  <div className="space-y-8 bg-white border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                    <div className="flex justify-between items-center p-8 border-b border-[#1a1a1a]/5">
                      <div>
                        <h2 className="text-2xl font-serif font-light mb-1">Product Inventory</h2>
                        <p className="text-sm text-[#1a1a1a]/50">Manage your catalog items.</p>
                      </div>
                      <button 
                        onClick={() => handleOpenProductModal()}
                        className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-5 py-2.5 text-xs font-medium hover:bg-[#1a1a1a]/80 transition-colors rounded-sm"
                      >
                        <Plus size={16} /> Add Product
                      </button>
                    </div>
                    {products.length === 0 ? (
                      <div className="p-16 text-center text-[#1a1a1a]/50">No products found.</div>
                    ) : (
                      <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                          <thead className="bg-[#fcfbfc] text-[#1a1a1a]/50 text-[10px] uppercase tracking-[0.1em] border-y border-[#1a1a1a]/5">
                            <tr>
                              <th className="px-8 py-4 font-medium w-16">Item</th>
                              <th className="px-4 py-4 font-medium">Details</th>
                              <th className="px-8 py-4 font-medium">Type</th>
                              <th className="px-8 py-4 font-medium text-right">Price</th>
                              <th className="px-8 py-4 font-medium text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#1a1a1a]/5 bg-white">
                            {products.map((product) => (
                              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-4">
                                  {product.image && (
                                    <div className="w-12 h-12 relative bg-[#f5f2ed] border border-[#1a1a1a]/5 rounded-sm overflow-hidden">
                                      {product.image.startsWith('data:video') ? (
                                        <video src={product.image} className="w-full h-full object-cover" />
                                      ) : (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="font-medium text-[#1a1a1a] mb-0.5 max-w-[200px] truncate">{product.name}</div>
                                  <div className="text-xs text-[#1a1a1a]/50 max-w-[200px] truncate">{product.origin}</div>
                                </td>
                                <td className="px-8 py-4">
                                  <span className="inline-flex py-1 px-2.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-700">
                                    {product.type}
                                  </span>
                                </td>
                                <td className="px-8 py-4 text-right font-medium">
                                  ${product.price.toLocaleString()}
                                </td>
                                <td className="px-8 py-4">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => handleOpenProductModal(product)}
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                      title="Edit"
                                    >
                                      <Edit2 size={16} />
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                      title="Delete"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Home Page Content Section */}
                {activeTab === 'homepage' && (
                  <div className="bg-white border border-[#1a1a1a]/5 shadow-sm rounded-sm">
                    <div className="flex justify-between items-center p-8 border-b border-[#1a1a1a]/5">
                      <div>
                        <h2 className="text-2xl font-serif font-light mb-1">Storefront Content</h2>
                        <p className="text-sm text-[#1a1a1a]/50">Customize the landing page messaging and imagery.</p>
                      </div>
                    </div>
                    <form onSubmit={handleSaveHomeContent} className="p-8 space-y-10">
                      
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
                        <div className="space-y-8">
                          <div className="space-y-6">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]/40 mb-4 pb-2 border-b border-[#1a1a1a]/5">Hero Banner</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Primary Title</label>
                                <textarea 
                                  rows={2}
                                  value={homeContent?.heroTitleLine1 || ''} 
                                  onChange={(e) => setHomeContent({...homeContent, heroTitleLine1: e.target.value})}
                                  className="w-full bg-[#fcfbfc] border border-[#1a1a1a]/10 p-3 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                                  placeholder="E.g. Australian&#10;"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Secondary Title (Italic)</label>
                                <input 
                                  type="text" 
                                  value={homeContent?.heroTitleLine2 || ''} 
                                  onChange={(e) => setHomeContent({...homeContent, heroTitleLine2: e.target.value})}
                                  className="w-full bg-[#fcfbfc] border border-[#1a1a1a]/10 p-3 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                                  placeholder="E.g. Opals"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Hero Description</label>
                              <textarea 
                                rows={3}
                                value={homeContent?.heroSubtitle || ''} 
                                onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
                                className="w-full bg-[#fcfbfc] border border-[#1a1a1a]/10 p-3 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                              ></textarea>
                            </div>
                          </div>

                          <div className="space-y-6 pt-6">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]/40 mb-4 pb-2 border-b border-[#1a1a1a]/5">About Section</h3>
                            <div>
                              <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Founder's Message</label>
                              <textarea 
                                rows={6}
                                value={homeContent?.founderMessage || ''} 
                                onChange={(e) => setHomeContent({...homeContent, founderMessage: e.target.value})}
                                className="w-full bg-[#fcfbfc] border border-[#1a1a1a]/10 p-3 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        {/* Side panel for images */}
                        <div className="space-y-6 bg-gray-50/50 p-6 rounded-sm border border-[#1a1a1a]/5 h-fit">
                          <h3 className="text-sm font-medium uppercase tracking-wider text-[#1a1a1a]/40 mb-4">Media Assets</h3>
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Hero Background</label>
                            
                            {homeContent?.heroBackgroundImage && (
                              <div className="mb-4 rounded-sm overflow-hidden border border-[#1a1a1a]/10 bg-[#1a1a1a] aspect-video relative group">
                                {homeContent.heroBackgroundImage.startsWith('data:video') ? (
                                  <video src={homeContent.heroBackgroundImage} className="w-full h-full object-cover" />
                                ) : (
                                  <img src={homeContent.heroBackgroundImage} alt="Preview" className="w-full h-full object-cover" />
                                )}
                              </div>
                            )}

                            <div className="relative">
                              <input 
                                type="file" 
                                id="hero-img-upload"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 1000000) {
                                      alert("File is too large! Please select a file under 1MB.");
                                      return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setHomeContent({...homeContent, heroBackgroundImage: reader.result as string});
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                              <label 
                                htmlFor="hero-img-upload" 
                                className="flex items-center justify-center w-full bg-white border border-[#1a1a1a]/20 px-4 py-2 cursor-pointer text-[11px] font-medium uppercase tracking-wider hover:bg-gray-50 transition-colors rounded-sm"
                              >
                                Replace Media
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-[#1a1a1a]/5 flex justify-end">
                        <button 
                          type="submit" 
                          disabled={savingHomeContent}
                          className="bg-[#1a1a1a] text-[#fcfbf9] px-8 py-3 text-xs font-medium uppercase tracking-wider hover:bg-[#1a1a1a]/90 transition-colors rounded-sm disabled:opacity-50"
                        >
                          {savingHomeContent ? 'Publishing...' : 'Publish Changes'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Modal overlay */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <form onSubmit={handleSaveProduct} className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl rounded-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-[#1a1a1a]/10 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-serif font-light">
                {editingProductId ? 'Edit Product Configuration' : 'New Product Listing'}
              </h2>
              <button 
                type="button" 
                onClick={() => setIsProductModalOpen(false)}
                className="text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Item Name</label>
                  <input 
                    required type="text" 
                    value={productForm.name} 
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-2.5 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                    placeholder="e.g. The Midnight Star"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Category</label>
                  <select 
                    value={productForm.type}
                    onChange={(e) => setProductForm({...productForm, type: e.target.value})}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-2.5 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                  >
                    <option value="Black Opal">Black Opal</option>
                    <option value="Boulder Opal">Boulder Opal</option>
                    <option value="Crystal Opal">Crystal Opal</option>
                    <option value="Rough Opal">Rough Opal</option>
                    <option value="Jewelry">Jewelry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Listing Price ($)</label>
                  <input 
                    required type="number" step="0.01" min="0"
                    value={productForm.price} 
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-2.5 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm font-medium"
                    placeholder="0.00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Detailed Description</label>
                  <textarea 
                    required rows={4}
                    value={productForm.description} 
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-3 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm resize-none"
                    placeholder="Describe the cut, clarity, and unique patterns..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Origin Details</label>
                  <input 
                    required type="text" 
                    value={productForm.origin} 
                    onChange={(e) => setProductForm({...productForm, origin: e.target.value})}
                    className="w-full bg-white border border-[#1a1a1a]/20 p-2.5 rounded-sm focus:outline-none focus:border-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] transition-all text-sm"
                    placeholder="e.g. Grawin Field, Lightning Ridge"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.1em] font-medium text-[#1a1a1a]/70 mb-2">Primary Asset (Image/Video)</label>
                  <div className="relative border-2 border-dashed border-[#1a1a1a]/20 rounded-sm p-4 text-center hover:bg-gray-50 transition-colors">
                    <input 
                      type="file" 
                      id="product-img-upload"
                      accept="image/*,video/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 1000000) {
                            alert("File is too large! Please select a file under 1MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProductForm({...productForm, image: reader.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="pointer-events-none">
                      <p className="text-xs text-[#1a1a1a]/60">Click or drag file to upload</p>
                      <p className="text-[9px] text-[#1a1a1a]/40 mt-1">PNG, JPG, MP4 under 1MB</p>
                    </div>
                  </div>
                </div>

                {productForm.image && (
                  <div className="md:col-span-2 p-4 bg-gray-50 flex items-center justify-center border border-[#1a1a1a]/10 rounded-sm mt-2">
                    <div className="max-w-[200px] rounded-sm overflow-hidden shadow-sm">
                      {productForm.image.startsWith('data:video') ? (
                        <video src={productForm.image} className="w-full h-auto" autoPlay loop muted />
                      ) : (
                        <img src={productForm.image} alt="Preview" className="w-full h-auto object-cover" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 py-5 border-t border-[#1a1a1a]/10 bg-gray-50/50 flex justify-end gap-3 rounded-b-md">
              <button 
                type="button" 
                onClick={() => setIsProductModalOpen(false)}
                className="px-6 py-2.5 text-xs font-medium text-[#1a1a1a]/70 hover:bg-white hover:text-[#1a1a1a] border border-transparent hover:border-[#1a1a1a]/20 rounded-sm transition-all"
              >
                Discard
              </button>
              <button 
                type="submit" 
                disabled={savingProduct}
                className="bg-[#1a1a1a] text-white px-8 py-2.5 text-xs font-medium hover:bg-[#1a1a1a]/90 rounded-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {savingProduct && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {savingProduct ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

