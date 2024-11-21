import AuthForm from "../components/AuthForm";
import SharedLayout from "../components/SharedLayout";

export default function Login() {
    return <SharedLayout>
        <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16">
            <div className="container w-1/2 items-center justify-center mx-auto">
                <AuthForm is_login={true} />
            </div>
        </div>
    </SharedLayout>
}