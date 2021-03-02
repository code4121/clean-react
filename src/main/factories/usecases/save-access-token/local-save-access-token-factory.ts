import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { ISaveAccessToken } from "@/domain/usecases";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeLocalSaveAccessToken = (): ISaveAccessToken => {
    return new LocalSaveAccessToken(makeLocalStorageAdapter());
};
