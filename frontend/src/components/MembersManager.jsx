import React, { useState, useEffect } from "react";
import MembersList from "./MembersList";
import MemberForm from "./MemberForm";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

const MembersManager = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/getData", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/addData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add post");
      }
      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost.newPost]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleEditPost = async (formData) => {
    try {
      const response = await fetch(`http://localhost:4000/updateData/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      const updatedPost = await response.json();
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === editingPost.id ? updatedPost.updatedPost : post)));
      setShowForm(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const confirmDeletePost = async () => {
    if (!deletePostId) return;
    try {
      const response = await fetch(`http://localhost:4000/deleteData/${deletePostId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletePostId));
      setDeletePostId(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingPost(postToEdit);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl">
        {showForm ? (
          <MemberForm post={editingPost} onSubmit={handleAddPost} onCancel={handleCancel} />
        ) : (
          <>
            <button onClick={() => setShowForm(true)} className="bg-green-500 text-white px-6 py-2 rounded-md mb-6 hover:bg-green-600 transition duration-300">
              Add Post
            </button>
            <MembersList posts={posts} onEdit={handleEdit} onDelete={(id) => setDeletePostId(id)} />
          </>
        )}
      </div>

      
      <AlertDialog open={!!deletePostId} onOpenChange={(open) => !open && setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete the post.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePost} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MembersManager;
