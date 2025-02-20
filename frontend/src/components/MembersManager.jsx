import React, { useState, useEffect } from "react";
import MembersList from "./MembersList";
import MemberForm from "./MemberForm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const MembersManager = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:4000/getData");
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAddPost = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/addData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add post");

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost.newPost]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleEditPost = async (formData) => {
    if (!editingPost) return;

    try {
      const response = await fetch(
        `http://localhost:4000/updateSpecificData/${editingPost.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update post");

      const updatedData = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? updatedData.updatedPost : post
        )
      );
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const confirmDeletePost = async () => {
    if (!deletePostId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/deleteData/${deletePostId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete post");

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== deletePostId)
      );
      setDeletePostId(null); // Reset delete ID after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setEditingPost(postToEdit);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        {showForm ? (
          <MemberForm
            post={editingPost}
            onSubmit={editingPost ? handleEditPost : handleAddPost}
            onCancel={() => setShowForm(false)} // Fix cancel button
          />
        ) : (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-md mb-6"
            >
              Add Post
            </button>
            <MembersList
              posts={posts}
              onEdit={handleEdit}
              onDelete={(id) => setDeletePostId(id)} // Set delete ID only
            />
          </>
        )}

        {/* Alert Dialog for Delete Confirmation */}
        {deletePostId && (
          <AlertDialog open={true} onOpenChange={() => setDeletePostId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The post will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeletePostId(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeletePost} className="bg-red-500 hover:bg-red-900">
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default MembersManager;
