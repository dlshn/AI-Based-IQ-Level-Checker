// GoogleLoginButton.jsx
import { auth, provider, signInWithPopup } from "../../app/firebase";

export default function GoogleLoginButton({ onSuccess }) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      onSuccess && onSuccess(user); // pass user info to parent
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
    >
      Sign in with Google
    </button>
  );
}
