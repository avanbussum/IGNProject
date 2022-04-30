import "./App.css";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import React from "react";

const genreList = ['Drama','Horror','Action','Sci-Fi','Fantasy','Animation','Crime','Anime']
const mediaTypeList = ['Movie','Show','Comic','Game']

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [review_url, setReview_Url] = useState("");
  const [short_description, setShort_description] = useState("");
  const [genres, setGenre] = useState("");
  const [media_type, setMediaType] = useState("");

  
  const [searchMediaType, setSearchMediaType] = useState("All Media");
  const [searchGenre, setSearchGenre] = useState("All Genres");
  const [mediaList, setMediaList] = useState([]);
  

  useEffect(() => {
    Axios.get("http://localhost:3004/medias").then(
      (response) => {
        console.log(response.data);
        setMediaList(response.data);
      }
    );
  },[]);
  if(mediaList.length == 0){
    return <div>loading</div>;
  }

  const getMedia = () => {
    Axios.get("http://localhost:3004/medias").then((response) => {
      console.log(response.data);
      setMediaList(response.data);
    });
  };

  const getGenre = () => {
    Axios.get("http://localhost:3004/genrefinder/" + searchGenre).then(
      (response) => {
        console.log(response.data);
        setMediaList(response.data);
      });
  };

  const getMediaType = () => {
    Axios.get("http://localhost:3004/typefinder/" + searchMediaType).then(
      (response) => {
        console.log(response.data);
        setMediaList(response.data);
      });
  };

  return (
    <div className=".App">
      <TailwindButton setSearchGenre={setSearchGenre} setSearchMediaType={setSearchMediaType}>Show All Entertainment</TailwindButton>
      <div className="flex px-5 justify-center">
        <div className="flex items-center justify-center ">
          <div className="flex border-gray-200 rounded-lg gap-x-96">
          
            <GenreDropDown setSearchGenre={setSearchGenre} searchGenre={searchGenre}></GenreDropDown>  
            <MediaDropDown setSearchMediaType={setSearchMediaType} searchMediaType={searchMediaType}></MediaDropDown>
            
          </div>
        </div>
      </div>
      <div className="p-4 align-middle">
        <div className="mx-2 lg:w-[80%] lg:m-auto">
        <img src="https://1000logos.net/wp-content/uploads/2021/05/IGN-Logo.png" className="justify-center w-22 h-14"></img>
          <h3 className="bg-red-500 font-bold text-white my-5 lg:my-0 px-4 py-0.5">
            Recent Reviews
          </h3>
          
          <div className="lg:grid grid-cols-4 grid-row-2">
            <Items mediaList={mediaList} searchGenre={searchGenre} searchMediaType={searchMediaType}></Items>
          </div>
        </div>
      </div>
    </div>
    
  );
}

function TailwindButton(props) {
  const {setSearchGenre, setSearchMediaType} = props;
  console.log({setSearchGenre})
  return (
    <button
      onClick={() => { 
        setSearchGenre('All Genres')
        setSearchMediaType('All Media')
      }}
      className="bg-red-500 text-white font-medium px-4 py-2 m-5 rounded hover:bg-red-600"
    >
      {" "}
      {props.children}{" "}
    </button>
  );
}

function GenreDropDown(props) {
  const {setSearchGenre, searchGenre} = props
  return (
    <div className="relative inline-flex gap-x-4">
      <svg
        className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="#648299"
          fillRule="nonzero"
        />
      </svg>
      
      <select
        onChange= {(e) => setSearchGenre(e.target.value)} value={searchGenre}
        className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 cursor-pointer focus:outline-none appearance-none"
      >
        <option value="All Genres">All Genres</option>
        {genreList.map((specificgenre, i) => {
          return (
            <option key={i}>
              {specificgenre}
            </option>
          );
        })}
      </select>
      
    </div>      
  );
}

