import React, { useState, useEffect } from 'react'
import Data from '@/Shared/Data'

function SelectRating({ onRatingChange }) {
    const [selectedRating, setSelectedRating] = useState([]);

    const onSelectRating = (isChecked, value) => {
        setSelectedRating(prev => 
            isChecked ? [...prev, value] : prev.filter((n) => n !== value)
        );
    };

    // ✅ useEffect to call onRatingChange AFTER state updates
    useEffect(() => {
        onRatingChange(selectedRating);
    }, [selectedRating]);

    return (
        <div className='px-2 mt-5 mt-20'>
            <h2 className='font-bold'>Select Rating</h2>
            <div>
                {Data.ratingList.map((item, index) => (
                    <div key={index} className='flex justify-between'>
                        <label>{item.icon}</label>
                        <input
                            type='checkbox'
                            onChange={(e) => onSelectRating(e.target.checked, item.name)}
                            checked={selectedRating.includes(item.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectRating;
