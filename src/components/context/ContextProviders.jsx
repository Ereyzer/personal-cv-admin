import { UserProvider } from "./user/userProvider";

function ContextProviders({ children }) {


    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}

export default ContextProviders;