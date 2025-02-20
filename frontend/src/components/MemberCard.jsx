import React from 'react';

const MemberCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-200 p-6 rounded-lg hover:bg-green-100  shadow-md space-y-4 flex flex-col h-96">
      <h2 className="text-xl font-bold">{member.title}</h2>

   
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        <p className="text-gray-600">{member.content}</p>
      </div>

      <p className="text-gray-600">Author: {member.author}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(member.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-900"
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
