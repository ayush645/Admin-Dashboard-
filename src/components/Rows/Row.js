import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaUndo } from "@react-icons/all-files/fa/FaUndo";
import { useState } from "react";

const Row = ({ e, saveEditedData, handleSelectToTable, DeleteTr }) => {
  const [editable, setEditable] = useState(false);

  const [editableValues, setEditableValues] = useState({
    id: e.id,
    name: e.name,
    role: e.role,
    email: e.email,
    isChecked: e.isChecked,
  });

  const handleEditing = (event) => {
    const value = { ...editableValues };
    const nValues = { ...value, [event.target.name]: event.target.value };
    setEditableValues(nValues);
  };

  const handleUserEdit = () => {
    setEditable((curr) => !curr);
  };

  const handleSelect = (e) => {
    const { name, checked } = e.target;
    handleSelectToTable(name, !checked);
  };

  const onConfirm = () => {
    const payLoad = {
      id: e.id,
      name: editableValues.name,
      role: editableValues.role,
      email: editableValues.email,
      isChecked: e.isChecked,
    };
    setEditableValues(payLoad);
    saveEditedData(payLoad);
    setEditable(false);
  };

  const Delete = () => {
    DeleteTr(e);
  };

  return (
    <>

      <td>
        <input
          type="checkbox"
          onChange={handleSelect}
          name={e.name}
          size={25}
          checked={e.isChecked ? true : false}
        />
      </td>
      <td>
        <>
          {!editable && <p>{editableValues.name}</p>}
          {editable && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={editableValues.name}
                name="name"
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                onChange={handleEditing}
              />
              <br />
            </>
          )}
        </>
      </td>
      <td>
        <>
          {!editable && <p>{editableValues.email}</p>}
          {editable && (
            <>
              <input
                type="text"
                placeholder="Email"
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                value={editableValues.email}
                name="email"
                onChange={handleEditing}
              />
              <br />
            </>
          )}
        </>
      </td>
      <td>
        <>
          {!editable && <p>{editableValues.role}</p>}
          {editable && (
            <>
              <input
                type="text"
                placeholder="Role"
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                value={editableValues.role}
                name="role"
                onChange={handleEditing}
              />
              <br />
            </>
          )}
        </>
      </td>
      <td>
        {!editable && (
          <FaEdit
            size={20}
            onClick={handleUserEdit}
            style={{ marginRight: "20px" }}
          />
        )}
        {editable && (
          <FaCheck
            color="green"
            onClick={onConfirm}
            style={{ marginRight: "20px" }}
          />
        )}
        {editable && (
          <FaUndo
            color="grey"
            onClick={() => {
              setEditable(false);
              setEditableValues(e);
            }}
            style={{ marginRight: "20px" }}
          />
        )}
        <MdDeleteOutline color="red" size={22} onClick={Delete} />
      </td>
    </>
  );
};

export default Row;
