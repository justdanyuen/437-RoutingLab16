import { useState, useId } from "react";

export function ImageUploadForm({authToken}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageTitle, setImageTitle] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const fileInputId = useId(); // Unique ID for accessibility

    // Function to convert a File object to a Data URL
    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    // Handle file selection and preview
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const dataUrl = await readAsDataURL(file);
                setSelectedImage(dataUrl);
                setImageFile(file); // Store file for upload
                setError(null); // Clear any previous error
            } catch (error) {
                console.error("Error reading file:", error);
                setError("Failed to read file.");
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage("");
    
        // Validate inputs
        if (!imageFile) {
            setError("Please select an image to upload.");
            return;
        }
        if (!imageTitle.trim()) {
            setError("Please enter a title for the image.");
            return;
        }
    
        // Retrieve the auth token from localStorage
        const token = authToken
        if (!authToken) {
            setError("Authentication required. Please log in.");
            return;
        }
    
        // Prepare form data
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", imageTitle);
    
        setLoading(true);
        try {
            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token dynamically
                },
            });
    
            const responseData = await response.json(); // Parse JSON response
    
            console.log("Server Response:", response);
            console.log("Response Data:", responseData);
    
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to upload image.");
            }
    
            setSuccessMessage("Image uploaded successfully!");
            setImageFile(null);
            setSelectedImage(null);
            setImageTitle("");
        } catch (error) {
            console.error("Upload error:", error);
            setError("Failed to upload. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={fileInputId}>Choose image to upload: </label>
                <input
                    id={fileInputId}
                    name="image"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label>
                    <span>Image title: </span>
                    <input 
                        name="name" 
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                    />
                </label>
            </div>

            <div> {/* Image Preview */}
                {selectedImage && (
                    <img 
                        style={{ maxWidth: "20em", marginTop: "10px", borderRadius: "8px" }} 
                        src={selectedImage} 
                        alt="Selected Preview" 
                    />
                )}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            {loading && <p>Uploading...</p>}

            <button type="submit" disabled={loading}>Confirm upload</button>
        </form>
    );
}
