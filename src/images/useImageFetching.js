import { useEffect, useState } from "react";

const IMAGES = [
    {
        id: "0",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
        name: "Blue merle herding sheep"
    },
    {
        id: "1",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
        name: "Huskies"
    },
    {
        id: "2",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
        name: "Shiba"
    },
    {
        id: "3",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        name: "Tabby cat"
    },
    {
        id: "4",
        src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
        name: "Chickens"
    }
];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @param authToken
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId, delay=1000, authToken) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);
    
    useEffect(() => {
        async function fetchImages() {
            try {
                setIsLoading(true);
                const response = await fetch("/api/images", {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                }); 

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const images = await response.json();

                // Ensure consistency with frontend expectations (renaming _id to id)
                const formattedImages = images.map(img => ({
                    id: img._id, // Change _id to id
                    src: img.src,
                    name: img.name
                }));

                if (imageId) {
                    setFetchedImages(formattedImages.filter(image => image.id === imageId));
                } else {
                    setFetchedImages(formattedImages);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (authToken) {
            fetchImages();
        }
    }, [imageId, authToken]);

    return { isLoading, fetchedImages };
}
