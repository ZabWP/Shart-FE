import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const ArtItem = () => {
    const { id } = useParams();
    const [artItem, setArtItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/artPosts.php?id=" + id)
            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            setArtItem(data);
        };

        fetchData();
    }, [id]);

    if (!artItem) {
        return <div>Loading...</div>;
    }

    

    return (
        <div>

            <img src={artItem[0].artImgLink} alt={artItem[0].artName} />
            <h2>{artItem[0].artName}</h2>
            <p>Author ID: {artItem[0].authorID}</p>
            <p>Date Posted: {artItem[0].postedAt}</p>
            <button onClick={() => navigate('/home')}>Back to Home</button>

        </div>
    );
};

export default ArtItem;