function Items (props) {
  const {mediaList, searchGenre, searchMediaType} = props
  console.log({searchGenre, searchMediaType})

  const items = mediaList.map(
    (val) => ({...val, genres:val.genres.replace('{','').replace('}','')})
  ).filter(item => {

    const hasGenre = searchGenre == 'All Genres' ? true : item.genres.split(',').includes(searchGenre)
    const hasMediaType = searchMediaType == 'All Media' ? true : item.media_type.includes(searchMediaType)

    console.log({item,hasGenre,hasMediaType,searchGenre,searchMediaType,split:item.genres.split(',').join(',')})

    return hasGenre && hasMediaType
  }).map((val) => (
      <div key = {val.id} className="flex flex-row lg:flex-col mx-5 lg:mx-2 lg:mt-0 my-5 pb-5 items-center md:items-start lg:bg-white border-b-2 border-red-300 relative shadow-lg hover:bg-gray-50 hover:drop-shadow-lg">
        <div className="bg-gray-400 text-gray-50 text-xs uppercase font-bold rounded-full p-2 absolute top-3 ml-2 mt-0">
          <span>ID: {val.id}</span>
        </div>
        <a href={val.review_url} className="hover:cursor-pointer hover:drop-shadow-lg focus:ring focus:ring-violet-300">
          <Image rev={val.review_url}></Image>
        </a>
        <div className="md:flex md:flex-col lg:px-3 gap-y-3 ">
          <h6 className="font-bold text-lg items-justify-center py-4">{val.name}</h6>
          
          <p className="hidden md:block my-2 lg:my-0">
            <span className="font-semibold">Media Type: </span>
            {val.media_type}
          </p>
          <p className="hidden md:block my-2 lg:my-0">
            <span className="font-semibold">Short Decription: </span>
            {val.short_description}
          </p>
          <p className="hidden md:block my-2 lg:my-0">
            <span className="font-semibold">Genre: </span>
            {val.genres}
          </p>
        </div>
      </div>
    )
  );
  return(
    <>{items}</>
  );
}

function MediaDropDown(props) {
  const {setSearchMediaType, searchMediaType} = props

  return (
    <div className="relative inline-flex gap-x-4">
      <svg
        className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 412 232"
      >
        <path
          d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
          fill="#648299"
          fillRule="nonzero"
        />
      </svg>
      <select
        onChange= {(e) => setSearchMediaType(e.target.value)} value={searchMediaType}
        className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 cursor-pointer focus:outline-none appearance-none"
      >
        <option value="All Media">All Media</option>
        {mediaTypeList.map((specmedia, i) => {
          return (
            <option key={i}>
              {specmedia}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function Image(props) {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3004/reviewfind/" + props.rev).then(
      (response) => {
        setImageURL(response.data.meta.image);
        setLoading(false);
      }
    );
  },[]);
  
  if (isLoading) {
    return <div className="m-24"><svg role="status" className="  w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg></div>;
  }

  return(
    <img
      className="rounded-full object-contain hover:object-scale-down mt-2"
      src= {imageURL}
      alt="Lorem Impsum"
    ></img>
  )
}

export default App;

//ADD MEDIA FUNCTION

// const addMedia = () => {
//   Axios.post("http://localhost:3004/create", {
//     id: id,
//     searchMediaType: searchMediaType,
//     name: name,
//     short_description: short_description,
//     genres: genres,
//   }).then(() => {
//     setEmployeeList([
//       ...employeeList,
//       {
//         name: name,
//         age: age,
//         country: country,
//         position: position,
//         wage: wage,
//       },
//     ]);
//   });
// };

//BASIC DISPLAY

// {
//   mediaList.map((val, key) => {
//     return (
//       <div className="media">
//         <div>
//           <h3>ID: {val.id}</h3>
//           <h3>Name: {val.name}</h3>
//           <h3>Media Type: {val.searchMediaType}</h3>
//           <h3>Short Decription: {val.short_description}</h3>
//           <h3>Genre: {val.genres}</h3>
//         </div>
//       </div>
//     );
//   })
// }
