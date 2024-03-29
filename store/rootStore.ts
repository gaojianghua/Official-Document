import userStore, { IUserStore } from "./userStore";
import publicStore, { IPublicStore } from "./publicStore";
import linkStore, { ILinkStore } from "./linkStore";
import markStore, { IMarkStore } from './markStore';
import modelStore, { IModelStore } from './modelStore';
import classStore, { IClassStore } from './classStore';
import commonStore, { ICommonStore } from './commonStore';


export interface IStore {
    user: IUserStore,
    public: IPublicStore,
    link: ILinkStore,
    mark: IMarkStore,
    model: IModelStore,
    class: IClassStore,
    common: ICommonStore,
}

export default function createStore(initialValue: any): () => IStore {
    return () => {
        return {
            user: { ...userStore(), ...initialValue?.user },
            public: { ...publicStore(), ...initialValue?.public },
            link: { ...linkStore(), ...initialValue?.link },
            mark: { ...markStore(), ...initialValue?.mark },
            model: { ...modelStore(), ...initialValue?.model },
            class: { ...classStore(), ...initialValue?.class },
            common: { ...commonStore(), ...initialValue?.common },
        }
    }
}
