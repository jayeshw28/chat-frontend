import { AuthResponse } from "@/types/auth";

export class ApiService {
    private static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    private static getHeaders() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
    }
  
    static async login(identifier: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${this.baseUrl}/api/auth/local`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ identifier, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      return response.json();
    }
  
    static async register(username: string, email: string, password: string): Promise<AuthResponse> {
      const response = await fetch(`${this.baseUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      return response.json();
    }
  }
  