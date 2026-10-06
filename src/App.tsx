/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProductCategory, Product } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { SecurityKitBuilder } from './components/SecurityKitBuilder';
import { ShowroomLocationSection } from './components/ShowroomLocationSection';
import { TrustAndTestimonialsSection } from './components/TrustAndTestimonialsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { ProductModal } from './components/ProductModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { StickyCartBar } from './components/StickyCartBar';
import { Footer } from './components/Footer';
import { COMPANY_CONFIG } from './config/company';
import { useCart } from './hooks/useCart';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Dedicated, robust cart persistence layer
  const {
    items: quoteItems,
    totalCount: quoteCount,
    totalAmountMZN,
    getItemQuantity,
    addToCart: handleAddToQuote,
    addMultipleToCart: handleAddMultipleToQuote,
    updateQuantity: handleUpdateQuantity,
    removeFromCart: handleRemoveItem,
    clearCart: handleClearQuote,
  } = useCart();

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category as ProductCategory);
    const elem = document.getElementById('catalogo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToQuoteForm = () => {
    const elem = document.getElementById('orcamento');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCatalog = () => {
    const elem = document.getElementById('catalogo');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickWhatsAppCheckout = () => {
    if (quoteItems.length === 0) return;

    let text = `*PEDIDO DIRETO - TECHSOL SU LDA*\n`;
    text += `Olá TECHSOL! Gostaria de fazer o pedido dos seguintes equipamentos:\n\n`;

    quoteItems.forEach((item, index) => {
      const lineTotal = (item.product.priceMZN || 0) * item.quantity;
      text += `${index + 1}. *${item.product.name}* [${item.product.model}]\n`;
      text += `   • ${item.quantity} un. x ${item.product.priceMZN.toLocaleString('pt-MZ')} MT = *${lineTotal.toLocaleString('pt-MZ')} MT*\n`;
    });

    text += `\n💰 *Total: ${totalAmountMZN.toLocaleString('pt-MZ')} MT*\n\n`;
    text += `Por favor, confirmem para levantamento na Av. Josina Machel 923 ou entrega. Obrigado!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        quoteCount={quoteCount}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenQuoteForm={handleScrollToQuoteForm}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content */}
      <main className={`flex-1 ${quoteItems.length > 0 ? 'pb-24' : ''}`}>
        {/* Clean Hero Store Banner */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExploreCatalog={handleExploreCatalog}
          onOpenQuoteForm={handleScrollToQuoteForm}
          onSelectCategory={handleSelectCategory}
        />

        {/* Store Catalog with Steppers & Category Icons */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToQuote={handleAddToQuote}
          onUpdateQuantity={handleUpdateQuantity}
          getItemQuantity={getItemQuantity}
          onOpenProductModal={(product) => setActiveProductModal(product)}
          onOpenQuoteForm={handleScrollToQuoteForm}
        />

        {/* Quick Kits */}
        <SecurityKitBuilder
          onAddProductsToQuote={handleAddMultipleToQuote}
          onOpenQuoteForm={handleScrollToQuoteForm}
        />

        {/* Partners & Real Customer Testimonials */}
        <TrustAndTestimonialsSection
          onOpenQuoteForm={handleScrollToQuoteForm}
        />

        {/* Showroom & Provinces Shipping & Payment Methods */}
        <ShowroomLocationSection />

        {/* About TechSol Dahua */}
        <AboutSection />

        {/* Quick Formal Quote Form */}
        <QuoteFormSection
          selectedQuoteItems={quoteItems}
          onRemoveItem={handleRemoveItem}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToQuote={handleAddToQuote}
        isInQuote={activeProductModal ? getItemQuantity(activeProductModal.id) > 0 : false}
      />

      {/* Store Cart Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
        onGoToQuoteForm={handleScrollToQuoteForm}
      />

      {/* Sticky Bottom Cart Bar (Appears when items are in cart) */}
      <StickyCartBar
        items={quoteItems}
        onOpenDrawer={() => setIsQuoteDrawerOpen(true)}
        onQuickWhatsApp={handleQuickWhatsAppCheckout}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />
    </div>
  );
}
