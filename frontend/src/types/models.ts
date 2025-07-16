export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  is_admin?: boolean;
}

export interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export interface Prompt {
  id: number;
  user_id: string;
  category_id: number;
  sub_category_id: number;
  prompt: string;
  response: string;
  created_at: string;
}
