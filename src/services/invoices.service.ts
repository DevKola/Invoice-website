import { get, post, put, remove } from "../lib/api";
import { InvoiceStatus } from "../types/types.ts";
import type {
  ApiResponse,
  Invoice,
  InvoiceStatus as InvoiceStatusType,
} from "../types/types.ts";

export interface InvoiceListParams {
  status?: InvoiceStatusType;
}

export interface CreateInvoiceItemPayload {
  name: string | null;
  quantity: string;
  price: string;
}

export interface CreateInvoicePayload {
  paymentDueDate: string;
  paymentTermsDays: number;
  status: InvoiceStatusType;
  description: string | null;
  senderAddress: {
    streetAddress: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
  };
  clientAddress: {
    name: string | null;
    email: string | null;
    streetAddress: string | null;
    city: string | null;
    postalCode: string | null;
    country: string | null;
  };
  invoiceItems: CreateInvoiceItemPayload[];
}
export type UpdateInvoicePayload = Partial<CreateInvoicePayload>;

const resource = "/api/invoices";
const draftResource = "/api/draft";

export const invoicesService = {
  list: (params?: InvoiceListParams) =>
    get<ApiResponse<Invoice[]>>(resource, { params }),

  getById: (id: string) => get<ApiResponse<Invoice>>(`${resource}/${id}`),

  create: (payload: CreateInvoicePayload) =>
    post<ApiResponse<Invoice>, CreateInvoicePayload>(
      payload.status === InvoiceStatus.Draft ? draftResource : resource,
      payload,
    ),

  update: (id: string, payload: UpdateInvoicePayload) =>
    put<ApiResponse<Invoice>, UpdateInvoicePayload>(
      `${resource}/${id}`,
      payload,
    ),

  updateStatus: (id: string) =>
    put<ApiResponse<Invoice>, undefined>(`${resource}/${id}/mark-paid`),

  remove: (id: string) => remove<ApiResponse<null>>(`${resource}/${id}`),
};
