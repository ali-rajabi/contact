import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onchange = (e) =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onchange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onchange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onchange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onchange}
        id="personal"
      />
      <label style={{ margin: "0 5px", cursor: "pointer" }} htmlFor="personal">
        Personal{" "}
      </label>
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onchange}
        id="professional"
      />
      <label
        style={{ marginLeft: "0 5px", cursor: "pointer" }}
        htmlFor="professional"
      >
        {" "}
        Professional{" "}
      </label>

      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button onClick={clearAll} className="btn btn-light btn-block">
            Clear
          </button>
        </div>
      )}
    </form>
  );
};
export default ContactForm;
