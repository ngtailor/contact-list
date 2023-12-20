import { setUser, setContacts, addContact, editContact } from './actions';


export const login = (user) => (dispatch) => {
    // Simulate asynchronous login process
    setTimeout(() => {
      dispatch(setUser(user));
    }, 500);
  };

  export const logout = () => (dispatch) => {
    // Simulate asynchronous logout process
    setTimeout(() => {
      dispatch(setUser(null));
      dispatch(setContacts([]));
    }, 500);
  };

  export const loadContacts = () => (dispatch) => {
    // Simulate fetching user-specific contacts from a server
    const storedContacts = JSON.parse(localStorage.getItem('userContacts'));
    dispatch(setContacts(storedContacts || []));
  };

  export const saveContact = (contact) => (dispatch, getState) => {
    const { contacts } = getState();
    const existingContact = contacts.find((c) => c.id === contact.id);
  
    if (existingContact) {
      dispatch(editContact(contact));
    } else {
      dispatch(addContact(contact));
    }
  
    // Save contacts to local storage
    localStorage.setItem('userContacts', JSON.stringify(getState().contacts));
  };
  