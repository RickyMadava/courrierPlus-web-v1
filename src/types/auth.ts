// Énumérations
export type UserRole = 'admin' | 'coursier' | 'client';

// Interface User étendue
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: {
    id: string;
    name: UserRole;
  };
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Requêtes d'authentification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  isActive: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}

// Réponses d'authentification
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CreateUserResponse {
  user: User;
  message: string;
  success: boolean;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

// Types de contexte d'authentification
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

// Types pour les formulaires
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  isActive: boolean;
}

// Types pour les erreurs d'authentification
export interface AuthError {
  message: string;
  statusCode: number;
  field?: string;
  details?: Record<string, string[]>;
}

// Types pour les permissions
export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
  description?: string;
}

// Types pour la session
export interface Session {
  user: User;
  expiresAt: string;
  isValid: boolean;
}

// Types utilitaires
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthConfig {
  apiUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  redirectAfterLogin: string;
  redirectAfterLogout: string;
}