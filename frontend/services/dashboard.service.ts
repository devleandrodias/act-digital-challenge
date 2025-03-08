import { DashboardOutput } from "@/lib/types";

import { brainAgApi } from "@/shared/api/brainAgApi";

export function getDashboardData() {
  return brainAgApi.get<DashboardOutput>("/dashboard");
}
