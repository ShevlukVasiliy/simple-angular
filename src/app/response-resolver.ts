import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ResponseService } from './response-service';

export const responseResolver: ResolveFn<any> = () => {
  const responseService = inject(ResponseService);
  return responseService.getSeventhAction();
};
