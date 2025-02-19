// components/MemberCard.jsx
import React from 'react';

const MemberCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-200 p-9 rounded-lg hover:bg-indigo-200 shadow-md space-y-4">
      <h2 className="text-xl font-bold">{member.name}</h2>
      <p className="text-gray-600">{member.email}</p>
      <p className="text-gray-600">{member.role}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(member.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemberCard;