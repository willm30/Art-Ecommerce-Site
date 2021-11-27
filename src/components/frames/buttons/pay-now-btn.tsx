import React from "react";
import WaitingSpinner from "../../../icons/waiting-spinner";

export default function PayNowBtn({ handleSubmit, loading }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center font-poppins text-3xl"
    >
      <button
        type="submit"
        disabled={loading}
        className="group bg-white hover:bg-black border-black border p-2 w-72 hover:text-white active:bg-indigo-900 active:text-white visited:bg-indigo-900"
      >
        {loading ? (
          <span className="flex justify-center items-center">
            Please wait...
            <WaitingSpinner className="animate-spin mx-2 group-hover:text-white fill-current" />
          </span>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
}
