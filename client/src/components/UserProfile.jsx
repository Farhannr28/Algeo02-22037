import React from "react";

const UserProfile = ({ pair }) => {
  const [imagePath, similarity] = pair;

  return (
    <div className="flex flex-col items-center gap-4 bg-lightGray rounded-lg p-4">
      <img
        src={imagePath}
        alt=""
        className="w-[200px] h-[200px] border-2 border-solid border-purple rounded-lg object-cover"
      />
      <div className="text-lg font-semibold mt-2">
        Similarity: {(similarity *100)}%
      </div>
    </div>
  );
};

export default UserProfile;
