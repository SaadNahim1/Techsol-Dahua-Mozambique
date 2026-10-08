import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES_META, getProductReferenceImage } from '../data/products';
import {
  verifyAdminPin,
  setAdminPin,
  getActiveCatalogProducts,
  updateCatalogProduct,
  addCatalogProduct,
  deleteCatalogProduct,
  parseTechsolCSV,
  mergeOrReplaceCatalogFromCSV,
  exportCatalogToCSV,
  clearCustomCatalogProducts,
} from '../utils/catalogSync';
import {
  saveCustomProductImage,
  getCustomProductImages,
} from '../utils/customImages';
import { getPriceAlerts, PriceAlertSubscription } from '../utils/priceAlerts';
import {
  X,
  Lock,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Upload,
  Download,
  Tag,
  Percent,
  Check,
  RotateCcw,
  Camera,
  Bell,
  KeyRound,
  Package,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'catalog' | 'add' | 'import' | 'security';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('catalog');

  // Catalog state
  const [products, setProducts] = useState<Product[]>([]);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  const [filterPromoOnly, setFilterPromoOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editing product state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editModel, setEditModel] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editCategory, setEditCategory] = useState<ProductCategory>('cctv');
  const [editPrice, setEditPrice] = useState('');
  const [editOriginalPrice, setEditOriginalPrice] = useState('');
  const [editIsPromo, setEditIsPromo] = useState(false);
  const [editPromoLabel, setEditPromoLabel] = useState('');
  const [editInStock, setEditInStock] = useState(true);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newBrand, setNewBrand] = useState('Dahua');
  const [newCategory, setNewCategory] = useState<ProductCategory>('cctv');
  const [newSubcategory, setNewSubcategory] = useState('Câmeras & Gravadores');
  const [newPrice, setNewPrice] = useState('');
  const [newOriginalPrice, setNewOriginalPrice] = useState('');
  const [newIsPromo, setNewIsPromo] = useState(false);
  const [newPromoLabel, setNewPromoLabel] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // CSV Import State
  const [csvImportMode, setCsvImportMode] = useState<'merge' | 'replace'>('replace');
  const [confirmFactoryReset, setConfirmFactoryReset] = useState(false);
  const csvFileInputRef = useRef<HTMLInputElement | null>(null);

  // Security & Price Alerts State
  const [priceAlerts, setPriceAlerts] = useState<PriceAlertSubscription[]>([]);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinUpdateMsg, setPinUpdateMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    if (isOpen) {
      setProducts(getActiveCatalogProducts());
      setCustomImages(getCustomProductImages());
      setPriceAlerts(getPriceAlerts());
      setPinError('');
    } else {
      setPinInput('');
      setEditingId(null);
      setConfirmDeleteId(null);
    }
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      if (filterCategory !== 'todos' && p.category !== filterCategory) return false;
      if (filterPromoOnly && !p.isPromo) return false;
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q) ||
          (p.subcategory || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, searchQuery, filterCategory, filterPromoOnly]);

  const promoCount = useMemo(() => products.filter((p) => p.isPromo).length, [products]);

  if (!isOpen) return null;

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('PIN incorreto. Tente novamente.');
    }
  };

  const handleLockAndClose = () => {
    setIsUnlocked(false);
    setPinInput('');
    onClose();
  };

  const startEditingProduct = (p: Product) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditModel(p.model);
    setEditBrand(p.brand);
    setEditCategory(p.category);
    setEditPrice(String(p.priceMZN));
    setEditOriginalPrice(p.originalPriceMZN ? String(p.originalPriceMZN) : '');
    setEditIsPromo(Boolean(p.isPromo));
    setEditPromoLabel(p.promoLabel || '');
    setEditInStock(p.inStock);
    setEditImageUrl(customImages[p.id] || p.image || '');
  };

  const applyQuickDiscount = (percent: number) => {
    const currentPrice = parseFloat(editPrice) || 0;
    const baseOriginal =
      parseFloat(editOriginalPrice) > currentPrice
        ? parseFloat(editOriginalPrice)
        : currentPrice;
    if (baseOriginal <= 0) return;

    const discounted = Math.round(baseOriginal * (1 - percent / 100));
    setEditOriginalPrice(String(baseOriginal));
    setEditPrice(String(discounted));
    setEditIsPromo(true);
    setEditPromoLabel(`PROMO -${percent}%`);
  };

  const handleSaveEditedProduct = (product: Product) => {
    const parsedPrice = parseFloat(editPrice) || 0;
    const parsedOrig = parseFloat(editOriginalPrice) || undefined;

    if (editImageUrl && editImageUrl !== product.image) {
      saveCustomProductImage(product.id, editImageUrl);
      setCustomImages(getCustomProductImages());
    }

    const updated: Product = {
      ...product,
      name: editName.trim() || product.name,
      model: editModel.trim() || product.model,
      sku: editModel.trim() || product.sku,
      brand: editBrand.trim() || product.brand,
      category: editCategory,
      priceMZN: parsedPrice,
      isPromo: editIsPromo,
      originalPriceMZN: editIsPromo ? parsedOrig : undefined,
      promoLabel: editIsPromo ? editPromoLabel.trim() || 'PROMOÇÃO' : undefined,
      inStock: editInStock,
      stockStatus: editInStock ? 'Em Stock' : 'Sob Encomenda',
      image: editImageUrl || product.image,
    };

    const nextList = updateCatalogProduct(updated);
    setProducts(nextList);
    setEditingId(null);
    showToast(`Produto "${updated.model}" atualizado com sucesso!`);
  };

  const handleEditImageFileUpload = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditImageUrl(reader.result);
        saveCustomProductImage(productId, reader.result);
        setCustomImages(getCustomProductImages());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNewProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProduct = (id: string) => {
    const nextList = deleteCatalogProduct(id);
    setProducts(nextList);
    setConfirmDeleteId(null);
    showToast('Produto removido do catálogo.');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const sku = newModel.trim() || newName.trim().slice(0, 15).toUpperCase();
    const idSlug =
      sku
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') +
      '-' +
      Date.now().toString().slice(-4);

    const priceNum = parseFloat(newPrice) || 0;
    const origNum = parseFloat(newOriginalPrice) || undefined;

    const autoImg = getProductReferenceImage({
      id: idSlug,
      model: sku,
      name: newName,
      category: newCategory,
      subcategory: newSubcategory,
    });

    const finalImage = newImageUrl.trim() || autoImg;

    if (newImageUrl.trim()) {
      saveCustomProductImage(idSlug, newImageUrl.trim());
      setCustomImages(getCustomProductImages());
    }

    const created: Product = {
      id: idSlug,
      sku,
      model: sku,
      name: newName.trim(),
      category: newCategory,
      subcategory: newSubcategory.trim() || 'Equipamentos',
      brand: newBrand.trim() || 'Dahua',
      priceMZN: priceNum,
      originalPriceMZN: newIsPromo ? origNum : undefined,
      isPromo: newIsPromo,
      promoLabel: newIsPromo ? newPromoLabel.trim() || 'PROMOÇÃO' : undefined,
      stockQty: 10,
      inStock: true,
      stockStatus: 'Em Stock',
      description:
        newDescription.trim() ||
        `Equipamento profissional de alta performance ${newName.trim()}. Disponível na TECHSOL SU LDA com faturação fiscal e suporte de engenharia.`,
      highlights: [
        'Pronta Entrega em Maputo',
        '100% Original Homologado',
        'Faturação com NUIT',
      ],
      specs: {
        Marca: newBrand.trim() || 'Dahua',
        Modelo: sku,
        Categoria: newSubcategory.trim() || 'Equipamentos',
        Origem: 'Distribuição Oficial Moçambique',
      },
      popular: false,
      warranty: 'Garantia Oficial TECHSOL',
      datasheetAvailable: true,
      image: finalImage,
    };

    const nextList = addCatalogProduct(created);
    setProducts(nextList);

    // Reset form
    setNewName('');
    setNewModel('');
    setNewPrice('');
    setNewOriginalPrice('');
    setNewIsPromo(false);
    setNewPromoLabel('');
    setNewDescription('');
    setNewImageUrl('');
    setActiveTab('catalog');
    showToast(`Novo produto "${created.name}" adicionado ao catálogo!`);
  };

  const handleCSVFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const parsed = parseTechsolCSV(reader.result);
        if (parsed.length > 0) {
          const updated = mergeOrReplaceCatalogFromCSV(parsed, csvImportMode);
          setProducts(updated);
          showToast(
            `Stock importado com sucesso! Catálogo agora tem ${updated.length} produtos.`
          );
          setActiveTab('catalog');
        } else {
          showToast('Não foi possível ler produtos deste ficheiro CSV.');
        }
      }
    };
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setPinUpdateMsg('O novo PIN deve ter pelo menos 4 dígitos.');
      return;
    }
    if (newPin.trim() !== confirmPin.trim()) {
      setPinUpdateMsg('Os PINs introduzidos não coincidem.');
      return;
    }
    setAdminPin(newPin.trim());
    setNewPin('');
    setConfirmPin('');
    setPinUpdateMsg('PIN de administrador atualizado com sucesso!');
    setTimeout(() => setPinUpdateMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-red-600 flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-2">
                <span>TECHSOL SU LDA — Painel de Administração</span>
                {isUnlocked && (
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md">
                    Desbloqueado
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-slate-400">
                Gestão de Stock, Preços, Promoções e Importação de Catálogo CSV
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLockAndClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar Painel Admin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Locked: Show PIN Authentication Screen */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Acesso Restrito à Administração
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Introduza o código PIN de administrador para gerir produtos, alterar preços, criar promoções ou importar a planilha de stock.
            </p>

            <form onSubmit={handleUnlockSubmit} className="w-full mt-6 space-y-3">
              <input
                type="password"
                inputMode="numeric"
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError('');
                }}
                placeholder="Digite o PIN (ex: 2580)"
                className="w-full text-center tracking-[0.4em] font-mono text-lg font-bold py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
              />
              {pinError && (
                <p className="text-xs font-semibold text-red-600">{pinError}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                Desbloquear Painel Admin
              </button>
            </form>

            <p className="mt-4 text-[11px] text-slate-400 font-mono">
              PIN padrão inicial: <strong>2580</strong> (alterável na aba Segurança)
            </p>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'catalog'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Produtos & Preços ({products.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('add')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'add'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Lançar Produto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('import')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'import'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Importar / Exportar CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'security'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Alertas ({priceAlerts.length}) & PIN</span>
                </button>
              </div>

              {toastMessage && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>{toastMessage}</span>
                </div>
              )}
            </div>

            {/* Main Tab Content */}
            <div className="flex-1 overflow-y-auto p-5 bg-white">
              {/* TAB 1: MANAGE CATALOG, PRICES & PROMOTIONS */}
              {activeTab === 'catalog' && (
                <div className="space-y-4">
                  {/* Search & Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar produto por nome, código SKU, modelo ou marca..."
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-red-600"
                      >
                        {CATEGORIES_META.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => setFilterPromoOnly(!filterPromoOnly)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                          filterPromoOnly
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Tag className="w-3.5 h-3.5 text-red-600" />
                        <span>Em Promoção ({promoCount})</span>
                      </button>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="space-y-2.5">
                    {filteredProducts.slice(0, 120).map((product) => {
                      const isEditing = editingId === product.id;
                      const displayImg = customImages[product.id] || product.image;

                      return (
                        <div
                          key={product.id}
                          className={`rounded-xl border transition-all p-3 ${
                            isEditing
                              ? 'bg-red-50/30 border-red-300 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {!isEditing ? (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={displayImg}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                                  onError={(e) => {
                                    e.currentTarget.src = '/images/cam_hfw1439.jpg';
                                  }}
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-mono text-[10px] font-bold text-red-600 uppercase">
                                      {product.model}
                                    </span>
                                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                      {product.brand}
                                    </span>
                                    {product.isPromo && (
                                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-600 text-white">
                                        {product.promoLabel || 'PROMOÇÃO'}
                                      </span>
                                    )}
                                    <span
                                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                                        product.inStock
                                          ? 'bg-emerald-50 text-emerald-700'
                                          : 'bg-amber-50 text-amber-700'
                                      }`}
                                    >
                                      {product.inStock ? 'Em Stock' : 'Sob Encomenda'}
                                    </span>
                                  </div>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                                    {product.name}
                                  </h4>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                                <div className="text-right">
                                  {product.isPromo && product.originalPriceMZN && (
                                    <div className="text-[10px] text-slate-400 line-through font-mono">
                                      {new Intl.NumberFormat('pt-MZ').format(product.originalPriceMZN)} MT
                                    </div>
                                  )}
                                  <div className="text-sm font-extrabold font-mono text-slate-900">
                                    {new Intl.NumberFormat('pt-MZ').format(product.priceMZN)}{' '}
                                    <span className="text-xs text-red-600">MT</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => startEditingProduct(product)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
                                  >
                                    Editar / Promo
                                  </button>

                                  {confirmDeleteId === product.id ? (
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold cursor-pointer"
                                      >
                                        Confirmar
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-2 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-[11px] font-semibold cursor-pointer"
                                      >
                                        Não
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteId(product.id)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                      title="Remover produto"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Inline Edit Form */
                            <div className="space-y-3">
                              <div className="flex items-center justify-between border-b border-red-200 pb-2">
                                <span className="text-xs font-extrabold text-red-700 uppercase">
                                  Editando: {product.model}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setEditingId(null)}
                                  className="text-xs text-slate-500 hover:text-slate-800"
                                >
                                  Cancelar ✕
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                <div className="sm:col-span-5">
                                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                    Nome do Produto
                                  </label>
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-900"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                    Código SKU / Modelo
                                  </label>
                                  <input
                                    type="text"
                                    value={editModel}
                                    onChange={(e) => setEditModel(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                    Marca
                                  </label>
                                  <input
                                    type="text"
                                    value={editBrand}
                                    onChange={(e) => setEditBrand(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                    Categoria
                                  </label>
                                  <select
                                    value={editCategory}
                                    onChange={(e) =>
                                      setEditCategory(e.target.value as ProductCategory)
                                    }
                                    className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900"
                                  >
                                    {CATEGORIES_META.filter((c) => c.id !== 'todos').map((c) => (
                                      <option key={c.id} value={c.id}>
                                        {c.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              {/* Price & Promotion Controls */}
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-white border border-slate-200 items-end">
                                <div className="sm:col-span-3">
                                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                                    Preço de Venda Atual (MT)
                                  </label>
                                  <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-sm font-extrabold font-mono text-slate-900"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-red-600 mb-1 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={editIsPromo}
                                      onChange={(e) => setEditIsPromo(e.target.checked)}
                                      className="rounded text-red-600"
                                    />
                                    <span>Ativar Promoção</span>
                                  </label>
                                  <input
                                    type="number"
                                    disabled={!editIsPromo}
                                    placeholder="Preço Antigo (Riscado)"
                                    value={editOriginalPrice}
                                    onChange={(e) => setEditOriginalPrice(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono text-slate-700 disabled:opacity-50"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                                    Etiqueta da Promoção
                                  </label>
                                  <input
                                    type="text"
                                    disabled={!editIsPromo}
                                    placeholder="Ex: PROMO -15%"
                                    value={editPromoLabel}
                                    onChange={(e) => setEditPromoLabel(e.target.value)}
                                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800 disabled:opacity-50"
                                  />
                                </div>

                                <div className="sm:col-span-3 flex flex-col gap-1">
                                  <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                                    <Percent className="w-3 h-3 text-red-600" />
                                    Desconto Rápido:
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {[10, 15, 20, 25].map((pct) => (
                                      <button
                                        key={pct}
                                        type="button"
                                        onClick={() => applyQuickDiscount(pct)}
                                        className="flex-1 py-1 px-1.5 rounded bg-red-50 hover:bg-red-600 hover:text-white text-red-700 border border-red-200 text-[10px] font-bold transition-colors cursor-pointer"
                                      >
                                        -{pct}%
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Image & Stock Status Row */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                <div className="flex items-center gap-2 flex-1">
                                  <Camera className="w-4 h-4 text-slate-400 shrink-0" />
                                  <input
                                    type="text"
                                    value={editImageUrl}
                                    onChange={(e) => setEditImageUrl(e.target.value)}
                                    placeholder="URL da foto ou envie do computador..."
                                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs"
                                  />
                                  <label className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer flex items-center gap-1 shrink-0">
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>Foto</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleEditImageFileUpload(product.id, e)}
                                      className="hidden"
                                    />
                                  </label>

                                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 ml-2 cursor-pointer shrink-0">
                                    <input
                                      type="checkbox"
                                      checked={editInStock}
                                      onChange={(e) => setEditInStock(e.target.checked)}
                                    />
                                    <span>Em Stock</span>
                                  </label>
                                </div>

                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => setEditingId(null)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEditedProduct(product)}
                                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Guardar Alterações</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {filteredProducts.length > 120 && (
                      <p className="text-center text-xs text-slate-400 py-2">
                        Mostrando os primeiros 120 de {filteredProducts.length} produtos. Use a barra de pesquisa acima para filtrar qualquer modelo específico.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ADD NEW PRODUCT */}
              {activeTab === 'add' && (
                <form onSubmit={handleCreateProduct} className="max-w-2xl mx-auto space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-red-600" />
                      <span>Lançar Novo Produto no Catálogo</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      O produto ficará imediatamente disponível na loja com opção de pedido via WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nome Completo do Produto *
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Ex: Câmara IP Bullet 4MP WizSense Full-Color PoE"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Código SKU / Modelo *
                      </label>
                      <input
                        type="text"
                        required
                        value={newModel}
                        onChange={(e) => setNewModel(e.target.value)}
                        placeholder="Ex: IPC-HFW2449S-S-IL"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Marca
                      </label>
                      <input
                        type="text"
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        placeholder="Ex: Dahua, Nemtek, Centurion, Tenda..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Categoria Principal
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-red-600"
                      >
                        {CATEGORIES_META.filter((c) => c.id !== 'todos').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subcategoria
                      </label>
                      <input
                        type="text"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        placeholder="Ex: Câmeras IP, Gravadores NVR..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preço de Venda (MT) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        placeholder="Ex: 6500"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold text-red-600 mb-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newIsPromo}
                          onChange={(e) => setNewIsPromo(e.target.checked)}
                        />
                        <span>Lançar em Promoção (Preço Riscado)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          disabled={!newIsPromo}
                          value={newOriginalPrice}
                          onChange={(e) => setNewOriginalPrice(e.target.value)}
                          placeholder="Preço anterior MT"
                          className="w-1/2 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono disabled:opacity-50"
                        />
                        <input
                          type="text"
                          disabled={!newIsPromo}
                          value={newPromoLabel}
                          onChange={(e) => setNewPromoLabel(e.target.value)}
                          placeholder="Ex: PROMO -15%"
                          className="w-1/2 px-3 py-2 rounded-xl border border-slate-300 text-xs disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Fotografia do Produto (Opcional — se vazio usa imagem automática da categoria)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Cole o link da imagem ou carregue um ficheiro..."
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
                        />
                        <label className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-red-600" />
                          <span>Carregar Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNewProductImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Descrição Comercial / Técnica
                      </label>
                      <textarea
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Descrição do equipamento, especificações e garantias..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                  >
                    Publicar Produto no Catálogo
                  </button>
                </form>
              )}

              {/* TAB 3: IMPORT / EXPORT CSV */}
              {activeTab === 'import' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-red-100 text-red-600">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          Importar Ficheiro de Stock CSV
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          Carregue o seu ficheiro <strong>Products - TECHSOL SU LDA(2).csv</strong> (com todos os 512+ produtos) para atualizar automaticamente preços em Meticais, categorias, códigos SKU e disponibilidade.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <label
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          csvImportMode === 'replace'
                            ? 'bg-white border-red-600 ring-2 ring-red-600/10'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <input
                            type="radio"
                            name="csvMode"
                            checked={csvImportMode === 'replace'}
                            onChange={() => setCsvImportMode('replace')}
                          />
                          <span>Substituir pelo CSV Completo</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 pl-5">
                          Ideal para carregar a lista completa de 512+ produtos da TECHSOL.
                        </p>
                      </label>

                      <label
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          csvImportMode === 'merge'
                            ? 'bg-white border-red-600 ring-2 ring-red-600/10'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <input
                            type="radio"
                            name="csvMode"
                            checked={csvImportMode === 'merge'}
                            onChange={() => setCsvImportMode('merge')}
                          />
                          <span>Mesclar e Atualizar Preços</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 pl-5">
                          Mantém produtos atuais, atualiza preços pelos SKUs e adiciona novos.
                        </p>
                      </label>
                    </div>

                    <input
                      ref={csvFileInputRef}
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCSVFileSelect}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => csvFileInputRef.current?.click()}
                      className="w-full py-3.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Selecionar Ficheiro CSV do Computador / Telemóvel</span>
                    </button>
                  </div>

                  {/* Export & Reset Tools */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Exportar Backup ou Restaurar Padrão
                      </h4>
                      <p className="text-xs text-slate-500">
                        Atualmente o catálogo ativo contém <strong>{products.length} produtos</strong>.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => exportCatalogToCSV(products)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar CSV ({products.length})</span>
                      </button>

                      {confirmFactoryReset ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const def = clearCustomCatalogProducts();
                              setProducts(def);
                              setConfirmFactoryReset(false);
                              showToast('Catálogo padrão restaurado.');
                            }}
                            className="px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-bold cursor-pointer"
                          >
                            Confirmar Reset
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmFactoryReset(false)}
                            className="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmFactoryReset(true)}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restaurar Base</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PRICE ALERTS & PIN SECURITY */}
              {activeTab === 'security' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subscribed Price Alerts */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-600" />
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Clientes Inscritos em Alertas de Preço ({priceAlerts.length})
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Clientes que deixaram o seu e-mail no botão <em>"Avise-me se o preço mudar"</em>.
                    </p>

                    {priceAlerts.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                        Ainda não existem inscrições de alerta de preço.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {priceAlerts.map((sub, i) => (
                          <div
                            key={`${sub.productId}-${i}`}
                            className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 truncate">
                                {sub.email}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                [{sub.productModel}] {sub.productName} · Base:{' '}
                                {new Intl.NumberFormat('pt-MZ').format(sub.subscribedPriceMZN)} MT
                              </div>
                            </div>
                            <a
                              href={`mailto:${sub.email}?subject=${encodeURIComponent(
                                `Baixa de Preço TECHSOL: ${sub.productName}`
                              )}&body=${encodeURIComponent(
                                `Olá! O equipamento ${sub.productName} (${sub.productModel}) que acompanhou na TECHSOL SU LDA está agora com condições especiais.`
                              )}`}
                              className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold text-[11px] shrink-0 hover:bg-red-100"
                            >
                              Notificar
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Change Admin PIN */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-red-600" />
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Alterar PIN de Acesso ao Painel
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      O painel abre ao clicar <strong>3 vezes seguidas no logótipo da TECHSOL</strong> no topo do site.
                    </p>

                    <form onSubmit={handleChangePin} className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Novo PIN (mínimo 4 dígitos)
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          placeholder="Digite o novo PIN..."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirmar Novo PIN
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value)}
                          placeholder="Repita o novo PIN..."
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-mono"
                        />
                      </div>

                      {pinUpdateMsg && (
                        <p className="text-xs font-bold text-emerald-700">{pinUpdateMsg}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Atualizar PIN de Segurança
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
