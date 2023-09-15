import React from 'react'

const Profile = ({ user }) => {
  return (
    <div className="flex items-center w-full bg-neutral-700 cursor-pointer hover:bg-neutral-600 p-3">
      <div className="">
        {user.imageUrl ? (
          <img src={user.imageUrl} alt={user.name} className="w-[35px] mr-4 rounded-full border-2 border-neutral-400" />
          ) : (
          <span className="material-symbols-outlined w-[35px] h-[35px] mr-4 flex items-center justify-center rounded-full border-2 border-neutral-400">person</span>
        )}
      </div>
      <div className="leading-tight">
        <div className="flex items-center">
          <h2>{user.name}</h2>
          {user.verified && (
            <span className="material-symbols-outlined text-sm ml-2">verified</span>
          )}
        </div>
        <p className="text-neutral-400 text-sm">
          {user.professionalHeadline ? user.professionalHeadline.split(' ').slice(0, 4).join(' ') : ''}
        </p>

      </div>
    </div>
  );
};

export default Profile;
