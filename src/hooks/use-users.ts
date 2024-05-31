import users from "@/data/users.json"

export const useUsers = (): User[] => {
  return users;
};

export const useUser = (userId: string): User | null => {
  return users.find((user: User) => user._id === userId) || null;
};