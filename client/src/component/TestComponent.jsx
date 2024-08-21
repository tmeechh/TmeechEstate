import React, { useState } from 'react';

const TestComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    console.log('Input Changed:', { id: e.target.id, value: e.target.value, checked: e.target.checked }); // Debug line
    setSearchTerm(e.target.value);
  };

  return (
    <form>
      <div className="flex items-center border-b border-slate-200 sm:w-[60%]">
        <input
          type="text"
          id="searchTerm"
          className="outline-none w-full pl-2 pr-10 text-white bg-transparent"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Country, City, or Address"
        />
      </div>
      <div>Current Search Term: {searchTerm}</div> {/* Debug line */}
    </form>
  );
};

export default TestComponent;


{/* {landlord && (
        <div className=" flex flex-col gap-3 mt-5">
          <p>
            Contact <span className="font-extrabold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-extrabold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="lg:w-[70vh] border p-3 rounded-lg outline-none "
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=${message}`}
            className="bg-[#021342]  text-white text-center p-3 uppercase rounded-lg hover:opacity-75"
          >
            Send Message
          </Link>
        </div>
      )} */}

        // const [landlord, setLandlord] = useState(null);
  // const [message, setMessage] = useState('');
  // const onChange = (e) => {
  //   setMessage(e.target.value);
  // };

  // useEffect(() => {
  //   const fetchLandlord = async () => {
  //     try {
  //       const res = await fetch(`/api/user/${listing.userRef}`);
  //       const data = await res.json();
  //       setLandlord(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchLandlord();
  // }, [listing.userRef]);