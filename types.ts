
export interface Bug {
  id: number;
  x: number;
  y: number;
  type: string;
  isSquashed: boolean;
}

export interface QAReport {
  status: string;
  message: string;
  testCasesPassed: number;
  regressions: string;
  automationCoverage: string;
}
