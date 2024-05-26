import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertTimestampToDateString(timestamp: number): string {
  // Convert the timestamp from milliseconds to a Date object
  const date: Date = new Date(timestamp);

  // Extract the year, month, and day
  const year: number = date.getFullYear();
  const day: number = date.getDate();
  const monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month: string = monthNames[date.getMonth()];

  // Format the date as MMM DD, YYYY
  const formattedDate: string = `${month} ${day}, ${year}`;

  return formattedDate;
}

export function getFirst20Words(text: string) {
  // Split the text into an array of words
  const words = text.split(/\s+/);

  // Get the first 20 words
  const first20Words = words.slice(0, 20);

  // Join the words back into a single string
  const result = `${first20Words.join(' ')}...`;

  return result;
}

