import userStore, { IUserStore } from "./userStore";
import publicStore, { IPublicStore } from "./publicStore";

export interface IStore {
    user: IUserStore,
    public: IPublicStore
}

export default function createStore(initialValue: any): () => IStore {
    return () => {
        return {
            user: { ...userStore(), ...initialValue?.user },
            public: { ...publicStore(), ...initialValue?.public }
        }
    }
}