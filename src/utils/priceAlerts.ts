export interface PriceAlertSubscription {
  productId: string;
  productModel: string;
  productName: string;
  email: string;
  subscribedPriceMZN: number;
  createdAt: string;
}

const STORAGE_KEY = 'techsol_price_alerts_v1';

export function getPriceAlerts(): PriceAlertSubscription[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PriceAlertSubscription[];
  } catch {
    return [];
  }
}

export function getProductPriceAlert(productId: string): PriceAlertSubscription | undefined {
  const alerts = getPriceAlerts();
  return alerts.find((a) => a.productId === productId);
}

export function subscribeToPriceAlert(subscription: Omit<PriceAlertSubscription, 'createdAt'>): PriceAlertSubscription {
  const alerts = getPriceAlerts().filter((a) => a.productId !== subscription.productId);
  const newEntry: PriceAlertSubscription = {
    ...subscription,
    createdAt: new Date().toISOString(),
  };
  alerts.push(newEntry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch (e) {
    console.error('Failed to save price alert subscription:', e);
  }
  return newEntry;
}

export function unsubscribeFromPriceAlert(productId: string): void {
  const alerts = getPriceAlerts().filter((a) => a.productId !== productId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch (e) {
    console.error('Failed to remove price alert subscription:', e);
  }
}
