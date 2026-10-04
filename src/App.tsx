/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProductCategory, Product, QuoteItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { SecurityKitBuilder } from './components/SecurityKitBuilder';
import { ShowroomLocationSection } from './components/ShowroomLocationSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { ProductModal } from './components/ProductModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Set of product IDs currently in quote
  const quoteItemIds = new Set(quoteItems.map((i) => i.product.id));

  const handleAddToQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleAddMultipleToQuote = (products: Product[]) => {
    setQuoteItems((prev) => {
      let current = [...prev];
      products.forEach((prod) => {
        const idx = current.findIndex((item) => item.product.id === prod.id);
        if (idx >= 0) {
          current[idx] = { ...current[idx], quantity: current[idx].quantity + 1 };
        } else {
          current.push({ product: prod, quantity: 1 });
        }
      });
      return current;
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* 3-Zone Top Navigation */}
      <Navbar
        quoteCount={quoteItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenQuoteForm={handleScrollToQuoteForm}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Banner with Search and Credentials */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExploreCatalog={handleExploreCatalog}
          onOpenQuoteForm={handleScrollToQuoteForm}
          onSelectCategory={handleSelectCategory}
        />

        {/* Structured Product Catalog with Category Benefits */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToQuote={handleAddToQuote}
          quoteItemIds={quoteItemIds}
          onOpenProductModal={(product) => setActiveProductModal(product)}
          onOpenQuoteForm={handleScrollToQuoteForm}
        />

        {/* Dedicated "Sobre Nós" and "Por que escolher Dahua" Section */}
        <AboutSection />

        {/* Interactive Security Kit Builder */}
        <SecurityKitBuilder
          onAddProductsToQuote={handleAddMultipleToQuote}
          onOpenQuoteForm={handleScrollToQuoteForm}
        />

        {/* Showroom & Provinces Shipping & Payment Methods */}
        <ShowroomLocationSection />

        {/* Comprehensive Quick Quote Form with WhatsApp & Email Submission */}
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
        isInQuote={activeProductModal ? quoteItemIds.has(activeProductModal.id) : false}
      />

      {/* Quote Drawer Slide-out */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
        onGoToQuoteForm={handleScrollToQuoteForm}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Complete Footer */}
      <Footer onSelectCategory={handleSelectCategory} />
    </div>
  );
}
