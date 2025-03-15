import { useState } from "react";

export function ImageEditForm() {
    const [imageId, setImageId] = useState("");
    const [imageName, setImageName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit() {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
    
        try {
            console.log("The image id is ", imageId);
            console.log("The new image name is ", imageName);
            const response = await fetch(`/api/images/${imageId}`, { // Adjust API path if needed
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: imageName })
            });
    
            if (!response.ok) {
                throw new Error(`Failed to update image: ${response.statusText}`);
            }
    
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setImageId("");
            setImageName("");
        }
    }

    return (
        <div>
            <label style={{ display: "block" }}>
                Image ID
                <input
                    value={imageId}
                    disabled={isLoading}
                    onChange={(e) => setImageId(e.target.value)}
                />
            </label>
            <label style={{ display: "block" }}>
                New Image Name
                <input
                    value={imageName}
                    disabled={isLoading}
                    onChange={(e) => setImageName(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit} disabled={isLoading || !imageId || !imageName}>
                {isLoading ? "Updating..." : "Send Request"}
            </button>
            {success && <p style={{ color: "green" }}>Image name updated successfully!</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
}
