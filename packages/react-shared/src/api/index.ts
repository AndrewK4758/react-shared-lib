import type { components } from './generated-types';

export {
  ApiClient,
  apiClient,
  type ApiClientConfig,
  type ApiResponse,
} from './api-client';

export type { components, paths } from './generated-types';

export type ApiPractice = components['schemas']['Practice'];
export type ApiPerson = components['schemas']['Person'];
export type ApiFamily = components['schemas']['Family'];
export type ApiPlace = components['schemas']['Place'];
export type ApiCar = components['schemas']['Car'];
