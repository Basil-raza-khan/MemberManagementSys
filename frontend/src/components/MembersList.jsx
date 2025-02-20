// components/MembersList.jsx
import React from 'react';
import MemberCard from './MemberCard';

const MembersList = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <MemberCard
          key={post.id}
          member={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MembersList;