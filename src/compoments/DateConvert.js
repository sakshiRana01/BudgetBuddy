import React from "react";
import {format,parseISO} from 'date-fns';

 export const DateConvert =({timestamp})=>{
    try {
        const date = parseISO(timestamp);
        const dateString = format(date, 'dd-MM-yyyy');
        return <span>{dateString}</span>;
      } catch (error) {
        console.error('Error parsing date:', error);
        return <span></span>;
      }

};