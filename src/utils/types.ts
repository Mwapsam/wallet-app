export interface User {
    id?: string;
    name?: string;
    email: string;
    phone?: string | null;
    password?: string;
    is_active?: boolean;
    is_staff?: boolean;
    user_permissions?: Permission[];
  }
  
  export interface Permission {
    name: string;
    description: string;
  }
  