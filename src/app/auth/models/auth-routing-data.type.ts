import { Data } from '@angular/router';

import { AuthGuardAction } from './auth-guard-action.enum';

export type AuthRoutingData = Data & {
    guardAction?: AuthGuardAction;
    guardRoles?: {
        roles: string[];
        guardAction?: AuthGuardAction;
    };
};
