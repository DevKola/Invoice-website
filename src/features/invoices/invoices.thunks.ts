import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeApiError, type ApiError } from "../../lib/api";
import {
  invoicesService,
  type CreateInvoicePayload,
  type InvoiceListParams,
  type UpdateInvoicePayload,
} from "../../services/invoices.service";
import type { ApiResponse, Invoice } from "../../types/types.ts";

const toApiError = (error: unknown) => normalizeApiError(error);

export const fetchInvoices = createAsyncThunk<
  ApiResponse<Invoice[]>,
  InvoiceListParams | undefined,
  { rejectValue: ApiError }
>("invoices/fetchInvoices", async (params, { rejectWithValue }) => {
  try {
    return await invoicesService.list(params);
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});

export const fetchInvoiceById = createAsyncThunk<
  ApiResponse<Invoice>,
  string,
  { rejectValue: ApiError }
>("invoices/fetchInvoiceById", async (id, { rejectWithValue }) => {
  try {
    return await invoicesService.getById(id);
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});

export const createInvoice = createAsyncThunk<
  ApiResponse<Invoice>,
  CreateInvoicePayload,
  { rejectValue: ApiError }
>("invoices/createInvoice", async (payload, { rejectWithValue }) => {
  try {
    return await invoicesService.create(payload);
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});

export const updateInvoice = createAsyncThunk<
  ApiResponse<Invoice>,
  { id: string; payload: UpdateInvoicePayload },
  { rejectValue: ApiError }
>("invoices/updateInvoice", async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await invoicesService.update(id, payload);
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});

export const updateInvoiceStatus = createAsyncThunk<
  ApiResponse<Invoice>,
  string,
  { rejectValue: ApiError }
>("invoices/updateInvoiceStatus", async (id, { rejectWithValue }) => {
  try {
    return await invoicesService.updateStatus(id);
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});

export const deleteInvoice = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>("invoices/deleteInvoice", async (id, { rejectWithValue }) => {
  try {
    await invoicesService.remove(id);
    return id;
  } catch (error) {
    return rejectWithValue(toApiError(error));
  }
});
