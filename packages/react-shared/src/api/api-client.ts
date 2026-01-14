/**
 * API Client with configurable base URL from environment variables
 * Uses VITE_API_BASE_URL from .env files
 */

export interface ApiClientConfig {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(config?: ApiClientConfig) {
    // Read from Vite env vars, fallback to config, then to default
    this.baseUrl =
      config?.baseUrl ??
      (typeof import.meta !== 'undefined' &&
        import.meta.env?.VITE_API_BASE_URL) ||
      'http://localhost:4201';

    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config?.defaultHeaders,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          data: null,
          error: errorText || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return { data: null, error: null, status: 204 };
      }

      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      return { data: null, error: message, status: 0 };
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /** Update the base URL at runtime */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /** Get current base URL */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Singleton instance for convenience
export const apiClient = new ApiClient();

// Export class for custom instances
export { ApiClient };
