import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const titleResolver = (key: string): ResolveFn<string> => {
    return () => inject(TranslateService).instant(key);
};
