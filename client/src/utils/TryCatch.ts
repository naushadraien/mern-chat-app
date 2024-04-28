import toast from "react-hot-toast";

export const TryCatch = async <T>(
  callbackFn: () => Promise<T>
): Promise<T | null> => {
  try {
    return await callbackFn();
  } catch (error: any) {
    // Log the error or report it to an error reporting service
    console.error(error);

    // Show a toast notification or some other user-friendly error message
    toast.error(error || "An error occurred");

    // Return null to indicate that an error occurred
    return null;
  }
};
