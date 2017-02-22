import { Injectable } from '@angular/core'

@Injectable()
export class ConfigurationService {
    load(): Promise<boolean> {
        return new Promise<boolean>((resolve) => resolve(true));
    }
}

export function configurationFactory(configurationService: ConfigurationService): () => Promise<boolean> {
    return () => configurationService.load();
}
