import React, { useEffect, useState } from 'react';




const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    
  };

  return (
      <div onClick={toggleLike} style={{cursor: 'pointer', fontSize: '1.5em', userSelect: 'none'}}>

        {liked ? '❤️' : '🤍'}
      </div>
    
  );
};

export default LikeButton;