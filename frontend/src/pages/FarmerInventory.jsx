import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import useAuthStore from '../store/authStore';
import useUIStore from '../store/uiStore';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import { FARMER_NAV } from '../constants/dashboardNav';
import { getImageSrc } from '../utils/imageUtils';

const emptyProductForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  unit: 'kg',
  image: '',
};

const FarmerInventory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const { data: productsData, isLoading } = useQuery({
    queryKey: ['farmerProducts'],
    queryFn: async () => {
      const response = await api.get('/farmer/products');
      return response.data;
    }
  });

  const products = productsData?.data || productsData || [];

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmerProducts'] });
    },
    onError: () => {
      useUIStore.getState().showNotification('Failed to delete product', 'error');
    }
  });

  const [formData, setFormData] = useState(emptyProductForm);

  const saveMutation = useMutation({
    mutationFn: ({ id, data }) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      return id ? api.put(`/products/${id}`, formData, config) : api.post('/products', formData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmerProducts'] });
      setShowModal(false);
      setEditingProduct(null);
      setFormData(emptyProductForm);
      setImageFile(null);
      setImagePreview('');
      useUIStore.getState().showNotification('Product saved successfully', 'success');
    },
    onError: (error) => {
      useUIStore.getState().showNotification(error.response?.data?.message || 'Failed to save product', 'error');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock, 10),
      unit: formData.unit,
    };
    if (!imageFile && formData.image) {
      payload.image = formData.image;
    }

    saveMutation.mutate({
      id: editingProduct?._id,
      data: payload,
    });
  };

  const handleDelete = (id) => {
    useUIStore.getState().showConfirm({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => deleteMutation.mutate(id),
    });
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setFormData(emptyProductForm);
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price ?? '',
      category: product.category || '',
      stock: product.stock ?? '',
      unit: product.unit || 'kg',
      image: product.image || '',
    });
    setImageFile(null);
    setImagePreview(product.image || '');
    setShowModal(true);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <DashboardSidebar
        title="Farmer Panel"
        subtitle={user?.name || 'Farmer'}
        navItems={FARMER_NAV}
        ctaLabel="Add Product"
        ctaIcon="add"
        onCtaClick={openAddProduct}
        iconNode={<span className="material-symbols-outlined text-primary">agriculture</span>}
      />
      <main className="ml-64 pt-20 pb-xl px-6">
        <div className="flex justify-between items-center mb-xl">
          <h1 className="font-h1 text-h1">My Inventory</h1>
          <button 
            onClick={openAddProduct}
            className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90"
          >
            + Add Product
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-primary animate-pulse">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant mb-4">No products yet.</p>
            <button 
              onClick={openAddProduct}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="glass-panel bg-surface-container/60 rounded-xl p-4">
                <img 
                  src={getImageSrc(product.image)} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-on-surface-variant text-sm mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">₹{product.price}/{product.unit}</span>
                  <span className="text-sm text-on-surface-variant">Stock: {product.stock}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => openEditProduct(product)}
                    className="flex-1 bg-surface-variant text-on-surface py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 bg-error/20 text-error py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface-container rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-h2 text-xl mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                  >
                    <option value="kg">kg</option>
                    <option value="piece">piece</option>
                    <option value="dozen">dozen</option>
                    <option value="liter">liter</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Spices">Spices</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-surface-variant text-on-surface rounded-lg p-3"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-on-surface-variant mb-1">Product Image</label>
                <div className="flex gap-3 items-start">
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-1">cloud_upload</span>
                    <span className="text-sm text-on-surface-variant">
                      {imageFile ? imageFile.name : 'Click to upload image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (imagePreview && imagePreview.startsWith('blob:')) {
                            URL.revokeObjectURL(imagePreview);
                          }
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                  {(imagePreview || formData.image) && (
                    <img
                      src={imagePreview || formData.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-outline-variant"
                    />
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">Or paste image URL:</p>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => { setFormData({ ...formData, image: e.target.value }); setImageFile(null); setImagePreview(e.target.value); }}
                  placeholder="https://..."
                  className="w-full bg-surface-variant text-on-surface rounded-lg p-3 mt-1 text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setShowModal(false); setEditingProduct(null); setFormData(emptyProductForm); setImageFile(null); setImagePreview(''); }}
                  className="flex-1 bg-surface-variant text-on-surface py-3 rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold"
                >
                  {saveMutation.isPending ? 'Saving...' : editingProduct ? 'Update' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FarmerInventory;
