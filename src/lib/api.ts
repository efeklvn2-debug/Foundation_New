import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface DonationData {
  amount: number;
  name: string;
  email: string;
  paymentMethod?: 'bank_transfer' | 'online';
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

class ApiClient {
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async submitDonation(data: DonationData): Promise<ApiResponse> {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sendContactForm(data: ContactFormData): Promise<ApiResponse> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPrograms(): Promise<ApiResponse> {
    return this.request('/programs');
  }

  async getNews(): Promise<ApiResponse> {
    return this.request('/news');
  }

  async getGallery(): Promise<ApiResponse> {
    return this.request('/gallery');
  }
}

export const apiClient = new ApiClient();

// React hook for API calls
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = async <T = any>(
    request: () => Promise<ApiResponse<T>>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await request();
      if (!response.success) {
        setError(response.error || 'Request failed');
        return null;
      }
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    executeRequest,
  };
}