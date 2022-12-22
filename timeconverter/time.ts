//***************1112******************/
function removeTimeAndConvertTo12HourFormat(datetimeString: string): string {
    // Parse the input string using the Date object
    const date = new Date(datetimeString);
    // Use the Intl.DateTimeFormat object to format the date
    // according to the specified pattern, which includes
    // converting the time to the 12-hour format with AM/PM
    const options: any = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedDate;
  }


  //***************2222******************/
function removeTimeAndFormatDate(datetimeString: string): string {
	// Parse the input string using the Date object
	const date = new Date(datetimeString);
	// Use the Intl.DateTimeFormat object to format the date
	const options: any = {
	  weekday: "short",
	  month: "short",
	  year: "numeric",
	  hour: "2-digit",
	  minute: "2-digit",
	  hour12: true
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
	return formattedDate;
  }