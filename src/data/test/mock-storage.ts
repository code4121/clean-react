import { ISetStorage } from "@/data/protocols/cache/set-storage";

export class SetStorageSpy implements ISetStorage {
    key: string;
    value: any;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async set(key: string, value: any): Promise<void> {
        this.key = key;
        this.value = value;
    }
}
