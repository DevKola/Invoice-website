import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/store.ts';
import InvoiceDetailView from '../components/invoices/InvoiceDetailView.tsx';
import EditInvoiceForm from '../components/invoices/EditInvoiceForm.tsx';
import { deleteInvoice, updateInvoice, updateInvoiceStatus } from '../features/invoices/invoices.thunks.ts';
import { selectSelectedInvoice } from '../features/invoices/invoices.selectors.ts';
import type { CreateInvoiceFormValues } from '../types/types.ts';
import { mapFormValuesToPayload } from '../util/invoiceForm.utils.ts';

function InvoiceByIdPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [editFormOpen, setEditFormOpen] = useState(false);
  const selectedInvoice = useAppSelector(selectSelectedInvoice);

  async function handleDeleteInvoice() {
    if (!selectedInvoice) {
      return;
    }

    await dispatch(deleteInvoice(selectedInvoice.id)).unwrap();
    navigate('/');
  }

  async function handleMarkAsPaid() {
    if (!selectedInvoice) {
      return;
    }

    await dispatch(updateInvoiceStatus(selectedInvoice.id)).unwrap();
  }

  async function handleSaveChanges(values: CreateInvoiceFormValues) {
    if (!selectedInvoice) {
      return;
    }

    const payload = mapFormValuesToPayload(values, selectedInvoice.status);
    await dispatch(updateInvoice({ id: selectedInvoice.id, payload })).unwrap();
    setEditFormOpen(false);
  }

  return (
    <>
      <InvoiceDetailView
        onEdit={() => setEditFormOpen(true)}
        onDelete={handleDeleteInvoice}
        onMarkAsPaid={handleMarkAsPaid}
      />

      <EditInvoiceForm
        opened={editFormOpen}
        invoice={selectedInvoice}
        onClose={() => setEditFormOpen(false)}
        onSubmit={handleSaveChanges}
      />
    </>
  );
}

export default InvoiceByIdPage;
