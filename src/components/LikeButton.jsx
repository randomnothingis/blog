import React, { useEffect, useState } from 'react';



const LikeButton = ({page}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  const toggleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    const sentLike = await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: page.id, liked: newLikedState }),
    });
    
  };

  return (
      <div  >
        <span onClick={toggleLike} className="like-button" >

        {liked ? 
        ('❤️ Thank you') : 
        (
          '🤍' 
        )}
        </span>

      </div>
    
  );
};

export default LikeButton;