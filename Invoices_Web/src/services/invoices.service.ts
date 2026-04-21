import { get, post, put, remove } from '../lib/api';
import type { ApiResponse, Invoice, InvoiceStatus } from '../types/types.ts';

export interface InvoiceListParams {
  status?: InvoiceStatus;
}

export type CreateInvoicePayload = Omit<Invoice, 'id' | 'createdAt'>;
export type UpdateInvoicePayload = Partial<CreateInvoicePayload>;

const resource = '/api/invoices';

export const invoicesService = {
  list: (params?: InvoiceListParams) => get<ApiResponse<Invoice[]>>(resource, { params }),
  getById: (id: string) => get<ApiResponse<Invoice>>(`${resource}/${id}`),
  create: (payload: CreateInvoicePayload) => post<ApiResponse<Invoice>, CreateInvoicePayload>(resource, payload),
  update: (id: string, payload: UpdateInvoicePayload) => put<ApiResponse<Invoice>, UpdateInvoicePayload>(`${resource}/${id}`, payload),
  updateStatus: (id: string, status: InvoiceStatus) =>
    put<ApiResponse<Invoice>, Pick<Invoice, 'status'>>(`${resource}/${id}`, { status }),
  remove: (id: string) => remove<ApiResponse<null>>(`${resource}/${id}`),
};
