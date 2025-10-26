import React, { useEffect, useState } from 'react';


const GetCountButton = ({page}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, [count]);

  const getCount = async () => {
    const data = await fetch(`/api/like/${page.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const dataJson = await data.json();
    console.log(dataJson);
    setCount(dataJson.likeCount);
  };

  return (
      <div onClick={getCount} style={{
        cursor: 'pointer',  
        // position: 'fixed',
        // bottom:'10vh', 
        border:'1px solid orange',
        right:'5vw',
 
        padding:5, 
        fontSize: '1.5em', 
        userSelect: 'none',
        zIndex:1000,
        }}>

        {count}

      </div>
    
  );
};

export default GetCountButton;