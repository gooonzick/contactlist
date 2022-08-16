import {
  Box, Button, Modal, Stack, TextField, Typography,
} from '@mui/material';
import React, { ChangeEvent } from 'react';
import { ModalState } from '../../Pages/MyContactsPage/MyContactsPage';
import { Contact } from '../../redux/api/api';

type Props = {
    modal: ModalState
    contactToEdit: Contact | null
    closeHandler: () => void
    editHandler: (e: ChangeEvent<HTMLInputElement>) => void
    submitEditHandler: () => Promise<void>
    submitAddHandler: () => Promise<void>
}

const boxStyle = {
  width: '50%',
  height: 'max-content',
  margin: 'auto',
  marginTop: '20%',
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '1rem',
};

const headerStyle = {
  margin: 'auto', width: 'max-content', fontWeight: 'bold',
};

function EditModal(props: Props) {
  const {
    modal, contactToEdit, closeHandler, editHandler, submitEditHandler, submitAddHandler,
  } = props;
  return (
    <Modal
      open={modal.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={closeHandler}
    >
      <Box sx={boxStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={headerStyle}
        >
          Редактирование
        </Typography>

        <TextField
          sx={{ width: '100%' }}
          variant="outlined"
          label="Имя"
          margin="normal"
          type="text"
          name="name"
          value={contactToEdit?.name}
          onChange={editHandler}
        />
        <TextField
          sx={{ width: '100%' }}
          variant="outlined"
          label="Email"
          margin="normal"
          type="email"
          name="email"
          value={contactToEdit?.email}
          onChange={editHandler}
        />
        <TextField
          sx={{ width: '100%' }}
          variant="outlined"
          label="Телефон"
          margin="normal"
          type="text"
          name="phone"
          value={contactToEdit?.phone}
          onChange={editHandler}
        />

        <Stack direction="row-reverse" sx={{ mt: '0.7rem' }}>
          <Button variant="outlined" sx={{ width: 'max-content', ml: '0.3rem' }} onClick={closeHandler}>Закрыть</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (modal.mode === 'add') {
                return submitAddHandler();
              }
              return submitEditHandler();
            }}
          >
            Сохранить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default EditModal;
