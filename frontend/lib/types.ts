export type DashboardOutput = {
  totalFarms: number;
  totalArea: number;
  totalCrops: number;
  agriculturalArea: number;
  vegetationArea: number;
  unidentifiedArea: number;
  farmsByState: Array<{
    name: string;
    value: number;
  }>;
  cropsByType: Array<{
    name: string;
    value: number;
  }>;
};

export type PaginationResult<T> = {
  data: T[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    sortBy: Array<string[]>;
  };
  links: {
    current: string;
  };
};
