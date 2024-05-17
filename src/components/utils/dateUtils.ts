import { parseISO, format } from "date-fns";

export const formatDate = (dateString: string | null) => {
    if (!dateString) return ""; // Return an empty string or handle it as needed
  
    const dateTimeObject = parseISO(dateString);
  
    if (isNaN(dateTimeObject.getTime())) {
      // Handle invalid date (parseISO returns Invalid Date)
      return ""; // Return an empty string or handle it as needed
    }
  
    // return format(dateObject, "dd-MM-yyyy");
    return format(dateTimeObject, "dd-MMM-yyyy hh:mma");
  
  };