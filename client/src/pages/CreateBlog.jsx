import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

const CreateBlog = () => {

  const navigate = useNavigate();

  // for submit used a function that is postData

  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    // console.log(title, description);


    // object inside data store
    const blog = {
      title,
      description
    };

    // below code is the sent data from backend server!!
    const response = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog),
    });

    if (response.status === 200) {
      toast.success("Blog created successfully");

      // when blog successful created then clear the form
      e.target.title.value = "";
      e.target.description.value = "";

      // redirect Home after 2 second
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } else {
      alert("Something went wrong");
    }

  }


  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="border-2 mx-auto mt-12 md:w-[45vw] lg:w-[65vw] px-4">
        <h1 className="text-2xl font-bold text-center border-none">Creates Vlog</h1>
        <form className="flex flex-col px-3 gap-3" onSubmit={postData}>
          <label htmlFor="title" className="text-xl font-semibold">Title: {" "}</label>
          <input type="text" name="title" id="" placeholder="Enter your blog title"
            className="py-3 px-2 border-2 rounded-md outline-none hover:border-gray-400"
          />
          <label htmlFor="description" className="text-xl font-semibold">Description: {" "}</label>
          <textarea name="description" className="py-3 px-2 border-2 rounded-md outline-none hover:border-gray-400" rows={10} />
          <div className="flex justify-end items-center">
            <button type="submit"
              className="bg-black hover:bg-purple-600 px-9 py-3 rounded-lg font-bold text-white">
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateBlog


// 2:18:00 on YT!!
