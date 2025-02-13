import { message } from "antd";

export const handleError = (err) => {
  let error = "An unexpected error occurred";

  if (err.response) {
    switch (err.response.status) {
      case 400:
        error = "Bad Request: " + err?.response?.data?.message;
        break;
      case 401:
        error = "Unauthorized: " + err?.response?.data?.message;
        break;
      case 402:
        error = "Payment Required: " + err?.response?.data?.message;
        break;
      case 403:
        error = "Forbidden: " + err?.response?.data?.message;
        break;
      case 404:
        error = "Not Found: " + err?.response?.data?.message;
        break;
      case 500:
        error = "Internal Server Error: Please try again later";
        break;
      case 501:
        error = "Not Implemented: " + err?.response?.data?.message;
        break;
      case 502:
        error = "Bad Gateway: " + err?.response?.data?.message;
        break;
      case 503:
        error = "Service Unavailable: Please try again later";
        break;
      case 504:
        error = "Gateway Timeout: Please try again later";
        break;
      default:
        error = "Error: " + err?.response?.data?.message;
    }
  } else if (err.message) {
    error = err.message;
  }
  message.error(error);
};

export const handleShippoError = (err) => {
  let error = "An unexpected error occurred";

  if (err.response) {
    const { status, data } = err.response;

    // Shippo's error messages are usually in `data.error.message`
    const shippoMessage = data?.error?.message || "No additional details available";

    switch (status) {
      case 400:
        error = `Bad Request: ${shippoMessage}`;
        break;
      case 401:
        error = `Unauthorized: ${shippoMessage}`;
        break;
      case 402:
        error = `Payment Required: ${shippoMessage}`;
        break;
      case 403:
        error = `Forbidden: ${shippoMessage}`;
        break;
      case 404:
        error = `Not Found: ${shippoMessage}`;
        break;
      case 429:
        error = `Too Many Requests: ${shippoMessage}`;
        break;
      case 500:
        error = `Internal Server Error: ${shippoMessage}`;
        break;
      case 503:
        error = `Service Unavailable: ${shippoMessage}`;
        break;
      default:
        error = `Error ${status}: ${shippoMessage}`;
    }
  } else if (err.message) {
    error = err.message;
  } else if (err.request) {
    // When the request was made but no response was received
    error = "No response received from the server. Please check your internet connection.";
  }

  message.error(error);
};
