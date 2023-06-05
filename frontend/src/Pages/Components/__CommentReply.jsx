import axios from "axios";
import React, { useEffect, useState } from "react";

export const CommentReply = ({ reply }) => {
  return (
    <>
      <div className="w-full p-2 bg-slate-200 mb-4">
        <div className="flex justify-start items-center gap-2">
          <i className="fa fa-user-circle scale-100 text-2xl text-green-500"></i>
          <div className="flex justify-start items-center gap-2">
            <p className="text-gray-700 font-medium text-sm">{reply.name}</p>
            <span className="text-gray-500 text-xs">{reply.created_at}</span>
          </div>
        </div>
          <p className="text-sm ml-8">{reply.message}</p>
      </div>
    </>
  );
};
