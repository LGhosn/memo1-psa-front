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
    <div className="relative h-6 w-2/3 bg-gray-200 rounded-full">
      <div
        className="absolute left-0 top-0 h-2 bg-blue-600 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <h1 className='font-bold text-lg'>{percentage}%</h1>
  </div>
 );
};

export default ProgressBar;