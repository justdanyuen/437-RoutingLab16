import { ImageEditForm } from "./images/ImageEditForm";

export function Homepage(props) {
    return (
        <div>
        <h2>Welcome, {props.userName}</h2>
            <p>This is the content of the home page.</p>

        <h3>Edit Image Name</h3>
        <ImageEditForm />
        </div>    
    );
}
