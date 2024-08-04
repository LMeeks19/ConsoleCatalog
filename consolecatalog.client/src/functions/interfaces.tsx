export interface LoginDetails {
    username: string | null;
    password: string | null;
  }
  
  export interface RegisterDetails {
    username: string | null;
    playstationGamertag: string | null;
    xboxGamertag: string | null;
    password: string | null;
    confirm_password: string | null;
  }
  
  export interface User {
    id: string;
    username: string;
    playstationGamertag: string | null;
    xboxGamertag: string | null;
    password: string;
  }

  export interface FormError {
    field: string;
    message: string;
  }