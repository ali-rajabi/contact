import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  let showContacts = contacts;
  if (filtered !== null) {
    showContacts = filtered;
  }
  return (
    // <Fragment>
    //   {filtered !== null
    //     ? filtered.map((contact) => (
    //         <ContactItem key={contact.id} contact={contact} />
    //       ))
    //     : contacts.map((contact) => (
    //         <ContactItem key={contact.id} contact={contact} />
    //       ))}
    // </Fragment>
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {showContacts.map((contact) => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default Contacts;
