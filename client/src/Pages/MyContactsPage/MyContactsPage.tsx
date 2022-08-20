import { Button, Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import ContactCard from '../../components/ContactCard/ContactCard';
import EditModal from '../../components/EditModal/EditModal';
import {
  Contact,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
  useGetAllContactsQuery,
} from '../../redux/api/contacts.api';
import { showError } from '../../redux/slices/errorSlice';

export type ModalState = {
  open: boolean
  mode: 'edit' | 'add' | ''
}

const contactInitState = {
  id: 0, name: '', email: '', phone: '',
};

function MyContactsPage() {
  const { data, refetch } = useGetAllContactsQuery();
  const [editContact] = useEditContactMutation();
  const [addContact] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [modal, setModal] = useState<ModalState>({ open: false, mode: '' });
  const [contactToEdit, setContactToEdit] = useState<Contact>(contactInitState);

  useEffect(() => {
    refetch();
  }, []);

  const editHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setContactToEdit((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteHandler = async (contact: Contact) => {
    try {
      await deleteContact(contact).unwrap();
    } catch (e) {
      if (e instanceof Error) {
        showError(e.message);
        return;
      }
      showError('Произошла ошибка');
    }
  };

  const submitEditHandler = async () => {
    try {
      await editContact(contactToEdit).unwrap();
      setModal(() => ({ open: false, mode: '' }));
      setContactToEdit(contactInitState);
    } catch (e) {
      if (e instanceof Error) {
        showError(e.message);
        return;
      }
      showError('Произошла ошибка');
    }
  };

  const submitAddHandler = async () => {
    try {
      await addContact(contactToEdit);
      setModal(() => ({ open: false, mode: '' }));
      setContactToEdit(contactInitState);
    } catch (e) {
      if (e instanceof Error) {
        showError(e.message);
        return;
      }
      showError('Произошла ошибка');
    }
  };

  return (
    <>
      <Box sx={{ padding: '1rem' }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Button
            variant="contained"
            onClick={() => setModal(() => ({ open: true, mode: 'add' }))}
          >
            Добавить контакт

          </Button>
        </Box>
        <Box sx={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center',
        }}
        >
          {data
            ? data.length > 0 && data
              .map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  editHandler={() => {
                    setModal(() => ({ open: true, mode: 'edit' }));
                    setContactToEdit(contact);
                  }}
                  deleteHandler={deleteHandler}
                />
              ))
            : null}
        </Box>
      </Box>
      <EditModal
        modal={modal}
        closeHandler={() => {
          setContactToEdit(contactInitState);
          setModal(() => ({ open: false, mode: '' }));
        }}
        contactToEdit={contactToEdit}
        editHandler={editHandler}
        submitEditHandler={submitEditHandler}
        submitAddHandler={submitAddHandler}
      />
    </>
  );
}

export default MyContactsPage;
