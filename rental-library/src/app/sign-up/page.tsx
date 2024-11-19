import AuthForm from "../components/AuthForm";
import SharedLayout from "../components/SharedLayout";

export default function SignUp() {
    return (
        <SharedLayout>
            <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
                <div className="container mx-auto items-center justify-center">
                    <AuthForm is_login={false} />
                </div>
            </div>
        </SharedLayout>
    );
}