const initialState = {
  contacts: [],
  user: null,
};

 const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'EDIT_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };

      case 'SET_USER':
      return { ...state, user: action.payload };

      case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
      
    default:
      return state;
  }
};
export default  contactsReducer;