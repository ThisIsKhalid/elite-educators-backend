

export type IUserProfile = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'super_admin';
  
  profileImgUrl?: string;
  phonenumber: string;
};
