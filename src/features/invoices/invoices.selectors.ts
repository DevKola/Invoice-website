import type { RootState } from "../../app/store";

export const selectInvoicesState = (state: RootState) => state.invoices;
export const selectInvoices = (state: RootState) =>
  selectInvoicesState(state).items;
export const selectInvoicesFetchStatus = (state: RootState) =>
  selectInvoicesState(state).fetchStatus;
export const selectInvoicesMutationStatus = (state: RootState) =>
  selectInvoicesState(state).mutationStatus;
export const selectSelectedInvoice = (state: RootState) =>
  selectInvoicesState(state).selectedInvoice;
export const selectSelectedInvoiceStatus = (state: RootState) =>
  selectInvoicesState(state).selectedInvoiceStatus;
export const selectInvoicesError = (state: RootState) =>
  selectInvoicesState(state).error;
