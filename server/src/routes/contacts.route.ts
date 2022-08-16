import express, { Router } from 'express';
import {
  getAllContacts, editContact, addContact, deleteContact,
} from '../controllers/contacts.controller';
import isAuth from '../middlewares/isAuth';
import isOwner from '../middlewares/isOwner';

const router: Router = express.Router();

router.get('/', isAuth, getAllContacts);
router.post('/', isAuth, addContact);
router.patch('/:id', isOwner, editContact);
router.delete('/:id', isOwner, deleteContact);

export default router;
