export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface Company {
  name: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface PostFormProps {
  postToEdit?: Post;
}

export interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
  