import userStore, { IUserStore } from "./userStore";
import publicStore, { IPublicStore } from "./publicStore";
import linkStore, { ILinkStore } from "./linkStore";
import markStore, { IMarkStore } from './markStore';
import modelStore, { IModelStore } from './modelStore';


export interface IStore {
    user: IUserStore,
    public: IPublicStore,
    link: ILinkStore,
    mark: IMarkStore,
    model: IModelStore,
}

export default function createStore(initialValue: any): () => IStore {
    return () => {
        return {
            user: { ...userStore(), ...initialValue?.user },
            public: { ...publicStore(), ...initialValue?.public },
            link: { ...linkStore(), ...initialValue?.link },
            mark: { ...markStore(), ...initialValue?.mark },
            model: { ...modelStore(), ...initialValue?.model },
        }
    }
}