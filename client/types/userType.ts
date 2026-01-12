export type UserType = {
  id: string;
  firstName: string;
  secondName: string;
  email: string;
  phone: string | null;
  role: "user" | "admin";
  organizationName: string;
  createdAt: string;
  updatedAt: string | null;
}