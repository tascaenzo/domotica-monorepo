export interface SessionInterface {
  id: string;
  refreshKey?: string;
  user: string;
  userAgent?: string;
  forceRefresh?: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  refreshedAt: Date | null;
}
