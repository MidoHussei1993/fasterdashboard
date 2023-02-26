export class WorkTimeReport{
    providerActivityTimeReportPaginated: ProviderActivityTimeReportPaginated;
    finalTotalMinutes: number;
}

export interface ProviderActivityTimeReportPaginated {
    pageNumber: number;
    data: string;
    pageSize: number;
    totalItemCount: number;
    totalPagesCount: number;
}

