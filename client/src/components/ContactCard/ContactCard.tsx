import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Contact } from '../../redux/api/contacts.api';

type Props = {
  contact: Contact
  editHandler: () => void;
  deleteHandler: (contact: Contact) => Promise<void>
}

export default function ContactCard(props: Props) {
  const { contact, editHandler, deleteHandler } = props;
  return (
    <Box sx={{ width: 300 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {contact.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {contact.phone}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {contact.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => editHandler()}>Редактировать</Button>
          <Button size="small" onClick={() => deleteHandler(contact)}>Удалить</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
