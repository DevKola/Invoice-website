import { createSlice } from "@reduxjs/toolkit";
import type { ApiError } from "../../lib/api";
import { InvoiceStatus, type Invoice } from "../../types/types.ts";
import {
  createInvoice,
  deleteInvoice,
  fetchInvoiceById,
  fetchInvoices,
  updateInvoice,
  updateInvoiceStatus,
} from "./invoices.thunks.ts";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface InvoicesState {
  items: Invoice[];
  selectedInvoice: Invoice | null;
  fetchStatus: RequestStatus;
  selectedInvoiceStatus: RequestStatus;
  mutationStatus: RequestStatus;
  error: ApiError | null;
}

const initialState: InvoicesState = {
  items: [],
  selectedInvoice: null,
  fetchStatus: "idle",
  selectedInvoiceStatus: "idle",
  mutationStatus: "idle",
  error: null,
};

const upsertInvoice = (items: Invoice[], invoice: Invoice) => {
  const index = items.findIndex((item) => item.id === invoice.id);

  if (index === -1) {
    items.unshift(invoice);
    return;
  }

  items[index] = invoice;
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    clearInvoicesError: (state) => {
      state.error = null;
    },
    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
      state.selectedInvoiceStatus = "idle";
    },
    resetMutationStatus: (state) => {
      state.mutationStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload.data;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(fetchInvoiceById.pending, (state) => {
        state.selectedInvoiceStatus = "loading";
        state.error = null;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.selectedInvoiceStatus = "succeeded";
        state.selectedInvoice = action.payload.data;
        upsertInvoice(state.items, action.payload.data);
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.selectedInvoiceStatus = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(createInvoice.pending, (state) => {
        state.mutationStatus = "loading";
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        upsertInvoice(state.items, action.payload.data);
        state.selectedInvoice = action.payload.data;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.mutationStatus = "loading";
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        upsertInvoice(state.items, action.payload.data);
        state.selectedInvoice = action.payload.data;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.mutationStatus = "loading";
        state.error = null;
      })
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        const invoiceId = action.meta.arg;
        state.mutationStatus = "succeeded";
        if (action.payload?.data) {
          upsertInvoice(state.items, action.payload.data);
          state.selectedInvoice = action.payload.data;
        }
        const itemIndex = state.items.findIndex(
          (item) => item.id === invoiceId,
        );
        if (itemIndex !== -1) {
          state.items[itemIndex].status = InvoiceStatus.Paid;
        }

        if (state.selectedInvoice?.id === invoiceId) {
          state.selectedInvoice.status = InvoiceStatus.Paid;
        }
      })
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.error = action.payload ?? null;
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.mutationStatus = "loading";
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.mutationStatus = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);

        if (state.selectedInvoice?.id === action.payload) {
          state.selectedInvoice = null;
        }
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.mutationStatus = "failed";
        state.error = action.payload ?? null;
      });
  },
});

export const { clearInvoicesError, clearSelectedInvoice, resetMutationStatus } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;
