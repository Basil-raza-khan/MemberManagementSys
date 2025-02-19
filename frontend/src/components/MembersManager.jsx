// components/MembersManager.jsx
import React, { useState } from 'react';
import MembersList from './MembersList';
import MemberForm from './MemberForm';

const MembersManager = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Mahad', email: 'Mahad@example.com', role: 'Developer' },
    { id: 2, name: 'Umair', email: 'Umair@example.com', role: 'Designer' },
    { id: 3, name: 'Khalid', email: 'Khalid@example.com', role: 'Manager' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleAddMember = () => {
    setEditingMember(null); // Reset editing member
    setShowForm(true); // Show the form
  };

  const handleEdit = (id) => {
    const memberToEdit = members.find((member) => member.id === id);
    setEditingMember(memberToEdit); // Set the member to edit
    setShowForm(true); // Show the form
  };

  const handleDelete = (id) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
    alert('Member deleted!');
  };

  const handleFormSubmit = (formData) => {
    if (editingMember) {
      // Update existing member
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === editingMember.id ? { ...member, ...formData } : member
        )
      );
    } else {
      // Add new member
      const newMember = { id: Date.now(), ...formData };
      setMembers((prevMembers) => [...prevMembers, newMember]);
    }
    setShowForm(false); // Hide the form
  };

  const handleCancel = () => {
    setShowForm(false); // Hide the form
    setEditingMember(null); // Reset editing member
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl">
        {showForm ? (
          <MemberForm
            member={editingMember}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <button
              onClick={handleAddMember}
              className="bg-green-500 text-white px-6 py-2 rounded-md mb-6 hover:bg-green-600 transition duration-300"
            >
              Add Member
            </button>
            <MembersList
              members={members}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MembersManager;