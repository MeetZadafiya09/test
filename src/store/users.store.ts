import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    name: string;
    email: string;
    age: string;
    gender: string;
    city: string;
    hobbies: string[];
}

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    deleteUser: (id: string) => void;
    updateUser: (id: string, updatedUser: User) => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            users: [],

            addUser: (user) =>
                set((state) => ({
                    users: [...state.users, user],
                })),
            updateUser: (id, updatedUser) =>
                set((state) => ({
                    users: state.users.map((user) =>
                        user.id === id
                            ? { ...user, ...updatedUser }
                            : user
                    ),
                })),
            deleteUser: (id) =>
                set((state) => ({
                    users: state.users.filter(
                        (user) => user.id !== id
                    ),
                })),

        }),
        {
            name: "users-storage",
        }
    )
);

export default useUserStore;