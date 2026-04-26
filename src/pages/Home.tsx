import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/store.ts';
import CreateInvoiceForm from '../components/invoices/CreateInvoiceForm.tsx';
import InvoicesHeader from '../components/invoices/InvoicesHeader.tsx';
import InvoiceList from '../components/invoices/InvoiceList.tsx';
import {
  selectInvoices,
  selectInvoicesFetchStatus,
} from '../features/invoices/invoices.selectors.ts';
import { createInvoice, fetchInvoices } from '../features/invoices/invoices.thunks.ts';
import type { Invoice, InvoiceStatus } from '../types/types.ts';
import { InvoiceStatus as InvoiceStatusEnum } from '../types/types.ts';
import { mapFormValuesToPayload } from '../util/invoiceForm.utils.ts';

function Home() {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const invoicesStatus = useAppSelector(selectInvoicesFetchStatus);
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);
  const [createFormOpen, setCreateFormOpen] = useState(false);

  useEffect(() => {
    if (invoicesStatus === 'idle') {
      void dispatch(fetchInvoices());
    }
  }, [dispatch, invoicesStatus]);

  function handleInvoiceClick(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}`);
  }

  return (
    <>
      <InvoicesHeader
        invoiceCount={invoices.length}
        selectedStatuses={selectedStatuses}
        onStatusChange={setSelectedStatuses}
        onNewInvoice={() => setCreateFormOpen(true)}
      />

      <InvoiceList
        invoices={invoices}
        selectedStatuses={selectedStatuses}
        onInvoiceClick={handleInvoiceClick}
      />

      <CreateInvoiceForm
        opened={createFormOpen}
        onClose={() => setCreateFormOpen(false)}
        onSaveDraft={async (values) => {
          await dispatch(createInvoice(mapFormValuesToPayload(values, InvoiceStatusEnum.Draft))).unwrap();
          setCreateFormOpen(false);
        }}
        onSubmit={async (values) => {
          await dispatch(createInvoice(mapFormValuesToPayload(values, InvoiceStatusEnum.Pending))).unwrap();
          setCreateFormOpen(false);
        }}
        title="New Invoice"
        initialValues={undefined}
        discardLabel="Discard"
        saveDraftLabel="Save as Draft"
        submitLabel="Save & Send"
        showSaveDraft={true}
      />
    </>
  );
}

export default Home;
