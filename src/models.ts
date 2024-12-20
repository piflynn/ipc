export interface UserSession {
  type: string;
  id: string;
  href: string;
  name: string;
  role: string;
  scope: unknown;
  owner: unknown;
  expiresIn: number;
  userId: string;
}

export interface StreamsResponse {
  href: string;
  streams: Stream[];
}

export interface Stream {
  active: boolean;
  camera: unknown;
  configuration: unknown;
  dewarpConfiguration: unknown;
  href: string;
  id: number;
  name: string;
  recordWhenSecondary: boolean;
  recordingConfiguration: unknown;
}

export interface DisplayImage {
  id: number;
  name: string;
  url: string;
}

export interface StreamBlob {
  stream: Stream;
  blob: Blob;
}

export enum AppLinks {
  VIEWER = 'viewer',
  TAYLOR_SERIES = 'taylor-series',
}

export interface TaylorSeriesPiResult {
  i: number;
  pi: number;
  error: number;
  percentError: number;
}
