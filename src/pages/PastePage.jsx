import LoadinSpinner from "@/components/LoadinSpinner";
import PasteCard from "@/components/PasteCard";
import { useGetAllPasteQuery } from "@/features/apis/pasteApi";
import { Search } from "lucide-react";

import React, { useEffect, useState } from "react";



const PastePage = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all pastes
  const { data, isError, isLoading, refetch, error } = useGetAllPasteQuery();

  useEffect(() => {
    // Initialize filterData with all pastes when data is fetched
    if (data?.data) {
      setOriginalData(data.data);
      
    }
  }, [data]);

  // Handle input change for search
  const changeHandler = (e) => {
    const searchValue = e.target.value;
    setTitle(searchValue);

    // Filter the data based on search input
    if (originalData) {
      const filtered = originalData.filter((paste) =>
        paste.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilterData(filtered);
      console.log(title)
    }
  };

  if (isLoading) return <LoadinSpinner />;
  if (isError)
    return <div>{error?.data?.message || "Error fetching data"}</div>;

  return (
    <div className="mt-6 max-w-7xl mx-auto">
      {/* Search Section */}
      <div className="flex gap-10 justify-between items-center">
        <div className="flex-1 bg-[#27272a] rounded-md flex items-center justify-start p-2 pl-6 gap-4">
          <input
            type="text"
            value={title}
            className="focus:outline-none bg-inherit"
            placeholder="Search your paste here..."
            onChange={changeHandler}                                                                                         
          />
        </div>
      </div>

      {/* Filtered Pastes */}


      {/* All Pastes */}
      <div className="flex-1 border rounded-lg border-gray-600 mt-10">
        <div className="text-4xl font-bold px-8 py-3 border-b border-b-gray-600">
          All Pastes
        </div>
        <div className="p-4 flex flex-col space-y-4">
          {
          title ? (
            
            filterData.length > 0 ? (
              filterData.map((paste) => (
                <PasteCard key={paste._id} paste={paste} refetch={refetch} />
              ))
            ) : (
              <div className="px-auto m-10  text-3xl font-semibold">
                Not any paste found {"Search "}
              </div>
            )
          ) : originalData.length > 0 ? (
            originalData.map((paste) => (
              <PasteCard key={paste._id} paste={paste} refetch={refetch} />
            ))
          ) : (
            <div className="px-auto m-10  text-3xl font-semibold">
               Not any paste found {" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastePage;
