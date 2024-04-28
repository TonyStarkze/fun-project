import { SetOptions } from "redis";
export interface SharedText {
    code: string;
    text: string;
    expiry: number;
}
export interface ICache {
    set: (key: string, value: string, options?: SetOptions) => Promise<void>;
    get: (key: string) => Promise<string | null>;
}
export declare class Repository {
    private readonly cache;
    constructor(cache: ICache);
    insertText(text: string): Promise<string>;
    getText(code: string): Promise<any>;
}
//# sourceMappingURL=repository.d.ts.map