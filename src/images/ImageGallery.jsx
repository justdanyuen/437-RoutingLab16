import "./ImageGallery.css";
import { ImageUploadForm } from "./ImageUploadForm";

export function ImageGallery({ isLoading, fetchedImages, authToken }) {
    const imageElements = fetchedImages.map((image) => (
        <div key={image.id} className="ImageGallery-photo-container">
            <a href={"/images/" + image.id}>
                <img src={image.src} alt={image.name} />
            </a>
        </div>
    ));

    return (
        <div>
            <h2>Image Gallery</h2>
            <h3 className="ImageUpload">
                <ImageUploadForm authToken={authToken}/>
            </h3>
            {isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}
