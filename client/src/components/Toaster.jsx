import { Toaster } from "react-hot-toast";

const Toast = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                success: {
                    style: {
                        background: "#22c55e",
                        color: "#fff",
                    },
                },
                error: {
                    style: {
                        background: "#ef4444",
                        color: "#fff",
                    },
                },
            }}
        />
    );
};

export default Toast;