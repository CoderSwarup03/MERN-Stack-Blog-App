import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import React from "react";


const Home = () => {

  const [posts, setPosts] = useState([]);
  // this is for edit post when i was clicked then true--->
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // function call(fun name: getPosts)
  useEffect(() => {
    getPosts();
  }, [posts])


  // create one function
  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blog");
    const data = await response.json();
    // console.log(data.blogs);
    setPosts(data.blogs);
  }

  // delete blog data
  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.error("Something went wrong");
    } else {
      toast.success("Blog deleted successfully");
    }
  };

  // for editPost
  const updatePost = async (id) => {
    console.log(title, description, id);
    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (response.status === 200) {
      toast.success("Blog updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <div className="mt-10 mx-3">
        {/* want to data modification according to me*/}

        {
          posts.map((post) => {
            return (
              <div className="md:w-[35vw] lg:w-[40vw] mx-auto px-3 py-2 rounded-md shadow-md" key={post._id}>
                <div className="flex justify-end items-center text-2xl gap-4 my-3 text-gray-500">
                  <AiFillDelete className="hover:text-red-500 cursor-pointer hover:scale-110 transition-all" onClick={() => deletePost(post._id)} />
                  <MdEdit className={`${selectedPost === post._id && editPost ? "text-red-600 scale-110" : "text-gray-500"} text-gray-400 hover:text-red-500`}
                    onClick={() => {
                      setEditPost(!editPost);
                      setSelectedPost(post._id);
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold my-3 outline-none"
                  contentEditable={editPost}
                  onInput={(e) => setTitle(e.target.innerText)}
                >
                  {post.title}
                </h2>
                <h3 className="text-gray-600 font-semibold selection:bg-green-600 outline-none"
                  contentEditable={editPost}
                  onInput={(e) => setDescription(e.target.innerText)}
                >
                  {post.description}
                </h3>
                <button
                  className={`${selectedPost === post._id && editPost ? "block" : "hidden"} bg-purple-400 hover:bg-white hover:text-black text-white font-semibold px-2 py-1 my-2 rounded-md`}
                  onClick={() => updatePost(post._id)}
                >
                  Save
                </button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Home


