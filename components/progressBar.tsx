import React, { useEffect } from 'react';

type ProgressBarProps= {
 percentage: number | any;

}
const ProgressBar=({ percentage }: ProgressBarProps) => {
  if(Number.isNaN(percentage)){
    percentage=0
  }
 return (
  <div>
    <div className="relative flex h-6 p-2.5 sm:text-lg bg-gray-200 rounded-full">
      <div
        className="absolute flex h-2  bg-blue-600 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <h1 className='font-bold flex  p-2.5 text-lg'>{percentage}%</h1>
  </div>
 );
};

export default ProgressBar;